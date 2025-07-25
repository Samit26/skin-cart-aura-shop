const crypto = require("crypto");
const axios = require("axios");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

// PhonePe Configuration
const PHONEPE_MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
const PHONEPE_SALT_KEY = process.env.PHONEPE_SALT_KEY;
const PHONEPE_SALT_INDEX = process.env.PHONEPE_SALT_INDEX;
const PHONEPE_HOST_URL = process.env.PHONEPE_HOST_URL;
const PHONEPE_REDIRECT_URL = process.env.PHONEPE_REDIRECT_URL;
const PHONEPE_CALLBACK_URL = process.env.PHONEPE_CALLBACK_URL;

// Generate checksum for PhonePe API
const generateChecksum = (payload, endpoint) => {
  const string = payload + endpoint + PHONEPE_SALT_KEY;
  const sha256 = crypto.createHash("sha256").update(string).digest("hex");
  return sha256 + "###" + PHONEPE_SALT_INDEX;
};

// Verify checksum for callbacks
const verifyChecksum = (receivedChecksum, payload, endpoint) => {
  const string = payload + endpoint + PHONEPE_SALT_KEY;
  const sha256 = crypto.createHash("sha256").update(string).digest("hex");
  const expectedChecksum = sha256 + "###" + PHONEPE_SALT_INDEX;
  return receivedChecksum === expectedChecksum;
};

// @desc    Get available payment methods
// @route   GET /api/payment/methods
// @access  Public
const getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = [
      {
        id: "phonepe",
        name: "PhonePe",
        type: "UPI",
        enabled: true,
        icon: "/payment-icons/phonepe.svg",
      },
      {
        id: "upi",
        name: "UPI",
        type: "UPI",
        enabled: true,
        icon: "/payment-icons/upi.svg",
      },
      {
        id: "cards",
        name: "Credit/Debit Cards",
        type: "CARD",
        enabled: true,
        icon: "/payment-icons/cards.svg",
      },
      {
        id: "netbanking",
        name: "Net Banking",
        type: "NET_BANKING",
        enabled: true,
        icon: "/payment-icons/netbanking.svg",
      },
    ];

    res.status(200).json({
      success: true,
      data: paymentMethods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching payment methods",
      error: error.message,
    });
  }
};

// @desc    Initiate payment
// @route   POST /api/payment/initiate
// @access  Private
const initiatePayment = async (req, res) => {
  try {
    const { orderId, amount, paymentMethod } = req.body;
    const userId = req.user.id;

    // Validate order
    const order = await Order.findOne({ orderId, user: userId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.orderStatus !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Order cannot be paid",
      });
    }

    // Generate transaction ID
    const transactionId = `TXN_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Prepare PhonePe payment payload
    const paymentPayload = {
      merchantId: PHONEPE_MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: userId,
      amount: amount * 100, // Convert to paise
      redirectUrl: `${PHONEPE_REDIRECT_URL}?transactionId=${transactionId}`,
      redirectMode: "POST",
      callbackUrl: PHONEPE_CALLBACK_URL,
      mobileNumber: req.user.phone || "9999999999",
      paymentInstrument: {
        type: paymentMethod === "upi" ? "UPI_COLLECT" : "PAY_PAGE",
      },
    };

    // Encode payload
    const payloadString = JSON.stringify(paymentPayload);
    const payloadBase64 = Buffer.from(payloadString).toString("base64");

    // Generate checksum
    const endpoint = "/pg/v1/pay";
    const checksum = generateChecksum(payloadBase64, endpoint);

    // Make request to PhonePe
    const phonePeResponse = await axios.post(
      `${PHONEPE_HOST_URL}${endpoint}`,
      {
        request: payloadBase64,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
          accept: "application/json",
        },
      }
    );

    if (phonePeResponse.data.success) {
      // Update order with payment info
      order.paymentInfo = {
        transactionId,
        method: paymentMethod,
        status: "pending",
        amount: amount,
      };
      await order.save();

      res.status(200).json({
        success: true,
        message: "Payment initiated successfully",
        data: {
          transactionId,
          paymentUrl:
            phonePeResponse.data.data.instrumentResponse.redirectInfo.url,
          orderId: order.orderId,
        },
      });
    } else {
      throw new Error(
        phonePeResponse.data.message || "Payment initiation failed"
      );
    }
  } catch (error) {
    console.error("Payment initiation error:", error);
    res.status(500).json({
      success: false,
      message: "Error initiating payment",
      error: error.message,
    });
  }
};

// @desc    Check payment status
// @route   GET /api/payment/status/:transactionId
// @access  Private
const checkPaymentStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const userId = req.user.id;

    // Find order by transaction ID
    const order = await Order.findOne({
      "paymentInfo.transactionId": transactionId,
      user: userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // Check payment status with PhonePe
    const endpoint = `/pg/v1/status/${PHONEPE_MERCHANT_ID}/${transactionId}`;
    const checksum = generateChecksum("", endpoint);

    const phonePeResponse = await axios.get(`${PHONEPE_HOST_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": PHONEPE_MERCHANT_ID,
        accept: "application/json",
      },
    });

    if (phonePeResponse.data.success) {
      const paymentData = phonePeResponse.data.data;
      const paymentStatus = paymentData.state;

      // Update order based on payment status
      if (paymentStatus === "COMPLETED") {
        order.paymentInfo.status = "completed";
        order.paymentInfo.paidAt = new Date();
        order.orderStatus = "confirmed";

        // Clear user's cart
        await Cart.findOneAndUpdate(
          { user: userId },
          { $set: { items: [], totalAmount: 0 } }
        );
      } else if (paymentStatus === "FAILED") {
        order.paymentInfo.status = "failed";
        order.orderStatus = "cancelled";
      }

      await order.save();

      res.status(200).json({
        success: true,
        data: {
          transactionId,
          status: paymentStatus,
          orderStatus: order.orderStatus,
          paymentInfo: order.paymentInfo,
        },
      });
    } else {
      throw new Error("Failed to check payment status");
    }
  } catch (error) {
    console.error("Payment status check error:", error);
    res.status(500).json({
      success: false,
      message: "Error checking payment status",
      error: error.message,
    });
  }
};

// @desc    Handle payment callback from PhonePe
// @route   POST /api/payment/callback
// @access  Public (Webhook)
const handlePaymentCallback = async (req, res) => {
  try {
    const { response } = req.body;

    if (!response) {
      return res.status(400).json({
        success: false,
        message: "Invalid callback data",
      });
    }

    // Decode the response
    const decodedResponse = Buffer.from(response, "base64").toString("utf-8");
    const paymentData = JSON.parse(decodedResponse);

    const transactionId = paymentData.data.merchantTransactionId;
    const paymentStatus = paymentData.data.state;

    // Find and update order
    const order = await Order.findOne({
      "paymentInfo.transactionId": transactionId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Update order based on payment status
    if (paymentStatus === "COMPLETED") {
      order.paymentInfo.status = "completed";
      order.paymentInfo.paidAt = new Date();
      order.paymentInfo.gatewayTransactionId = paymentData.data.transactionId;
      order.orderStatus = "confirmed";

      // Clear user's cart
      await Cart.findOneAndUpdate(
        { user: order.user },
        { $set: { items: [], totalAmount: 0 } }
      );
    } else if (paymentStatus === "FAILED") {
      order.paymentInfo.status = "failed";
      order.orderStatus = "cancelled";
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Callback processed successfully",
    });
  } catch (error) {
    console.error("Payment callback error:", error);
    res.status(500).json({
      success: false,
      message: "Error processing payment callback",
      error: error.message,
    });
  }
};

module.exports = {
  getPaymentMethods,
  initiatePayment,
  checkPaymentStatus,
  handlePaymentCallback,
};

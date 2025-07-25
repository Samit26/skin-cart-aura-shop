const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyPromoCode,
  removePromoCode,
} = require("../controllers/cartController");
const { clerkAuthWithUser } = require("../middleware/clerkAuth");

// All cart routes are protected with Clerk and user sync
router.use(clerkAuthWithUser);

router.get("/", getCart);
router.post("/add", addToCart);
router.put("/update/:itemId", updateCartItem);
router.delete("/remove/:itemId", removeFromCart);
router.delete("/clear", clearCart);
router.post("/promo/apply", applyPromoCode);
router.delete("/promo/remove", removePromoCode);

module.exports = router;

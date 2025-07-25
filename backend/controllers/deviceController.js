const deviceData = {
  brands: [
    "Apple",
    "Samsung",
    "OnePlus",
    "Xiaomi",
    "Realme",
    "Oppo",
    "Vivo",
    "Nothing",
    "Google",
    "Motorola",
    "Honor",
    "Huawei",
    "Asus",
    "Sony",
    "Nokia",
  ],
  models: {
    Apple: [
      // 2025
      "iPhone 17 Pro Max",
      "iPhone 17 Pro",
      "iPhone 17",
      "iPhone 17 mini",
      // 2024
      "iPhone 16 Pro Max",
      "iPhone 16 Pro",
      "iPhone 16 Plus",
      "iPhone 16",
      // 2023
      "iPhone 15 Pro Max",
      "iPhone 15 Pro",
      "iPhone 15 Plus",
      "iPhone 15",
      // 2022
      "iPhone 14 Pro Max",
      "iPhone 14 Pro",
      "iPhone 14 Plus",
      "iPhone 14",
      // 2021
      "iPhone 13 Pro Max",
      "iPhone 13 Pro",
      "iPhone 13",
      "iPhone 13 mini",
      // 2020
      "iPhone 12 Pro Max",
      "iPhone 12 Pro",
      "iPhone 12",
      "iPhone 12 mini",
      // 2019
      "iPhone 11 Pro Max",
      "iPhone 11 Pro",
      "iPhone 11",
      // 2018
      "iPhone XS Max",
      "iPhone XS",
      "iPhone XR",
      // 2017
      "iPhone X",
      "iPhone 8 Plus",
      "iPhone 8",
    ],
    Samsung: [
      // 2025
      "Galaxy S25 Ultra",
      "Galaxy S25+",
      "Galaxy S25",
      "Galaxy Z Fold7",
      "Galaxy Z Flip7",
      // 2024
      "Galaxy S24 Ultra",
      "Galaxy S24+",
      "Galaxy S24",
      "Galaxy Z Fold6",
      "Galaxy Z Flip6",
      "Galaxy A55",
      "Galaxy A35",
      // 2023
      "Galaxy S23 Ultra",
      "Galaxy S23+",
      "Galaxy S23",
      "Galaxy Z Fold5",
      "Galaxy Z Flip5",
      "Galaxy A54",
      "Galaxy A34",
      // 2022
      "Galaxy S22 Ultra",
      "Galaxy S22+",
      "Galaxy S22",
      "Galaxy Z Fold4",
      "Galaxy Z Flip4",
      "Galaxy A53",
      "Galaxy A33",
      // 2021
      "Galaxy S21 Ultra",
      "Galaxy S21+",
      "Galaxy S21",
      "Galaxy Z Fold3",
      "Galaxy Z Flip3",
      "Galaxy A52",
      "Galaxy A32",
      // 2020
      "Galaxy S20 Ultra",
      "Galaxy S20+",
      "Galaxy S20",
      "Galaxy Z Fold2",
      "Galaxy Z Flip",
      "Galaxy A51",
      "Galaxy A31",
      // 2019
      "Galaxy S10+",
      "Galaxy S10",
      "Galaxy S10e",
      "Galaxy Fold",
      "Galaxy A50",
      "Galaxy A30",
      // 2018
      "Galaxy S9+",
      "Galaxy S9",
      "Galaxy Note 9",
      "Galaxy A8",
      "Galaxy A6",
      // 2017
      "Galaxy S8+",
      "Galaxy S8",
      "Galaxy Note 8",
      "Galaxy A7",
      "Galaxy A5",
    ],
    OnePlus: [
      // 2025
      "OnePlus 13",
      "OnePlus 13R",
      // 2024
      "OnePlus 12",
      "OnePlus 12R",
      "OnePlus Nord 4",
      "OnePlus Nord CE4",
      // 2023
      "OnePlus 11",
      "OnePlus 11R",
      "OnePlus Nord 3",
      "OnePlus Nord CE3",
      // 2022
      "OnePlus 10 Pro",
      "OnePlus 10T",
      "OnePlus Nord 2T",
      "OnePlus Nord CE2",
      // 2021
      "OnePlus 9 Pro",
      "OnePlus 9",
      "OnePlus 9R",
      "OnePlus Nord 2",
      "OnePlus Nord CE",
      // 2020
      "OnePlus 8 Pro",
      "OnePlus 8",
      "OnePlus 8T",
      "OnePlus Nord",
      // 2019
      "OnePlus 7 Pro",
      "OnePlus 7",
      "OnePlus 7T Pro",
      "OnePlus 7T",
      // 2018
      "OnePlus 6",
      "OnePlus 6T",
      // 2017
      "OnePlus 5",
      "OnePlus 5T",
    ],
    Xiaomi: [
      // 2025
      "Xiaomi 15",
      "Xiaomi 15 Pro",
      "Redmi Note 14",
      "Redmi 14",
      // 2024
      "Xiaomi 14",
      "Xiaomi 14 Pro",
      "Redmi Note 13",
      "Redmi 13",
      "POCO X6",
      "POCO F6",
      // 2023
      "Xiaomi 13",
      "Xiaomi 13 Pro",
      "Redmi Note 12",
      "Redmi 12",
      "POCO X5",
      "POCO F5",
      // 2022
      "Xiaomi 12",
      "Xiaomi 12 Pro",
      "Redmi Note 11",
      "Redmi 11",
      "POCO X4",
      "POCO F4",
      // 2021
      "Xiaomi 11",
      "Xiaomi 11 Pro",
      "Redmi Note 10",
      "Redmi 10",
      "POCO X3",
      "POCO F3",
      // 2020
      "Xiaomi 10",
      "Xiaomi 10 Pro",
      "Redmi Note 9",
      "Redmi 9",
      "POCO X2",
      "POCO F2",
      // 2019
      "Xiaomi 9",
      "Xiaomi 9 Pro",
      "Redmi Note 8",
      "Redmi 8",
      "POCO X1",
      "POCO F1",
      // 2018
      "Xiaomi 8",
      "Xiaomi 8 Pro",
      "Redmi Note 7",
      "Redmi 7",
      // 2017
      "Xiaomi 6",
      "Xiaomi 6 Plus",
      "Redmi Note 6",
      "Redmi 6",
    ],
    Realme: [
      // 2025
      "Realme GT 7 Pro",
      "Realme 13",
      "Realme C65",
      // 2024
      "Realme GT 6",
      "Realme 12",
      "Realme 12 Pro",
      "Realme C55",
      "Realme Narzo 70",
      // 2023
      "Realme GT 5",
      "Realme 11",
      "Realme 11 Pro",
      "Realme C53",
      "Realme Narzo 60",
      // 2022
      "Realme GT 2",
      "Realme 10",
      "Realme 10 Pro",
      "Realme C35",
      "Realme Narzo 50",
      // 2021
      "Realme GT",
      "Realme 9",
      "Realme 9 Pro",
      "Realme C25",
      "Realme Narzo 30",
      // 2020
      "Realme X7",
      "Realme 8",
      "Realme 8 Pro",
      "Realme C21",
      "Realme Narzo 20",
      // 2019
      "Realme X2",
      "Realme 7",
      "Realme 7 Pro",
      "Realme C15",
      "Realme Narzo 10",
      // 2018
      "Realme 3",
      "Realme 3 Pro",
      "Realme C2",
      // 2017 (Brand started in 2018, but including some early models)
      "Realme 1",
      "Realme 2",
    ],
    Oppo: [
      // 2025
      "Oppo Find X8",
      "Oppo Reno 12",
      "Oppo A3",
      // 2024
      "Oppo Find X7",
      "Oppo Reno 11",
      "Oppo A78",
      "Oppo A58",
      // 2023
      "Oppo Find X6",
      "Oppo Reno 10",
      "Oppo A77",
      "Oppo A57",
      // 2022
      "Oppo Find X5",
      "Oppo Reno 8",
      "Oppo A76",
      "Oppo A56",
      // 2021
      "Oppo Find X3",
      "Oppo Reno 6",
      "Oppo A74",
      "Oppo A54",
      // 2020
      "Oppo Find X2",
      "Oppo Reno 4",
      "Oppo A72",
      "Oppo A52",
      // 2019
      "Oppo Find X",
      "Oppo Reno 2",
      "Oppo A9",
      "Oppo A5",
      // 2018
      "Oppo R17",
      "Oppo R15",
      "Oppo A83",
      "Oppo A71",
      // 2017
      "Oppo R11",
      "Oppo R9s",
      "Oppo A77",
      "Oppo A57",
    ],
    Vivo: [
      // 2025
      "Vivo X200",
      "Vivo V40",
      "Vivo Y28",
      // 2024
      "Vivo X100",
      "Vivo V30",
      "Vivo Y27",
      "Vivo T3",
      // 2023
      "Vivo X90",
      "Vivo V29",
      "Vivo Y35",
      "Vivo T2",
      // 2022
      "Vivo X80",
      "Vivo V25",
      "Vivo Y33",
      "Vivo T1",
      // 2021
      "Vivo X70",
      "Vivo V23",
      "Vivo Y31",
      "Vivo Y20",
      // 2020
      "Vivo X60",
      "Vivo V21",
      "Vivo Y30",
      "Vivo Y19",
      // 2019
      "Vivo X50",
      "Vivo V19",
      "Vivo Y17",
      "Vivo S1",
      // 2018
      "Vivo X23",
      "Vivo V11",
      "Vivo Y95",
      "Vivo Y93",
      // 2017
      "Vivo X20",
      "Vivo V7",
      "Vivo Y69",
      "Vivo Y66",
    ],
    Nothing: [
      // 2025
      "Nothing Phone (3)",
      // 2024
      "Nothing Phone (2a)",
      "Nothing Phone (2a) Plus",
      // 2023
      "Nothing Phone (2)",
      // 2022
      "Nothing Phone (1)",
      // Note: Nothing started in 2021, first phone in 2022
    ],
    Google: [
      // 2025
      "Pixel 9 Pro",
      "Pixel 9",
      "Pixel 9a",
      // 2024
      "Pixel 8 Pro",
      "Pixel 8",
      "Pixel 8a",
      // 2023
      "Pixel 7 Pro",
      "Pixel 7",
      "Pixel 7a",
      // 2022
      "Pixel 6 Pro",
      "Pixel 6",
      "Pixel 6a",
      // 2021
      "Pixel 5",
      "Pixel 5a",
      // 2020
      "Pixel 4",
      "Pixel 4 XL",
      "Pixel 4a",
      // 2019
      "Pixel 3",
      "Pixel 3 XL",
      "Pixel 3a",
      // 2018
      "Pixel 2",
      "Pixel 2 XL",
      // 2017
      "Pixel",
      "Pixel XL",
    ],
    Motorola: [
      // 2025
      "Moto G85",
      "Moto Edge 50",
      // 2024
      "Moto G84",
      "Moto Edge 40",
      "Moto G54",
      // 2023
      "Moto G73",
      "Moto Edge 30",
      "Moto G53",
      // 2022
      "Moto G62",
      "Moto Edge 20",
      "Moto G42",
      // 2021
      "Moto G60",
      "Moto Edge 10",
      "Moto G40",
      // 2020
      "Moto G50",
      "Moto Edge",
      "Moto G30",
      // 2019
      "Moto G8",
      "Moto G7",
      "Moto One",
      // 2018
      "Moto G6",
      "Moto G5",
      "Moto Z3",
      // 2017
      "Moto G4",
      "Moto Z2",
      "Moto E4",
    ],
    Honor: [
      // 2025
      "Honor Magic7",
      "Honor 200",
      "Honor X60",
      // 2024
      "Honor Magic6",
      "Honor 90",
      "Honor X50",
      // 2023
      "Honor Magic5",
      "Honor 80",
      "Honor X40",
      // 2022
      "Honor Magic4",
      "Honor 70",
      "Honor X30",
      // 2021
      "Honor 50",
      "Honor 60",
      "Honor X20",
      // 2020
      "Honor 30",
      "Honor 40",
      "Honor X10",
      // 2019
      "Honor 20",
      "Honor 10",
      "Honor 8X",
      // 2018
      "Honor View 20",
      "Honor Play",
      "Honor 7X",
      // 2017
      "Honor 9",
      "Honor 8",
      "Honor 6X",
    ],
    Huawei: [
      // 2025
      "Huawei Pura 80",
      "Huawei Nova 13",
      // 2024
      "Huawei Pura 70",
      "Huawei Nova 12",
      "Huawei Mate 60",
      // 2023
      "Huawei P60",
      "Huawei Nova 11",
      "Huawei Mate 50",
      // 2022
      "Huawei P50",
      "Huawei Nova 10",
      "Huawei Mate 40",
      // 2021
      "Huawei P40",
      "Huawei Nova 9",
      "Huawei Mate 30",
      // 2020
      "Huawei P30",
      "Huawei Nova 7",
      "Huawei Mate 20",
      // 2019
      "Huawei P20",
      "Huawei Nova 5",
      "Huawei Mate 10",
      // 2018
      "Huawei P10",
      "Huawei Nova 3",
      "Huawei Honor 7X",
      // 2017
      "Huawei P9",
      "Huawei Nova 2",
      "Huawei Honor 8",
    ],
    Asus: [
      // 2025
      "ROG Phone 9",
      "Zenfone 12",
      // 2024
      "ROG Phone 8",
      "Zenfone 11",
      "ROG Phone 8 Pro",
      // 2023
      "ROG Phone 7",
      "Zenfone 10",
      "ROG Phone 7 Ultimate",
      // 2022
      "ROG Phone 6",
      "Zenfone 9",
      "ROG Phone 6 Pro",
      // 2021
      "ROG Phone 5",
      "Zenfone 8",
      "ROG Phone 5s",
      // 2020
      "ROG Phone 3",
      "Zenfone 7",
      "Zenfone 7 Pro",
      // 2019
      "ROG Phone 2",
      "Zenfone 6",
      // 2018
      "ROG Phone",
      "Zenfone 5",
      "Zenfone Max Pro M1",
      // 2017
      "Zenfone 4",
      "Zenfone 3",
      "Zenfone AR",
    ],
    Sony: [
      // 2025
      "Xperia 1 VII",
      "Xperia 5 VI",
      // 2024
      "Xperia 1 VI",
      "Xperia 5 V",
      "Xperia 10 VI",
      // 2023
      "Xperia 1 V",
      "Xperia 5 IV",
      "Xperia 10 V",
      // 2022
      "Xperia 1 IV",
      "Xperia 5 III",
      "Xperia 10 IV",
      // 2021
      "Xperia 1 III",
      "Xperia 5 II",
      "Xperia 10 III",
      // 2020
      "Xperia 1 II",
      "Xperia 5",
      "Xperia 10 II",
      // 2019
      "Xperia 1",
      "Xperia 10",
      "Xperia 10 Plus",
      // 2018
      "Xperia XZ3",
      "Xperia XZ2",
      "Xperia XA2",
      // 2017
      "Xperia XZ1",
      "Xperia XZ Premium",
      "Xperia XA1",
    ],
    Nokia: [
      // 2025
      "Nokia X200",
      "Nokia G400",
      // 2024
      "Nokia X100",
      "Nokia G300",
      "Nokia C300",
      // 2023
      "Nokia X30",
      "Nokia G60",
      "Nokia C30",
      // 2022
      "Nokia X20",
      "Nokia G50",
      "Nokia C20",
      // 2021
      "Nokia X10",
      "Nokia G20",
      "Nokia C10",
      // 2020
      "Nokia 8.3",
      "Nokia 5.3",
      "Nokia 2.3",
      // 2019
      "Nokia 9",
      "Nokia 7.2",
      "Nokia 6.2",
      // 2018
      "Nokia 8",
      "Nokia 7 Plus",
      "Nokia 6",
      // 2017
      "Nokia 6",
      "Nokia 5",
      "Nokia 3",
    ],
  },
};

// @desc    Get all available brands
// @route   GET /api/devices/brands
// @access  Public
const getBrands = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: deviceData.brands,
      message: "Brands fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching brands",
      error: error.message,
    });
  }
};

// @desc    Get models for a specific brand
// @route   GET /api/devices/models/:brandName
// @access  Public
const getModelsByBrand = (req, res) => {
  try {
    const { brandName } = req.params;

    // Find brand (case insensitive)
    const brand = deviceData.brands.find(
      (b) => b.toLowerCase() === brandName.toLowerCase()
    );

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    const models = deviceData.models[brand] || [];

    res.status(200).json({
      success: true,
      data: {
        brand: brand,
        models: models,
      },
      message: `Models for ${brand} fetched successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching models",
      error: error.message,
    });
  }
};

module.exports = {
  getBrands,
  getModelsByBrand,
};

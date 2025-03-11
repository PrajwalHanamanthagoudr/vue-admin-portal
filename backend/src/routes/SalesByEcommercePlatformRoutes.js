const express = require("express");
const {
  getAllSalesByEcommercePlatforms,
  getSalesPlatformById,
  createSalesPlatform,
  updateSalesPlatform,
  deleteSalesPlatform,
} = require("../controllers/salesByEcommercePlatformController");

const router = express.Router();

router.get("/", getAllSalesByEcommercePlatforms);
router.post("/", createSalesPlatform);
router.get("/:id", getSalesPlatformById);
router.put("/:id", updateSalesPlatform);
router.delete("/:id", deleteSalesPlatform);

module.exports = router;

const express = require("express");
const {
  getAllRevenue,
  getRevenueById,
  createRevenue,
  updateRevenue,
  deleteRevenue,
} = require("../controllers/revenueController");

const router = express.Router();

router.get("/", getAllRevenue);
router.post("/", createRevenue);
router.get("/:id", getRevenueById);
router.put("/:id", updateRevenue);
router.delete("/:id", deleteRevenue);

module.exports = router;

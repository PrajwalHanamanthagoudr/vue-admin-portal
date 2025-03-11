const { Revenue } = require("../models/index.js");

const getAllRevenue = async (req, res) => {
  try {
    const revenues = await Revenue.findAll();
    res.status(200).json(revenues);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch revenues" });
  }
};

const getRevenueById = async (req, res) => {
  try {
    const { id } = req.params;
    const revenue = await Revenue.findByPk(id);
    if (!revenue)
      return res.status(404).json({ error: "Revenue record not found" });
    res.status(200).json(revenue);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch revenue record" });
  }
};

const createRevenue = async (req, res) => {
  try {
    const {
      totalRevenue,
      totalTarget,
      totalRevenuePercentage,
      totalTargetPercentage,
      monthYear,
      value,
    } = req.body;
    const newRevenue = await Revenue.create({
      totalRevenue,
      totalTarget,
      totalRevenuePercentage,
      totalTargetPercentage,
      monthYear,
      value,
    });
    res.status(201).json(newRevenue);
  } catch (error) {
    res.status(500).json({ error: "Failed to create revenue record" });
  }
};

const updateRevenue = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      totalRevenue,
      totalTarget,
      totalRevenuePercentage,
      totalTargetPercentage,
      monthYear,
      value,
    } = req.body;

    const revenue = await Revenue.findByPk(id);
    if (!revenue)
      return res.status(404).json({ error: "Revenue record not found" });

    await revenue.update({
      totalRevenue,
      totalTarget,
      totalRevenuePercentage,
      totalTargetPercentage,
      monthYear,
      value,
    });
    res.status(200).json(revenue);
  } catch (error) {
    res.status(500).json({ error: "Failed to update revenue record" });
  }
};

const deleteRevenue = async (req, res) => {
  try {
    const { id } = req.params;
    const revenue = await Revenue.findByPk(id);
    if (!revenue)
      return res.status(404).json({ error: "Revenue record not found" });

    await revenue.destroy();
    res.status(200).json({ message: "Revenue record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete revenue record" });
  }
};

module.exports = {
  getAllRevenue,
  getRevenueById,
  createRevenue,
  updateRevenue,
  deleteRevenue,
};

const { SalesByEcommercePlatform } = require("../models/index.js");

// Get all sales by ecommerce platform
const getAllSalesByEcommercePlatforms = async (req, res) => {
  try {
    const platforms = await SalesByEcommercePlatform.findAll();
    res.status(200).json(platforms);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch sales by ecommerce platforms" });
  }
};

// Get a sales platform by ID
const getSalesPlatformById = async (req, res) => {
  try {
    const { id } = req.params;
    const platform = await SalesByEcommercePlatform.findByPk(id);
    if (!platform) {
      return res.status(404).json({ error: "Sales platform not found" });
    }
    res.status(200).json(platform);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sales platform" });
  }
};

// Create a new sales platform
const createSalesPlatform = async (req, res) => {
  try {
    const { title, value } = req.body;
    const newPlatform = await SalesByEcommercePlatform.create({ title, value });
    res.status(201).json(newPlatform);
  } catch (error) {
    res.status(500).json({ error: "Failed to create sales platform" });
  }
};

// Update a sales platform
const updateSalesPlatform = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, value } = req.body;

    const platform = await SalesByEcommercePlatform.findByPk(id);
    if (!platform) {
      return res.status(404).json({ error: "Sales platform not found" });
    }

    await platform.update({ title, value });
    res.status(200).json(platform);
  } catch (error) {
    res.status(500).json({ error: "Failed to update sales platform" });
  }
};

// Delete a sales platform
const deleteSalesPlatform = async (req, res) => {
  try {
    const { id } = req.params;

    const platform = await SalesByEcommercePlatform.findByPk(id);
    if (!platform) {
      return res.status(404).json({ error: "Sales platform not found" });
    }

    await platform.destroy();
    res.status(200).json({ message: "Sales platform deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete sales platform" });
  }
};

module.exports = {
  getAllSalesByEcommercePlatforms,
  getSalesPlatformById,
  createSalesPlatform,
  updateSalesPlatform,
  deleteSalesPlatform,
};

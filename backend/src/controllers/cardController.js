const {
  Card,
  Revenue,
  SessionCountry,
  SessionByRegion,
  RegisteredUser,
  SalesByEcommercePlatform,
} = require("../models/index.js");

const getAllCards = async (req, res) => {
  try {
    const cards = await Card.findAll();
    const revenue = await Revenue.findAll();
    const sessionCountry = await SessionCountry.findAll();
    const sessionByRegion = await SessionByRegion.findAll();
    const registeredUser = await RegisteredUser.findAll();
    const salesByEcommercePlatform = await SalesByEcommercePlatform.findAll();

    res.json({
      results: {
        cards,
        revenue,
        sessionCountry,
        sessionByRegion,
        registeredUser,
        salesByEcommercePlatform,
      },
      total_count: cards.length,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cards" });
  }
};

const getCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findByPk(id);
    if (!card) return res.status(404).json({ error: "Card not found" });
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch card" });
  }
};

const createCard = async (req, res) => {
  try {
    const { title, value, perChange } = req.body;
    const newCard = await Card.create({ title, value, perChange });
    res.status(201).json({ message: "Widget created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create card" });
  }
};

const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, value, perChange } = req.body;
    const card = await Card.findByPk(id);
    if (!card) return res.status(404).json({ error: "Card not found" });

    await card.update({ title, value, perChange });
    res.status(200).json({ message: "Widget updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update card" });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findByPk(id);
    if (!card) return res.status(404).json({ error: "Card not found" });

    await card.destroy();
    res.status(200).json({ message: "Card deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete card" });
  }
};

module.exports = {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
};

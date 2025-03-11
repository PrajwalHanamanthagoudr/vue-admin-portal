const express = require("express");
const {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
} = require("../controllers/cardController");

const router = express.Router();

router.get("/", getAllCards);
router.post("/", createCard);
router.get("/:id", getCardById);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);

module.exports = router;

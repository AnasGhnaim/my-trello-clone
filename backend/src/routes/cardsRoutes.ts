import { Router } from "express";
import {
  getCardsByList,
  createCard,
  deleteCard,
  updateCard,
} from "../controllers/cardsController";

import { verifyAuth } from "../middleware/auth";

const router = Router();

router.use(verifyAuth);

// Get all cards for a list
router.get("/:listId", getCardsByList);

// Create a card for a list
router.post("/:listId", createCard);

//update a card for a list
router.put("/:id", updateCard);

// Delete a card
router.delete("/:id", deleteCard);

export default router;

import { Router } from "express";
import {
  getListsByBoard,
  createList,
  deleteList,
} from "../controllers/listsController";

const router = Router();

// Get all lists for a board
router.get("/:boardId", getListsByBoard);

// Create a list for a board
router.post("/:boardId", createList);

// Delete a list
router.delete("/:id", deleteList);

export default router;

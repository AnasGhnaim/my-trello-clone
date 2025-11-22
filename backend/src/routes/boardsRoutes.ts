import { Router } from "express";
import {
  getBoards,
  createBoard,
  deleteBoard,
  updateBoard,
} from "../controllers/boardsController";

const router = Router();

// Get all boards
router.get("/", getBoards);

// Create a new board
router.post("/", createBoard);

//update a board by id
router.put("/:id", updateBoard);

// Delete a board by id
router.delete("/:id", deleteBoard);

export default router;

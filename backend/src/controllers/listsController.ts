import { Request, Response } from "express";
import { pool } from "../config/db";

// Get all lists for a specific board
export const getListsByBoard = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const result = await pool.query(
      "SELECT * FROM lists WHERE board_id = $1 ORDER BY id",
      [boardId]
    );

    if (result.rows.length === 0) {
      console.log(`No lists found for board ${boardId}`);
      return res.status(404).json({ message: "No lists found for this board" });
    }

    return res.json(result.rows);
  } catch (err) {
    console.error("Error retrieving lists:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Create a list
export const createList = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const { type } = req.body;

    if (!type) {
      console.log("Missing type for list creation");
      return res.status(400).json({ message: "List type is required" });
    }

    const result = await pool.query(
      "INSERT INTO lists (board_id, type) VALUES ($1, $2) RETURNING *",
      [boardId, type]
    );

    console.log("List created successfully");
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating list:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete a list
export const deleteList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM lists WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      console.log(`List with id ${id} not found`);
      return res.status(404).json({ message: "List not found" });
    }

    console.log(`List with id ${id} deleted`);
    return res.sendStatus(204);
  } catch (err) {
    console.error("Error deleting list:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

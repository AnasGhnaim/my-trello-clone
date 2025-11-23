import { Request, Response } from "express";
import { pool } from "../config/db";

//Get all boards
export const getBoards = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM boards ORDER BY id");
    if (result.rows.length === 0) {
      console.log("No boards found");
      return res.status(404).json({ message: "No boards found" });
    }
    console.log("Boards retrieved successfully");
    return res.json(result.rows);
  } catch (err) {
    console.error("Error retrieving boards:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Create a board
export const createBoard = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    if (!title) {
      console.log("Missing title for board creation");
      return res.status(400).json({ message: "Title is required" });
    }

    const result = await pool.query(
      "INSERT INTO boards(title) VALUES($1) RETURNING *",
      [title]
    );

    console.log("Board created successfully");
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating board:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

//update a board
export const updateBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      console.log("Missing title for board update");
      return res.status(400).json({ message: "Title is required" });
    }

    const result = await pool.query(
      "UPDATE boards SET title = $1 WHERE id = $2 RETURNING *",
      [title, id]
    );

    if (result.rowCount === 0) {
      console.log(`Board with id ${id} not found`);
      return res.status(404).json({ message: "Board not found" });
    }

    console.log(`Board with id ${id} updated`);
    return res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating board:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete a board
export const deleteBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM boards WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      console.log(`Board with id ${id} not found`);
      return res.status(404).json({ message: "Board not found" });
    }

    console.log(`Board with id ${id} deleted`);
    return res.sendStatus(204);
  } catch (err) {
    console.error("Error deleting board:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

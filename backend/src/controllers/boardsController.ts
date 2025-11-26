import { Request, Response } from "express";
import { client } from "../config/db";

//Get all boards
export const getBoards = async (req: Request, res: Response) => {
  try {
    const uid = req.user?.uid;
    if (!uid) {
      return res.status(401).json({ message: "Unauthorized or expired token" });
    }
    const result = await client.query(
      "SELECT * FROM boards WHERE firebase_uid = $1 ORDER BY id",
      [uid]
    );
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Create a board
export const createBoard = async (req: Request, res: Response) => {
  try {
    const uid = req.user?.uid;
    const { title } = req.body;
    if (!uid) {
      return res.status(401).json({ message: "Unauthorized or expired token" });
    }

    const result = await client.query(
      "INSERT INTO boards(title, firebase_uid) VALUES($1, $2) RETURNING *",
      [title, uid]
    );

    // Directly return the first row safely
    const board = result[0];
    if (!board) {
      console.error("No board returned from INSERT", result);
      return res.status(500).json({ message: "Board not created properly" });
    }

    return res.status(201).json(board);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//update a board
export const updateBoard = async (req: Request, res: Response) => {
  try {
    const uid = req.user?.uid;
    const { id } = req.params;
    const { title } = req.body;
    if (!uid) {
      return res.status(401).json({ message: "Unauthorized or expired token" });
    }

    const result = await client.query(
      "UPDATE boards SET title = $1 WHERE id = $2 AND firebase_uid = $3 RETURNING *",
      [title, id, uid]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Board not found or unauthorized" });
    }

    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete a board
export const deleteBoard = async (req: Request, res: Response) => {
  try {
    const uid = req.user?.uid;
    const { id } = req.params;
    if (!uid) {
      return res.status(401).json({ message: "Unauthorized or expired token" });
    }

    const result = await client.query(
      "DELETE FROM boards WHERE id = $1 AND firebase_uid = $2 RETURNING *",
      [id, uid]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Board not found or unauthorized" });
    }

    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

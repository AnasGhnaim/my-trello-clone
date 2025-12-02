import { Request, Response } from "express";
import { client } from "../config/db";

// Get all cards for a specific list
export const getCardsByList = async (req: Request, res: Response) => {
  try {
    const uid = req.user?.uid;
    const { listId } = req.params;

    if (!uid) return res.status(401).json({ message: "Unauthorized" });

    const result = await client.query(
      "SELECT * FROM cards WHERE list_id = $1 AND firebase_uid = $2 ORDER BY id",
      [listId, uid]
    );

    return res.json(result || []);
  } catch (err) {
    console.error("Error retrieving cards:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Create a card
export const createCard = async (req: Request, res: Response) => {
  try {
    const uid = req.user?.uid;
    const { listId } = req.params;
    const { title, description } = req.body;

    if (!uid) return res.status(401).json({ message: "Unauthorized" });

    if (!title || !description) {
      console.log("Missing title or description for card creation");
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const result = await client.query(
      "INSERT INTO cards (list_id, title, description, firebase_uid) VALUES ($1, $2, $3, $4) RETURNING *",
      [listId, title, description, uid]
    );

    console.log("Card created successfully");
    return res.status(201).json(result);
  } catch (err) {
    console.error("Error creating card:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

//update a card
export const updateCard = async (req: Request, res: Response) => {
  try {
    const uid = req.user?.uid;
    const { id } = req.params;
    const { title, description, listId } = req.body;

    if (!uid) return res.status(401).json({ message: "Unauthorized" });

    const result = await client.query(
      `
      UPDATE cards
      SET 
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        list_id = COALESCE($3, list_id)
      WHERE id = $4 AND firebase_uid = $5
      RETURNING *
      `,
      [title, description, listId, id, uid]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Card not found" });
    }

    return res.json(result);
  } catch (err) {
    console.error("Error updating card:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete a card
export const deleteCard = async (req: Request, res: Response) => {
  try {
    const uid = req.user?.uid;
    const { id } = req.params;

    if (!uid) return res.status(401).json({ message: "Unauthorized" });

    const result = await client.query(
      "DELETE FROM cards WHERE id = $1  AND firebase_uid = $2 RETURNING  *",
      [id, uid]
    );

    if (result.rowCount === 0) {
      console.log(`Card with id ${id} not found`);
      return res.status(404).json({ message: "Card not found" });
    }

    console.log(`Card with id ${id} deleted`);
    return res.sendStatus(204);
  } catch (err) {
    console.error("Error deleting card:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

import { Request, Response } from "express";
import { client } from "../config/db";

// Get all cards for a specific list
export const getCardsByList = async (req: Request, res: Response) => {
  try {
    const { listId } = req.params;
    const result = await client.query(
      "SELECT * FROM cards WHERE list_id = $1 ORDER BY id",
      [listId]
    );

    if (result.rows.length === 0) {
      console.log(`No cards found for list ${listId}`);
      return res.status(404).json({ message: "No cards found for this list" });
    }

    return res.json(result);
  } catch (err) {
    console.error("Error retrieving cards:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Create a card
export const createCard = async (req: Request, res: Response) => {
  try {
    const { listId } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      console.log("Missing title or description for card creation");
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const result = await client.query(
      "INSERT INTO cards (list_id, title, description) VALUES ($1, $2, $3) RETURNING *",
      [listId, title, description]
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
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      console.log("Missing title or description for card update");
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const result = await client.query(
      "UPDATE cards SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );

    if (result.rowCount === 0) {
      console.log(`Card with id ${id} not found`);
      return res.status(404).json({ message: "Card not found" });
    }

    console.log(`Card with id ${id} updated`);
    return res.json(result);
  } catch (err) {
    console.error("Error updating card:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete a card
export const deleteCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await client.query(
      "DELETE FROM cards WHERE id = $1 RETURNING *",
      [id]
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

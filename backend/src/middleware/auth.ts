import { Request, Response, NextFunction } from "express";
import admin from "../config/firebase";

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1];
  // console.log("token firebase", token);
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = { uid: decodedToken.uid }; // Attach Firebase UID to request
    console.log("token decodedToken", decodedToken);

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

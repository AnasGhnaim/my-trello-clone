import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import boardsRouter from "./routes/boardsRoutes";
import listsRoutes from "./routes/listsRoutes";
import cardsRoutes from "./routes/cardsRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

//board routes
app.use("/boards", boardsRouter);

// list routes
app.use("/lists", listsRoutes);

//card routes
app.use("/cards", cardsRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

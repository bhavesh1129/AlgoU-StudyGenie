import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import summarizeRoute from "./routes/summarizeRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/summarize", summarizeRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

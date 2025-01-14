import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import commonRoute from "./interfaces/routes/commonRoute";
dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@tasked01.rrnhi.mongodb.net/?retryWrites=true&w=majority&appName=Tasked01`
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", commonRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

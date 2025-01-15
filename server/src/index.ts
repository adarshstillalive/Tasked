import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./interfaces/routes/userRoute";
import leadRoute from "./interfaces/routes/leadRoute";
import { createServer } from "http";
import { Server } from "socket.io";
dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@tasked01.rrnhi.mongodb.net/?retryWrites=true&w=majority&appName=Tasked01`
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    credentials: true,
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoute);
app.use("/lead", leadRoute);

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default { io };

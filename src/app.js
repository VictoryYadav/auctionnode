import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import http from "http"
import { Server } from 'socket.io';

const app = express();

const server = http.createServer(app)

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

app.use(cors())

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"]
  },
});

io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on("message", (data) => {
    // console.log(`Message from client: ${data}`);
    io.emit("message", data); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from './routes/user.routes.js'
import auctionRouter from './routes/auction.routes.js'
import bidRouter from './routes/bid.routes.js'

//routes declaration
app.use("/users", userRouter)
app.use("/auction", auctionRouter)
app.use("/bids", bidRouter)

export { app, server }
import express from "express";
import cors from "cors";
import userRouter from "./Router/userRouter.js";
import connectDB from "./Config/dbConfig.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import adminRouter from "./Router/adminRouter.js";
import { movieRouter } from "./Router/movieRouter.js";
import { theaterRouter } from "./Router/theaterRouter.js";
import { bookingRouter } from "./Router/bookingRouter.js";
import { paymentRouter } from "./Router/paymentRouter.js";

const app = express();
// app.use(cors())
const corsOptions = {
  origin:
    // "http://localhost:5173" ||
    // "https://movietickerbooking.netlify.app" ||
    "https://moviesticketbooking.netlify.app" ||
    "https://movie-ticket-bookingapplication.onrender.com", // Your frontend URL
  credentials: true, // This allows the server to accept credentials
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/movie", movieRouter);
app.use("/api/v1/theater", theaterRouter);
app.use("/api/v1/booking", bookingRouter);
// app.use('/api/v1/upload',imageUploadRouter);
app.use("/api/v1/order", paymentRouter);

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(` listening to the port ${process.env.PORT}`);
});

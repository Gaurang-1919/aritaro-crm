import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import limiter from "./middlewares/ratelimiter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(limiter);



app.get("/", (req, res) => {
   res.send("Server is running ");
});

export default app;
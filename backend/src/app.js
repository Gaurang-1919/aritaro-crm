import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import limiter from "./middlewares/ratelimiter.js";

import authRoutes from "./routes/authRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js";
import followUpRoutes from "./routes/followUpRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import standAloneRoutes from "./routes/standAloneRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(limiter);



app.get("/", (req, res) => {
   res.send("Server is running ");
});

// --- Feature routes ---
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/followups", followUpRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", standAloneRoutes); // handles /api/activities and /api/notifications

// --- Error handling (must be registered LAST) ---
app.use(notFound);
app.use(errorHandler);

export default app;

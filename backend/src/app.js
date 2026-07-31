import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import limiter from "./middlewares/ratelimiter.js";
import errorHandler from "./middlewares/error.middleware.js";

// Routes
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import leadRouter from "./routes/lead.routes.js";
import conversationRouter from "./routes/conversation.routes.js";
import followUpRouter from "./routes/followUp.routes.js";
import meetingRouter from "./routes/meeting.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import standaloneRouter from "./routes/standalone.routes.js";

const app = express();

//Middlewares//

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(limiter);

//Routes//

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/leads", leadRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/followups", followUpRouter);
app.use("/api/meetings", meetingRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api", standaloneRouter);
app.use(errorHandler);

export default app;
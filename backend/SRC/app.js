import express from "express";
import cors from "cors";
import morgan from "morgan";

import errorMiddleware from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/auth.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import overtimeRoutes from "./routes/overtime.routes.js";
import userRoutes from "./routes/user.routes.js";
import dashboardRotes from "./routes/dashboard.routes.js"
import report from "./routes/report.routes.js"

const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/overtime", overtimeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard",dashboardRotes);
app.use("/api/reports",report);


app.use(errorMiddleware);

export default app;


import express from "express";
import auth from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import { dailyReport } from "../controllers/report.controller.js";

const router = express.Router();
router.get("/daily", auth, authorize("admin", "manager"), dailyReport);
export default router;

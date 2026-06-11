import express from "express";
import { adminDashboard, employeeDashboard } from "../controllers/dashboard.controller.js";
import authorize from "../middleware/role.middleware.js";
import auth from "../middleware/auth.middleware.js";
const router = express.Router();
router.get(
  "/employee",
  auth,
  authorize("employee", "manager", "admin"),
  employeeDashboard,
);
router.get("/admin", auth, authorize("admin", "manager"), adminDashboard);
export default router;

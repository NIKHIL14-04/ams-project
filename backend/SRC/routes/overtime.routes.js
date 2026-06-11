import express from "express";
import auth from "../middleware/auth.middleware.js";
import { approveOT, getPendingOT, requestOT } from "../controllers/overtime.controller.js";
import authorize from "../middleware/role.middleware.js";
const router = express.Router();
router.post("/request", auth, requestOT);
router.get("/pending", auth, authorize("admin", "manager"), getPendingOT);
router.put("/approve/:id", auth, authorize("admin", "manager"), approveOT);

export default router;

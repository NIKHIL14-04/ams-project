import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getAllAttendance,
  getMyAttendance,
  punchIn,
  punchOut,
  validateAttendance,
} from "../controllers/attendance.controller.js";
import authorize from "../middleware/role.middleware.js";

const router = express.Router();
router.post("/punchin", auth, punchIn);
router.post("/punchout", auth, punchOut);
router.get("/myattendance", auth, getMyAttendance);
router.get("/all", auth, authorize("admin", "manager"), getAllAttendance);
router.put("/validate/:attendanceId",auth,authorize("admin", "manager"),validateAttendance,);
export default router;

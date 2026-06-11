import express from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import auth from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";


const router = express.Router();

router.get("/", auth, authorize("admin"), getAllUsers);

export default router;

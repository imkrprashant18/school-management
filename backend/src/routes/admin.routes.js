import { Router } from "express";
import {
  adminRegister,
  loginAdmin,
  getCurrentAdmin,
  logOutAdmin,
} from "../controllers/admin.controller.js";
import { adminVerifyJwt } from "../middelware/adminAuth.js";
const router = Router();

router.route("/register").post(adminRegister);
router.route("/login").post(loginAdmin);

// protected route
router.route("/current-admin").get(adminVerifyJwt, getCurrentAdmin);
router.route("/logout").post(adminVerifyJwt, logOutAdmin);
export default router;

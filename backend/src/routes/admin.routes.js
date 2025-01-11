import { Router } from "express";
import {
  adminRegister,
  loginAdmin,
  getCurrentAdmin,
  logOutAdmin,
  updateAdminProfile,
} from "../controllers/admin.controller.js";
import { upload } from "../middelware/multer.middelware.js";
import { adminVerifyJwt } from "../middelware/adminAuth.js";
const router = Router();

router.route("/register").post(adminRegister);
router.route("/login").post(loginAdmin);

// protected route
router.route("/current-admin").get(adminVerifyJwt, getCurrentAdmin);
router.route("/logout").post(adminVerifyJwt, logOutAdmin);
router.route("/update-profile").post(
  adminVerifyJwt,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  updateAdminProfile
);
export default router;

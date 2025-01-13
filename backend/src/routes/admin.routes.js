import { Router } from "express";
import {
  adminRegister,
  loginAdmin,
  getCurrentAdmin,
  logOutAdmin,
  updateAdminProfile,
  createStudent,
  deleteStudent,
  getStudents,
  getStudentById,
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

// student create
router.route("/create-student").post(adminVerifyJwt, createStudent);
router.route("/delete-student/:id").delete(adminVerifyJwt, deleteStudent);
router.route("/get-students").get(adminVerifyJwt, getStudents);
router.route("/get-student/:id").get(adminVerifyJwt, getStudentById);
export default router;

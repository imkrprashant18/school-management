import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateRandomId } from "../utils/generateRandomId.js";
const studentSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      default: null,
      trim: true,
      index: true,
    },
    studentId: {
      type: String,
      default: null,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    image: {
      type: String,
      default: null,
    },
    dob: {
      type: Date,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
    createdBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Admin",
      },
    ],
    parents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Parent",
      },
    ],
    assignment: [
      {
        type: Schema.Types.ObjectId,
        ref: "Assignment",
      },
    ],
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    notice: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notice",
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

studentSchema.pre("save", async function (next) {
  if (!this.studentId) {
    let isUnique = false;
    let newStudentId;
    while (!isUnique) {
      newStudentId = generateRandomId(5);
      const existingStudent = await Student.findOne({
        studentId: newStudentId,
      });
      if (!existingStudent) {
        isUnique = true;
      }
    }
    this.studentId = newStudentId;
  }
  next();
});
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //used to check the password either modified or not
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

studentSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

studentSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
studentSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const Student = mongoose.model("Student", studentSchema);

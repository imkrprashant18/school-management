import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/admin.model.js";
import { Student } from "../models/students.model.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";
const generateAccessandRefereshToken = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};
const adminRegister = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if ([username, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await Admin.findOne({ username });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }
  const admin = await Admin.create({
    username: username.toLowerCase(),
    password,
  });

  const createdUser = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username && !password) {
    throw new ApiError(400, "All fields are required");
  }
  const admin = await Admin.findOne({ username });
  if (!admin) {
    throw new ApiError(404, "Admin does not exist");
  }
  const isPasswordValid = await admin.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid admin credentials");
  }
  const { accessToken, refreshToken } = await generateAccessandRefereshToken(
    admin._id
  );
  const loggedInAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          admin: loggedInAdmin,
          accessToken,
          refreshToken,
        },
        "Admin logged In Successfully"
      )
    );
});

const getCurrentAdmin = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.admin, "Admin fetched successfully"));
});

const logOutAdmin = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(
    req.admin._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Admin logged Out"));
});

const updateAdminProfile = asyncHandler(async (req, res) => {
  const { email, fullName } = req.body;
  if (!email && !fullName) {
    throw new ApiError(400, "All fields are required");
  }
  const avatarLocalPath = req.files?.image[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  const avatar = await UploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  const admin = await Admin.findByIdAndUpdate(
    req.admin?._id,
    {
      $set: {
        fullName,
        email,
        image: avatar.url,
      },
    },
    { new: true }
  ).select("-password --refreshToken");
  return res
    .status(200)
    .json(new ApiResponse(200, admin, "Profile updated successfully"));
});

// students
// student create
const createStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await Student.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "Student already exists");
  }

  const admin = await Admin.findById(req.admin._id);
  if (!admin) {
    throw new ApiError(404, "Admin does not exist");
  }
  const student = await Student.create({
    email,
    password,
    createdBy: admin,
  });

  const createdUser = await Student.findById(student._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(
      500,
      "Something went wrong while registering the Student"
    );
  }
  await Admin.findByIdAndUpdate(admin, {
    $push: {
      students: createdUser._id,
    },
  });
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "Student registered Successfully"));
});

// student delete
const deleteStudent = asyncHandler(async (req, res) => {
  const studentIds = req.params?.id;
  const student = await Student.findById(studentIds);
  if (!student) {
    throw new ApiError(402, "Student does not exist");
  }
  const admin = await Admin.findById(req.admin._id);
  if (!admin.createdBy === req.admin._id) {
    throw new ApiError(401, "You are not authorized to delete this student");
  }
  const deleteStudent = await Student.findByIdAndDelete(studentIds);
  if (!deleteStudent) {
    throw new ApiError(404, "Student does not exist");
  }
  await Admin.findByIdAndUpdate(admin, {
    $pull: {
      students: studentIds,
    },
  });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Student deleted successfully"));
});

// get students
const getStudents = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);
  if (!admin.createdBy === req.admin._id) {
    throw new ApiError(401, "You are not authorized to get students");
  }
  const students = await Student.find().select("--password");
  if (!students) {
    throw new ApiError(404, "Students does not exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, students, "Students fetched successfully"));
});

// get students by id
const getStudentById = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);
  if (!admin.createdBy === req.admin._id) {
    throw new ApiError(401, "You are not authorized to get students");
  }
  const studentId = req.params.id;
  const student = await Student.findById(studentId).select("--password");
  if (!student) {
    throw new ApiError(404, "Student does not exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, student, "Student fetched successfully"));
});
export {
  adminRegister,
  loginAdmin,
  getCurrentAdmin,
  logOutAdmin,
  updateAdminProfile,
  createStudent,
  deleteStudent,
  getStudents,
  getStudentById,
};

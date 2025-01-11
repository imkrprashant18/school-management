import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/admin.model.js";

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

export { adminRegister, loginAdmin, getCurrentAdmin, logOutAdmin };

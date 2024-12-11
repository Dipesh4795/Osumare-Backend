const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({
        message: "token is missing,please login again",
      });
    }
    console.log(token);
    try {
      const decode = await jwt.verify(token, "DIPESH");
      console.log(decode);
      req.user = decode;
    } catch (error) {
      return res
        .status(400)
        .json({ console: log(error), message: "token is invalid" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,

      message: "somthing is cause error to validate token",
    });
  }
};

exports.isTeacher = async (req, res, next) => {
  try {
    if (req.user.accounttype !== "Teacher") {
      return res.status(400).json({
        success: false,
        message: "you are not allowed to access Teacher's role",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      console: log(error),
      message: "somthing is cause error to validate Teacher",
    });
  }
};

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accounttype !== "Student") {
      return res.status(400).json({
        success: false,
        message: "you are not allowed to access Student's role",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      console: log(error),
      message: "somthing is cause error to validate Student",
    });
  }
};

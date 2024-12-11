const bcrypt = require("bcrypt");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./User");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : [];
exports.signUp = async (req, res) => {
  try {
    const { email, password, confirmpassword, accounttype } = req.body;
    if (!email || !password || !confirmpassword || !accounttype) {
      return res.status(400).json({
        success: false,
        message: "error in signup,data is missing",
      });
    }

    if (password != confirmpassword) {
      return res.status(400).json({
        success: false,
        message: "error in signup,password and confirmpassword not match",
      });
    }

    const userexist = User.findIndex((item) => item.email === email);
    if (userexist >= 0) {
      return res.status(400).json({
        success: false,
        message: "error in signup,email already registred",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = {
      id: uuidv4(),
      email: email,
      password: hashpassword,
      accounttype: accounttype,
    };
    User.push(user);
    localStorage.setItem("user", JSON.stringify(User));
    return res.status(200).json({
      success: true,
      message: "user registered succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error in signup",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "login credeintals empty",
      });
    }

    const userexist = User.findIndex((item) => item.email === email);
    if (userexist === -1) {
      return res.status(400).json({
        success: false,
        message: "first  signup",
      });
    }

    if (await bcrypt.compare(password, User[userexist].password)) {
      const payload = {
        email: email,
        id: User[userexist].id,
        accounttype: User[userexist].accounttype,
      };
      const token = jwt.sign(payload, "DIPESH", {
        expiresIn: "24h",
      });
      const user = User[userexist];
      user.token = token;
      user.password = undefined;

      return res.status(200).json({
        success: true,
        message: "user logged succesfully",
        user,
        token,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "password invalid",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error in login",
    });
  }
};

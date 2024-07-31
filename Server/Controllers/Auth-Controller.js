const AuthModel = require("../Models/Auth-Model");

const Register = async (req, resp) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const checkEmail = await AuthModel.findOne({ email });

    if (checkEmail) {
      return resp.status(401).json({
        success: false,
        message: "User Already Exists",
      });
    }

    const user = await AuthModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    resp.status(201).json({
      message: "Register Successfully",
      token: await user.generateToken(),
      userId: user._id.toString(),
      user
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const LoginUser = async (req, resp) => {
  try {
    const { email, password } = req.body;

    const findEmail = await AuthModel.findOne({ email });

    if (!findEmail) {
      return resp.status(401).json({ message: "Incorrect Email" });
    } else {
      const user = await findEmail.ComparePassword(password);

      if (user) {
        resp.status(201).json({
          message: "Login Successfull",
          token: await findEmail.generateToken(),
          userId: findEmail._id.toString(),
          findEmail
        });
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const UserData = async (req, resp) => {
  try {
    const userData = req.user;
    resp.status(201).json({
      message: "Success",
      userData,
    });
  } catch (error) {
    console.log("Error from backend");
  }
};

module.exports = { Register, LoginUser, UserData };

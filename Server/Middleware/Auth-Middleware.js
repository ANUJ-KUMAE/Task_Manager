const jwt = require("jsonwebtoken");
const AuthModel = require("../Models/Auth-Model");

const AuthMiddleware = async (req, resp, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return resp
      .status(401)
      .json({ msg: "Unauthorize access of HTTPS token not provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();

  try {
    const isVerified = jwt.verify(jwtToken, process.env.TOKEN);

    const usersData = await AuthModel.findOne({
      email: isVerified.email,
    }).select({
      password: 0,
    });

    req.user = usersData;
    req.token = token;
    req.userID = usersData._id;

    next();
  } catch (error) {
    return resp.status(405).json({ message: "Unauthorized. Invalid Token" });
  }
};

module.exports = AuthMiddleware;

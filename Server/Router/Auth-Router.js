const express = require("express");
const router = express.Router();
const Validate = require("../Middleware/Validate-Middleware");
const AuthValidationSchena = require("../Validation/Auth-Validation");
const {
  Register,
  LoginUser,
  UserData,
} = require("../Controllers/Auth-Controller");
const AuthMiddleware = require("../Middleware/Auth-Middleware");
const LoginValidationSchena = require("../Validation/Login-Validation");
const passport = require("passport");

router.route("/registerNew").post(Validate(AuthValidationSchena), Register);
router.route("/loginUser").post(Validate(LoginValidationSchena), LoginUser);
router.route("/Loginuserdata").get(AuthMiddleware, UserData);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/home",
    failureRedirect: "http://localhost:5173/",
  })
);

module.exports = router;

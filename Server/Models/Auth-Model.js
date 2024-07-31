const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const AuthSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//-----Password Encryption------

AuthSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

AuthSchema.methods.ComparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

AuthSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.TOKEN,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const AuthModel = new mongoose.model("Users", AuthSchema);

module.exports = AuthModel;

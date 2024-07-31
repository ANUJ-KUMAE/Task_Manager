const mongoose = require("mongoose");

const AuthSchemas = new mongoose.Schema({
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
});

const userModels = new mongoose.model("GoogleSignUsers", AuthSchemas);

module.exports = userModels;

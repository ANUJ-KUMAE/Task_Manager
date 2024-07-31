const express = require("express");
const mongoose = require("mongoose");

const URL = process.env.SERVER_LINK;

const ConnectionDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Database Connection Successful");
  } catch (error) {
    console.log("Database connection Failed");
    process.exit(1);
  }
};

module.exports = ConnectionDB;

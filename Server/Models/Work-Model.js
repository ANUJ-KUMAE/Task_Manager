const mongoose = require("mongoose");

const WorkSchema = new mongoose.Schema({
  workName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  progress: {
    type: String,
    required: true,
    enum: {
      values: ["Todo", "InProgress", "Done"],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const WorkModel = new mongoose.model("Task", WorkSchema);

module.exports = WorkModel;

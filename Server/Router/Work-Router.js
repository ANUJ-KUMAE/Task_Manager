const express = require("express");
const Validate = require("../Middleware/Validate-Middleware");
const workValidation = require("../Validation/Work-Validation");
const AuthMiddleware = require("../Middleware/Auth-Middleware");
const {
  AddNewtask,
  GetAllTask,
  GetSingleTask,
  UpdateTask,
  DeleteTask,
  SearchUserTask,
} = require("../Controllers/Work-Controller");
const router = express.Router();

router.route("/addTask").post(AuthMiddleware, Validate(workValidation), AddNewtask);
router.route("/viewAlltask").get(AuthMiddleware, GetAllTask);
router.route("/getSingleTask/:id").get(AuthMiddleware, GetSingleTask);
router.route("/updatetask/:id").put(AuthMiddleware, UpdateTask);
router.route("/deleteTask/:id").delete(AuthMiddleware, DeleteTask);
router.route("/searchData/:key").get(AuthMiddleware, SearchUserTask);

module.exports = router;

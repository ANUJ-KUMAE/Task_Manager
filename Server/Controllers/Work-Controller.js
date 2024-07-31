const WorkMoel = require("../Models/Work-Model");

const AddNewtask = async (req, resp) => {
  try {
    const { workName, description, progress } = req.body;

    const taskExists = await WorkMoel.findOne({ workName });

    if (taskExists) {
      return resp.status(401).json({
        message: "Task Already Exists",
      });
    }

    const taskAdded = await WorkMoel.create({
      workName,
      description,
      progress,
    });

    return resp.status(201).json({
      success: true,
      taskAdded
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const GetAllTask = async (req, resp) => {
  try {
    const GetAllData = await WorkMoel.find();

    if (GetAllData.length === 0) {
      return resp.status(401).json({
        message: "No Data Found",
      });
    } else {
      return resp.status(201).json({
        message: "Success",
        GetAllData,
      });
    }
  } catch (error) {
    next(error);
  }
};

const GetSingleTask = async (req, resp) => {
  try {
    const singleTask = await WorkMoel.findOne({ _id: req.params.id });

    return resp.status(201).json({
      message: "Success",
      singleTask,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const UpdateTask = async (req, resp) => {
  try {
    const updateData = await WorkMoel.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    return resp.status(201).json({
      message: "Success",
      updateData,
    });
  } catch (error) {
    next(error);
  }
};

const DeleteTask = async (req, resp) => {
  try {
    const deleteTask = await WorkMoel.deleteOne({
      _id: req.params.id,
    });

    return resp.status(201).json({
      message: "Success",
      deleteTask,
    });
  } catch (error) {
    next(error);
  }
};

const SearchUserTask = async (req, resp) => {
  try {
    const UserSearchData = await WorkMoel.find({
      $or: [
        { workName: { $regex: req.params.key } },
        { description: { $regex: req.params.key } },
        { progress: { $regex: req.params.key } },
      ],
    });

    return resp.status(201).json({ message: "Success", UserSearchData });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AddNewtask,
  GetAllTask,
  GetSingleTask,
  UpdateTask,
  DeleteTask,
  SearchUserTask,
};

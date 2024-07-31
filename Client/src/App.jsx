import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/LoginSignup/Login";
import Signup from "./Components/LoginSignup/Signup";
import Home from "./Components/Home/Home";
import PrivateComponents from "./Components/PrivateLinks/PrivateComponents";
import SingleTask from "./Components/SingleTask/SingleTask";
import AddTask from "./Components/Addtask/AddTask";
import Updatetask from "./Components/UpdateTask/Updatetask";
import SearchPage from "./Components/SearchProduct/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<PrivateComponents />}>
          <Route path="/home" element={<Home />} />
          <Route path="/singleTaskdata/:id" element={<SingleTask />} />
          <Route path="/addNewTask" element={<AddTask />} />
          <Route path="/updateusertask/:id" element={<Updatetask />} />
          <Route path="/user/Searchdata" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

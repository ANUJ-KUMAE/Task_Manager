import React, { useState, useEffect } from "react";
import "./LoginSignup.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ClearErrors, RegisterAction } from "../../Redux/Actions/Auth-Action";
import { toast } from "react-toastify";

const Signup = () => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.Authentication
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
      toast.success("Register Successful");
    }

    if (error) {
      toast.error(
        error.data.extraDetails ? error.data.message : error.data.extraDetails
      );
      dispatch(ClearErrors());
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newUser);
    dispatch(RegisterAction(newUser));
  };

  const LoginWithGoogle = () => {
    window.open("http://localhost:5083/auth/User/google", "_self");
  };

  return (
    <section>
      <div className="Login-Signup-Container">
        <div className="login-signup-grid">
          <form onSubmit={handleSubmit}>
            <div className="login-signup-input-form">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={newUser.firstName}
                onChange={handlechange}
                autoComplete="off"
              />
            </div>
            <div className="login-signup-input-form">
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={newUser.lastName}
                onChange={handlechange}
                autoComplete="off"
              />
            </div>
            <div className="login-signup-input-form">
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={newUser.email}
                onChange={handlechange}
                autoComplete="off"
              />
            </div>
            <div className="login-signup-input-form">
              <input
                type="text"
                placeholder="Password"
                name="password"
                value={newUser.password}
                onChange={handlechange}
                autoComplete="off"
              />
            </div>
            <div className="login-signup-button">
              <button>Signup</button>
            </div>
            <div className="login-signup-details">
              <p>
                Already have an account?{" "}
                <NavLink to="/">
                  <span>Login</span>
                </NavLink>
              </p>
            </div>
          </form>
          <div className="login-with-google">
            <button onClick={LoginWithGoogle}>Signup with Google</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;

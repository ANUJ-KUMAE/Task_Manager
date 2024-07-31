import React, { useState, useEffect } from "react";
import "./LoginSignup.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ClearErrors, LoginAction } from "../../Redux/Actions/Auth-Action";

//const URL = "http://localhost:5083/auth/User/loginUser";

const Login = () => {
  const [singleUser, setSingleUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, user, isAuthenticated } = useSelector(
    (state) => state.Authentication
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
      toast.success("Login Successful");
    }

    if (error) {
      toast.error(
        error.data.extraDetails ? error.data.message : error.data.extraDetails
      );
      dispatch(ClearErrors());
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  const handleData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSingleUser({
      ...singleUser,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(singleUser.email);
    console.log(singleUser.password);
    dispatch(LoginAction(singleUser.email, singleUser.password));
  };

  const LoginWithGoogle = () => {
    window.open("https://task-manager-api-silk.vercel.app/auth/User/google", "_self");
  };

  return (
    <section>
      <div className="Login-Signup-Container">
        <div className="login-signup-grid">
          <form onSubmit={handleSubmit}>
            <div className="login-signup-input-form">
              <input
                type="text"
                name="email"
                value={singleUser.email}
                onChange={handleData}
                placeholder="Email"
                autoComplete="off"
              />
            </div>
            <div className="login-signup-input-form">
              <input
                type="text"
                placeholder="Password"
                name="password"
                value={singleUser.password}
                onChange={handleData}
                autoComplete="off"
              />
            </div>
            <div className="login-signup-button">
              <button>Login</button>
            </div>
            <div className="login-signup-details">
              <p>
                Don't have an account?{" "}
                <NavLink to="/signup">
                  <span>Signup</span>
                </NavLink>
              </p>
            </div>
          </form>
          <div className="login-with-google">
            <button onClick={LoginWithGoogle}>Login with Google</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

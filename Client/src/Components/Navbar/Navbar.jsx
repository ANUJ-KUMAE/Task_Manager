import React from "react";
import { FaCalendar } from "react-icons/fa";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOutuser } from "../../Redux/Actions/Auth-Action";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state) => state.Authentication
  );

  const navigate = useNavigate();

  const LogOut = () => {
    dispatch(LogOutuser());
    navigate("/");
  };

  return (
    <header>
      <div className="navbar-container">
        <div className="nav-icons">
          <FaCalendar className="nav-icons-data" />
        </div>
        <div className="nav-lists-data">
          <ul>
            {isAuthenticated ? (
            <ul>
              <li>{user.firstName} {user.lastName}</li>
              <li>
                <button onClick={LogOut}>Logout</button>
              </li>
            </ul>
            ) : (
              <ul>
                <li>
                  <NavLink to="/">
                    <button>Login</button>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup">
                    <button>Signup</button>
                  </NavLink>
                </li>
              </ul>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

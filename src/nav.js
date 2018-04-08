import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <NavLink className="nav-link" data-toggle="pill" to={"/"}>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" data-toggle="pill" to={"/api/campuses"}>
            campuses
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" data-toggle="pill" to={"/api/students"}>
            students
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Nav;

import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-sky-600 px-4 md:px-6 lg:px-8 py-4 md:py-6 flex justify-between items-center text-white">
      <Link to="/" className="text-xl md:text-2xl font-semibold">
        Task Manager
      </Link>
      <div className="space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "default")}
        >
          Add Task
        </NavLink>
        <NavLink
          to="/taskList"
          className={({ isActive }) => (isActive ? "active" : "default")}
        >
          Task List
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useEffect, useState } from 'react';
import logo from "../images/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import { MdLightMode } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import { api_base_url, toggleClass } from '../helper';

const Navbar = ({ isGridLayout, setIsGridLayout }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLightMode, setIsLightMode] = useState(() => {
    // Initialize theme based on localStorage or default to dark
    return localStorage.getItem("theme") === "light";
  });

  useEffect(() => {
    fetch(api_base_url + "/users/getUserDetails", { 
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setData(data.user);
      } else {
        setError(data.message);
      }
    });
  }, []);

  useEffect(() => {
    // Apply the theme to the document body
    if (isLightMode) {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  return (
    <div
      className={`navbar flex items-center justify-between px-[100px] h-[80px] ${
        isLightMode ? "bg-[#f9f9f9] text-black" : "bg-[#141414] text-white"
      }`}
    >
      <div className="logo">
        <img className="w-[150px] cursor-pointer" src={logo} alt="Logo" />
      </div>
      <div className="links flex items-center gap-2">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/services">Services</Link>
        <button
          onClick={logout}
          className={`btnBlue ${
            isLightMode ? "!bg-red-500 text-white" : "!bg-red-500 text-black"
          } min-w-[120px] ml-2 hover:!bg-red-600`}
        >
          Logout
        </button>
        <Avatar
          onClick={() => {
            toggleClass(".dropDownNavbar", "hidden");
          }}
          name={data ? data.name : ""}
          size="40"
          round="50%"
          className="cursor-pointer ml-2"
        />
      </div>
      <div
        className={`dropDownNavbar hidden absolute right-[60px] top-[80px] shadow-lg shadow-black/50 p-[10px] rounded-lg ${
          isLightMode ? "bg-[#e5e5e5]" : "bg-[#1A1919]"
        } w-[150px] h-[160px]`}
      >
        <div className="py-[10px] border-b-[1px] border-b-[#fff]">
          <h3
            className="text-[17px]"
            style={{ lineHeight: 1, color: isLightMode ? "#000" : "#fff" }}
          >
            {data ? data.name : ""}
          </h3>
        </div>
        <i
          onClick={toggleTheme}
          className="flex items-center gap-2 mt-3 mb-2 cursor-pointer"
          style={{ fontStyle: "normal" }}
        >
          <MdLightMode className="text-[20px]" />{" "}
          {isLightMode ? "Dark mode" : "Light mode"}
        </i>
        <i
          onClick={() => setIsGridLayout(!isGridLayout)}
          className="flex items-center gap-2 mt-3 mb-2 cursor-pointer"
          style={{ fontStyle: "normal", color: isLightMode ? "#000" : "#fff" }}
        >
          <BsGridFill className="text-[20px]" />{" "}
          {isGridLayout ? "List" : "Grid"} layout
        </i>
      </div>
    </div>
  );
};

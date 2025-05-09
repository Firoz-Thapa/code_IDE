import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import logo from "../images/logo.png";
import { Link, NavLink } from 'react-router-dom';
import Avatar from 'react-avatar';
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { BsGridFill, BsList } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { api_base_url } from '../helper';

const Navbar = ({ isGridLayout, setIsGridLayout, onLogout }) => {
  const [data, setData] = useState(null);
  const [setError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);
  const [isLightMode, setIsLightMode] = useState(() => {
    // Initialize theme based on localStorage or default to dark
    return localStorage.getItem("theme") === "light";
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) && 
        avatarRef.current && 
        !avatarRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, avatarRef]);

  useEffect(() => {
    // Skip data fetching if logging out
    if (isLoggingOut) return;
    
    const userId = localStorage.getItem("userId");
    
    // Check if userId exists
    if (!userId) {
      // Only log if not in logout process
      if (!isLoggingOut) {
        console.log("No userId found in localStorage");
      }
      return;
    }
    
    fetch(`${api_base_url}/users/getUserDetails`, { 
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId
      })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      if (data.success) {
        setData(data.user);
      } else {
        setError(data.message);
      }
    })
    .catch(err => {
      console.error("Error fetching user details:", err);
      setError("Failed to load user data");
    });
  }, [isLoggingOut]);

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    // Set logging out state to prevent further API calls
    setIsLoggingOut(true);
    
    // Notify parent component about logout
    if (onLogout) {
      onLogout();
    }
    
    // Clear all auth-related items from localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    
    // Use direct location change for a full page refresh
    window.location.href = "/login";
  };

  // Custom active link style for NavLink
  const getActiveStyle = ({ isActive }) => {
    return isActive 
      ? "text-[#00AEEF] font-medium relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#00AEEF] after:bottom-[-4px] after:left-0"
      : "text-inherit hover:text-[#00AEEF] relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-[#00AEEF] after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all after:duration-300";
  };

  return (
    <nav
      className={`sticky top-0 z-[1000] flex items-center justify-between px-[5%] md:px-[8%] lg:px-[100px] h-[80px] transition-all duration-300 ${
        isLightMode 
          ? "bg-white text-gray-800 shadow-[0_2px_10px_rgba(0,0,0,0.1)]" 
          : "bg-[#141414] text-white shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
      }`}
    >
      <Link to="/" className="flex items-center">
        <img className="w-[140px] h-auto cursor-pointer" src={logo} alt="Code IDE Logo" />
      </Link>
      
      <div className="hidden md:flex items-center space-x-8">
        <NavLink 
          to="/" 
          className={getActiveStyle}
        >
          Home
        </NavLink>
        <NavLink 
          to="/about" 
          className={getActiveStyle}
        >
          About
        </NavLink>
        <NavLink 
          to="/contact" 
          className={getActiveStyle}
        >
          Contact
        </NavLink>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={logout}
          className="hidden md:flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-all duration-200 hover:-translate-y-[2px]"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
        
        <div className="relative">
          <div 
            ref={avatarRef}
            onClick={toggleDropdown}
            className="cursor-pointer flex items-center space-x-2 rounded-full border-2 border-transparent hover:border-[#00AEEF] transition-all duration-200 hover:scale-105"
          >
            <Avatar
              name={data ? data.name : "User"}
              size="40"
              round="50%"
              className="shadow-md"
              textSizeRatio={2.5}
              color="#00AEEF"
            />
          </div>
          
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className={`absolute right-0 top-[55px] rounded-lg ${
                isLightMode 
                  ? "bg-white text-gray-800 border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.1)]" 
                  : "bg-[#1A1919] text-white border border-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              } w-[220px] py-2 z-10 overflow-hidden transition-all duration-200 ease-in-out animate-[fadeIn_0.2s_ease-out]`}
              style={{
                animation: "fadeIn 0.2s ease-out",
              }}
            >
              <div className={`px-4 py-3 border-b ${isLightMode ? "border-gray-200" : "border-gray-700"}`}>
                <h3 className="text-[15px] font-medium">
                  {data ? data.name : "User"}
                </h3>
                <p className="text-[13px] text-gray-500 truncate">
                  {data ? data.email : "user@example.com"}
                </p>
              </div>
              
              <div className="mt-1">
                <button
                  onClick={toggleTheme}
                  className={`w-full text-left px-4 py-2 text-[14px] flex items-center space-x-3 hover:${
                    isLightMode ? "bg-gray-100" : "bg-[#252525]"
                  } transition-colors duration-150`}
                >
                  {isLightMode ? (
                    <>
                      <MdDarkMode className="text-[18px]" />
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <MdLightMode className="text-[18px]" />
                      <span>Light Mode</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => {
                    setIsGridLayout(!isGridLayout);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-[14px] flex items-center space-x-3 hover:${
                    isLightMode ? "bg-gray-100" : "bg-[#252525]"
                  } transition-colors duration-150`}
                >
                  {isGridLayout ? (
                    <>
                      <BsList className="text-[18px]" />
                      <span>List Layout</span>
                    </>
                  ) : (
                    <>
                      <BsGridFill className="text-[18px]" />
                      <span>Grid Layout</span>
                    </>
                  )}
                </button>
                
                <div className={`border-t ${isLightMode ? "border-gray-200" : "border-gray-700"} my-1`}></div>
                
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-[14px] flex items-center space-x-3 text-red-500 hover:bg-red-500/10 transition-colors duration-150"
                >
                  <FiLogOut className="text-[18px]" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isGridLayout: PropTypes.bool.isRequired,
  setIsGridLayout: PropTypes.func.isRequired,
  onLogout: PropTypes.func
};

export default Navbar;
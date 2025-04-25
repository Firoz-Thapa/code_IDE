import { useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import image from "../images/authPageSide.png";
import { api_base_url } from "../helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("Making login request to:", `${api_base_url}/users/login`);
    
    fetch(`${api_base_url}/users/login`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
      }),
    })
      .then((res) => {
        console.log("Login response status:", res.status);
        return res.json().then(data => {
          if (!res.ok) {
            throw new Error(data.message || "Login failed");
          }
          return data;
        });
      })
      .then((data) => {
        console.log("Login success, full response data:", data);
        setLoading(false);
        
        if (data.success === true) {
          // Store JWT token and user ID in localStorage
          console.log("Setting localStorage values");
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userId", data.userId);
          console.log("localStorage values set, checking values:");
          console.log("isLoggedIn:", localStorage.getItem("isLoggedIn"));
          console.log("userId:", localStorage.getItem("userId"));
          
          // Force a page refresh and redirect to home
          window.location.href = "/";
        } else {
          setError(data.message || "Login failed");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setLoading(false);
        setError(error.message || "Login failed. Please try again.");
      });
  };

  return (
    <>
      <div className="container w-screen min-h-screen flex items-center justify-between pl-[100px]">
        <div className="left w-[35%]">
          <img className="w-[200px]" src={logo} alt="Logo" />
          <form onSubmit={submitForm} className="w-full mt-[60px]" action="">
            <div className="inputBox">
              <input
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="email"
                placeholder="Email"
                disabled={loading}
              />
            </div>

            <div className="inputBox">
              <input
                required
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                value={pwd}
                type="password"
                placeholder="Password"
                disabled={loading}
              />
            </div>

            <p className="text-[gray]">
              Don&apos;t have an account?{" "}
              <Link to="/signUp" className="text-[#00AEEF]">
                Sign Up
              </Link>
            </p>

            {error && <p className="text-red-500 text-[14px] my-2">{error}</p>}

            <button className="btnBlue w-full mt-[20px]" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
        <div className="right w-[55%]">
          <img
            className="h-[100vh] w-[100%] object-cover"
            src={image}
            alt="Auth Page Side"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
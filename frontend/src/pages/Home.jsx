import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import ListCard from "../components/ListCard";
import GridCard from "../components/GridCard";
import { api_base_url } from "../helper";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [projTitle, setProjTitle] = useState("");
  const navigate = useNavigate();
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isGridLayout, setIsGridLayout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Allow Navbar to signal when logging out
  const handleLogout = () => {
    setIsLoggingOut(true);
  };

  const filteredData = data
    ? data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const createProj = (e) => {
    e.preventDefault();
    if (projTitle === "") {
      alert("Please Enter Project Title");
    } else {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not logged in");
        navigate("/login");
        return;
      }

      fetch(`${api_base_url}/projects/createProject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: projTitle,
          userId: userId,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error creating project: " + res.status);
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setIsCreateModelShow(false);
            setProjTitle("");
            alert("Project Created Successfully");
            navigate(`/editor/${data.projectId}`);
          } else {
            alert("Something Went Wrong: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Error during project creation:", error);
          alert("Failed to create project. Please try again later.");
        });
    }
  };

  const getProj = useCallback(() => {
    // Skip data fetching if logging out
    if (isLoggingOut) return;
    
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // Only log if not in logout process
      if (!isLoggingOut) {
        console.log("No userId found in localStorage");
      }
      setLoading(false);
      return;
    }

    fetch(`${api_base_url}/projects/getProjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        if (data.success) {
          setData(data.projects);
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching projects:", error);
        setError("Failed to fetch projects.");
      });
  }, [isLoggingOut]);

  useEffect(() => {
    getProj();
  }, [getProj]);

  useEffect(() => {
    // Skip data fetching if logging out
    if (isLoggingOut) return;
    
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // Only log if not in logout process
      if (!isLoggingOut) {
        console.log("No userId found in localStorage");
      }
      return;
    }

    fetch(`${api_base_url}/users/getUserDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUserData(data.user);
        } else {
          console.error("Failed to fetch user details:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [isLoggingOut]);

  return (
    <>
      <Navbar 
        isGridLayout={isGridLayout} 
        setIsGridLayout={setIsGridLayout} 
        onLogout={handleLogout}
      />
      <div className="flex items-center justify-between px-[100px] my-[40px]">
        <h2 className="text-2xl">Hi, {userData ? userData.username : ""} 👋</h2>
        <div className="flex items-center gap-1">
          <div className="inputBox !w-[350px]">
            <input
              type="text"
              placeholder="Search Here... !"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              setIsCreateModelShow(true);
            }}
            className="btnBlue rounded-[5px] mb-4 text-[20px] !p-[5px] !px-[10px]"
          >
            +
          </button>
        </div>
      </div>

      <div className="cards">
        {loading ? (
          <div className="px-[100px]">Loading projects...</div>
        ) : isGridLayout ? (
          <div className="grid px-[100px]">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <GridCard key={index} item={item} />
              ))
            ) : (
              <p>No projects found</p>
            )}
          </div>
        ) : (
          <div className="list px-[100px]">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <ListCard key={index} item={item} />
              ))
            ) : (
              <p>No projects found</p>
            )}
          </div>
        )}
      </div>

      {isCreateModelShow && (
        <div className="createModelCon fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex items-center justify-center">
          <div className="createModel w-[25vw] h-[27vh] shadow-lg shadow-black/50 bg-[#141414] rounded-[10px] p-[20px]">
            <h3 className="text-2xl">Create New Project</h3>
            <div className="inputBox !bg-[#202020] mt-4">
              <input
                onChange={(e) => {
                  setProjTitle(e.target.value);
                }}
                value={projTitle}
                type="text"
                placeholder="Project Title"
              />
            </div>
            <div className="flex items-center gap-[10px] w-full mt-2">
              <button
                onClick={createProj}
                className="btnBlue rounded-[5px] w-[49%] mb-4 !p-[5px] !px-[10px] !py-[10px]"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setIsCreateModelShow(false);
                }}
                className="btnBlue !bg-[#1A1919] rounded-[5px] mb-4 w-[49%] !p-[5px] !px-[10px] !py-[10px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
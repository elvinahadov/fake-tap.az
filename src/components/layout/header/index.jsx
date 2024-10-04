import React, { useEffect, useState } from "react";
import { SiZcool } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const isLogin = localStorage.getItem("isLogin");
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin === "true" && userEmail) {
      fetch("http://localhost:3001/users") // Adjust the URL if necessary
        .then((response) => response.json())
        .then((users) => {
          const user = users.find((user) => user.email === userEmail);
          setLoggedInUser(user);
        })
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, [isLogin, userEmail]);

  const handleLogout = () => {
    localStorage.setItem("isLogin", "false");
    localStorage.setItem("userEmail", "");
    navigate("/login");
  };

  return (
    <header className="text-gray-600 bg-red-300 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center gap-10">
        <Link to={"/"}>
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <SiZcool className="text-[48px] rounded-full bg-red-500 p-3" />
            <span className="ml-3 font-bold text-xl">Al-Win</span>
          </a>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center justify-evenly gap-6">
          <Link
            to={"/categories"}
            className="text-black font-medium text-[24px]"
          >
            Categories
          </Link>
          <Link className="text-black font-medium text-[24px]">Categories</Link>
          <Link className="text-black font-medium text-[24px]">Categories</Link>
          <Link className="text-black font-medium text-[24px]">Categories</Link>
        </nav>
        {isLogin ?  (
            <h1 className="inline-flex items-center text-white bg-red-600 border-0 py-1 px-3 rounded text-base mt-4 md:mt-0">
              {`Hi, ${loggedInUser.name}`}
            </h1>): (
          <>
            <button
              onClick={handleLogout}
              className="inline-flex items-center text-white bg-red-600 border-0 py-1 px-3 focus:outline-none hover:bg-red-400 rounded text-base mt-4 md:mt-0"
            >
              Logout
              <svg
                fill="none"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </>
        ) 
        }
      </div>
    </header>
  );
};

export default Header;

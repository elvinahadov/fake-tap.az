import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SiZcool } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ onSearch }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const isLogin = localStorage.getItem("isLogin");
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin === "true" && userEmail) {
      fetch("http://localhost:3001/users")
        .then((response) => response.json())
        .then((users) => {
          const user = users.find((user) => user.email === userEmail);
          setLoggedInUser(user || null);
        })
        .catch((error) => console.error("Error fetching users:", error));
    } else {
      setLoggedInUser(null);
    }
  }, [isLogin, userEmail]);

  const handleLogout = () => {
    localStorage.setItem("isLogin", "false");
    localStorage.setItem("userEmail", "");
    setLoggedInUser(null);
    navigate("/login");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <header className="text-gray-600 bg-red-300">
      <div className="container mx-auto flex p-5 flex-col md:flex-row items-center gap-10">
        <Link
          to={"/"}
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <SiZcool className="text-[48px] rounded-full bg-red-500 p-3" />
          <span className="ml-3 font-bold text-xl">Al-Win</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center justify-evenly gap-6">
          <Link to={"/categories"} className="text-black font-bold text-[16px]">
            Categories
          </Link>
          <Link
            to={"/createAnnouncement"}
            className="text-black font-bold text-[16px]"
          >
            Create Announcement
          </Link>
          <Link
            to={"/userAnnouncements"}
            className="text-black font-bold text-[16px]"
          >
            My Announcements
          </Link>
        </nav>
        <div className="flex items-center relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search announcements"
            className="py-2 px-6 border rounded border-gray-600 placeholder:text-gray-700"
          />
          <FaSearch className="text-[18px] absolute right-4 top-3 text-gray-500" />
        </div>
        {loggedInUser ? (
          <div className="flex items-center gap-10">
            <button
              onClick={handleLogout}
              className="inline-flex items-center text-white bg-red-600 border-0 py-1 px-3 focus:outline-none hover:bg-red-700 rounded text-base mt-4 md:mt-0"
            >
              Logout
            </button>
            <h1 className="inline-flex items-center bg-red-600 font-bold text-white border-0 py-1 px-3 rounded text-base mt-4 md:mt-0">
              {`Hi, ${loggedInUser.name}`}
            </h1>
          </div>
        ) : (
          <Link to={"/login"}>
            <button
              onClick={handleLogout}
              className="inline-flex items-center text-white bg-red-600 border-0 py-1 px-3 focus:outline-none hover:bg-red-700 rounded text-base mt-4 md:mt-0"
            >
              Log in
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

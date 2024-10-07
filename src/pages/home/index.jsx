import React from "react";
import Announcements from "../../components/home/announcements/index.jsx";

const Home = ({ searchTerm }) => {
  return (
    <div>
      <Announcements searchTerm={searchTerm} />
    </div>
  );
};

export default Home;

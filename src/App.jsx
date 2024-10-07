import "./App.css";
import Layout from "./components/layout/index.jsx";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import Categories from "./pages/categories";
import CreateAnnouncement from "./pages/createAnnouncement/index.jsx";
import UserAnnouncements from "./pages/userAnnouncements/index.jsx";
import DetailPage from "./pages/detailPage/index.jsx";
import SingleCategoryPage from "./pages/singleCategoryPage/index.jsx";
import { useState } from "react";

function App({ children }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Layout setSearchTerm={setSearchTerm}>
        <Routes>
          <Route path="/categories" element={<Categories />} />
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createAnnouncement" element={<CreateAnnouncement />} />
          <Route path="/userAnnouncements" element={<UserAnnouncements />} />
          <Route path="/detailPage/:id" element={<DetailPage />} />
          <Route path="/categoryPage/:categoryId" element={<SingleCategoryPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

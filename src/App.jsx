import "./App.css";
import Layout from "./components/layout/inde";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import Categories from "./pages/categories";

function App({children}) {
  return (
    <>
      <Layout>
        {children}
        <Routes>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

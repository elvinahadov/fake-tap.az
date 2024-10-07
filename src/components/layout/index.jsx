import React from "react";
import Header from "./header/index.jsx";
import Footer from "./footer/index.jsx";

const Layout = ({ setSearchTerm, children }) => {
  return (
    <>
      <Header onSearch={setSearchTerm} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

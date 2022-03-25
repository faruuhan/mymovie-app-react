import React from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = (props) => {
  return (
    <div className="bg-white">
      <Navbar />
      {props.children}
    </div>
  );
};

export default Layout;

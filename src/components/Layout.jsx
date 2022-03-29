import React, { useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";

import { ThemeContext } from "../utility/Context";

const Layout = (props) => {
  const theme = useContext(ThemeContext);

  const darkMode = () => {
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
    window.location.reload(false);
  };

  {
    if (theme === "light") {
      return (
        <div className="bg-white d-flex flex-column" style={{ minHeight: "100vh" }}>
          <Navbar changeTheme={() => darkMode()} modeTheme={theme === "light" ? "Off" : "On"} />
          {props.children}
          <Footer />
        </div>
      );
    } else {
      return (
        <div className="bg-dark text-light d-flex flex-column" style={{ minHeight: "100vh" }}>
          <Navbar changeTheme={() => darkMode()} modeTheme={theme === "light" ? "Off" : "On"} />
          {props.children}
          <Footer />
        </div>
      );
    }
  }
};

export default Layout;

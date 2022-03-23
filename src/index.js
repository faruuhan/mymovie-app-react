import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import NowPlaying from "./pages/NowPlaying";
import ListFav from "./pages/ListFav";

ReactDOM.render(
  <React.StrictMode>
    <NowPlaying />
  </React.StrictMode>,
  document.getElementById("root")
);

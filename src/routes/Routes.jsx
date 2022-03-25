import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NowPlaying from "../pages/NowPlaying";
import Detail from "../pages/Detail";
import ListFav from "../pages/ListFav";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NowPlaying />} />
        <Route path="/listfav" element={<ListFav />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

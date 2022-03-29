import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NowPlaying from "../pages/NowPlaying";
import Detail from "../pages/Detail";
import ListFav from "../pages/ListFav";

import { ThemeContext, AuthContext } from "../utility/Context";
import { store } from "../utility/redux/store/store";
import { Provider } from "react-redux";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={theme}>
        <AuthContext.Provider value={false}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<NowPlaying />} />
              <Route path="/listfav" element={<ListFav />} />
              <Route path="/detail/:id" element={<Detail />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;

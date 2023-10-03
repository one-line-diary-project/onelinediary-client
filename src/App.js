import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment, useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="wrap">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/new" element={<New />}></Route>
          <Route path="/diary" element={<Diary />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

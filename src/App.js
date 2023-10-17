import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const New = lazy(() => import("./pages/New"));
const Diary = lazy(() => import("./pages/Diary"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={<BeatLoader color="#d66b36" cssOverride={{}} size={10} />}
      >
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

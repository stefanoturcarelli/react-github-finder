import React from "react";
import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search.jsx";
import User from "./pages/User.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <>
      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/user" element={<User />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;

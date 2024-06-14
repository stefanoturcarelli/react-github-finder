import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Search from "./pages/Search.jsx";
import User from "./pages/User.jsx";
import NotFound from "./pages/NotFound.jsx";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <div className="container">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                key="search"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Search />
              </motion.div>
            }
          />
          <Route
            path="/user"
            element={
              <motion.div
                key="user"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <User />
              </motion.div>
            }
          />
          <Route
            path="*"
            element={
              <motion.div
                key="notfound"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <NotFound />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

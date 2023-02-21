import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import App from "../App";

const DeclareRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="employees" element={<App />} />
        <Route path="customers" element={<App />} />
        <Route path="orders" element={<App />} />
      </Route>
    </Routes>
  );
};

export default DeclareRouter;

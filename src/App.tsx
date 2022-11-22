import React from "react";
import "./App.css";
import Inventory from "./components/Pages/Inventory";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Update from "./components/Pages/Update";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Update />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

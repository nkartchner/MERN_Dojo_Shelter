import "./App.css";
import faker from "faker";
import axios from "axios";
import Image from "./components/Image";
import React, { useEffect } from "react";
import MainRouter from "./components/Layout/Routers/MainRouter";
import Navbar from "./components/Layout/Navigation/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainRouter />
    </div>
  );
}

export default App;

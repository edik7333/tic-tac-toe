import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MyNav from "../components/navigation/Nav"
import Footer from "../components/structure/Footer";
import TicTacToePage from "../pages/tic-tac-toePage";
import TicTacToe from "./games/tic-tac-toe";

const Main = () => {
  return (

    <BrowserRouter>
      <MyNav/>
      <Routes>
        <Route path="/TicTacToe" element={<TicTacToePage />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default Main;

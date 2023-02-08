import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MyNav from "../components/navigation/Nav"
import Footer from "../components/structure/Footer";
import FourInARowPage from "../pages/four-in-a-row-page";

const Main = () => {
  return (

    <BrowserRouter>
      <MyNav/>
      <Routes>
        <Route path="/4InARow" element={<FourInARowPage />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default Main;

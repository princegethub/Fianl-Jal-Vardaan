import React from "react";
import Navbar from "./Navbar";
import HeroPage from "./HeroPage";
import Archivement from "./archivement";
import About from "./About";
import BetterTomorrow from "./BetterTommorow";
import ZigZag from "./ZigZag";
import TopHeader from "./topHeader";
import Footer from "./Footer";

function Public_Layout() {
  return (
    <>
      <TopHeader />
      <Navbar/>
      <HeroPage />
      <Archivement />
      <About />
      <BetterTomorrow />
      <ZigZag />
      <Footer/>
    </>
  );
}

export default Public_Layout;

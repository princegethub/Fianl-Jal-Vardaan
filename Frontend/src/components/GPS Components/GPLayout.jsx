import React from "react";
import Navbar from "./Navbar_GPS";
import { Outlet } from "react-router";
import Footer_PHED from "../FooterLoginKeBaadWala";

function GPLayout() {
  return (
    <>
    <div className="max-h-screen">
      <Navbar />
      <Outlet />
      <Footer_PHED />
      </div>
    </>
  );
}

export default GPLayout;

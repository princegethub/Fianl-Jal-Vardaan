import React from "react";
import Navbar from "./NavbarPHED";
import { Outlet } from "react-router";
import Footer_PHED from "../FooterLoginKeBaadWala";

function PhedLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer_PHED />
    </>
  );
}

export default PhedLayout;

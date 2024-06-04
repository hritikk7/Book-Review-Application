import React from "react";
import Nav from "@/components/ui/Nav";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div
      className="flex flex-col min-h-screen "
      style={{ width: "100vw", height: "100vh" }}
    >
      <Nav />
      <Outlet />
    </div>
  );
}

export default Layout;

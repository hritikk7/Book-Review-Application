import React, { createContext, useState } from "react";
import Nav from "@/components/ui/Nav";
import { Outlet, useLocation } from "react-router-dom";

export const searchContext = createContext();
export const booksContext = createContext();
function Layout() {
  const [searchText, setSearchText] = useState("");
  const [bookData, setBookData] = useState([]);
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/";

  console.log("location", location.pathname);
  return (
    <searchContext.Provider value={{ searchText, setSearchText }}>
      <booksContext.Provider value={{ bookData, setBookData }}>
        <div
          className="flex flex-col min-h-screen "
          style={{ width: "100vw", height: "100vh" }}
        >
          {!isAuthRoute && <Nav />}
          <Outlet />
        </div>
      </booksContext.Provider>
    </searchContext.Provider>
  );
}

export default Layout;

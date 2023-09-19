import React from "react";
import Header from "./Header";
import Main from "./Main";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className=" relative flex min-h-screen flex-col ">
        {/* <Header /> */}
        <Main>
          <Outlet />
        </Main>
      </div>
    </>
  );
}

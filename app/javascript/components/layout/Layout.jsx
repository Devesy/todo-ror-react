import React from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <main className="container">
      <header>
        <h2>TODO LIST</h2>
      </header>
      <Outlet />
      <footer>Footer</footer>
    </main>
  );
};
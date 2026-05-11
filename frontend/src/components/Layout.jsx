import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout({ children }) {
  return (
    <>
      <Navbar />
       <Outlet />
    </>
  );
}

export default Layout;


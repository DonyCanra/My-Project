import Headers from "./Headers";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Headers />
      <Outlet />
      <Footer />
    </>
  );
}

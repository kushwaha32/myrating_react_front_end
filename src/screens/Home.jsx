// third party module imports

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// developer module imports
import Navigation from "../components/navigation";
import SearchArea from "../components/searchArea";
import HeaderCommon from "../components/header/HeaderCommon";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <ToastContainer />
      <HeaderCommon />

      {/* body container */}
      <main className="container m-cont">
        <section className="body-main">
          <SearchArea />
          <Navigation />
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default Home;

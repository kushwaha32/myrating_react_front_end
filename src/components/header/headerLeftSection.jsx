import "./headerLeftSection.css";
import { Link } from "react-router-dom";
import { IsTabletOrLess } from "../../utils/mediaScreens";
import { useEffect, useState } from "react";
import HeaderAuthLinks from "./headerAuthLinks";
import { useSelector } from "react-redux";

const HeaderLeftSection = () => {
  const [isAuth, setIsAuth] = useState(false);
  const { userInfo } = useSelector((state) => state?.auth);

  useEffect(() => {
    if (userInfo) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [userInfo]);

  return (
    <section className="header-left">
      <ul className="d-flex align-items-center">
        <li className="m-common">
          <Link to="/">
            {" "}
            <i className="fa fa-home color-yellow-dark"></i>
          </Link>
        </li>
        <li className="home lettersp-helf fw-bold"></li>
      </ul>
    </section>
  );
};

export default HeaderLeftSection;

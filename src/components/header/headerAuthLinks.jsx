import Button from "../button";
import { Link } from "react-router-dom";

const HeaderAuthLinks = ({ loginModelShow, toggle, children }) => {
  return (
    <section className="header-right">
      {/* user side nav on screen size < 767.98px  */}
      {children}
      <ul
        className={`d-flex align-items-center justify-content-between sm-auth ${
          toggle ? "height-none" : ""
        }`}
      >
        <li className="m-common">
          <Link
            to="/list-your-business"
            className="transparent-btn btn-business lettersp-helf"
          >
            List your business (free)
          </Link>
        </li>
        <li>|</li>
        <li className="m-common ms-0">
          <Button text="Login / Register" handleShow={loginModelShow} />
        </li>
      </ul>
    </section>
  );
};

export default HeaderAuthLinks;

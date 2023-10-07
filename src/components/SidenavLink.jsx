import { Link } from "react-router-dom";

const SidenavLink = ({ icon, text, url, active, handleUserSideNav }) => {
  return (
    <Link
      to={url}
      onClick={handleUserSideNav}
      className={`product-d-side-nav ${active ? "side-nav-active" : ""}`}
    >
      <img src={icon} alt="" />
      {/* <h5 style={text.length > 8 ? style : null}>{text}</h5> */}
      <h5>{text}</h5>
    </Link>
  );
};

const style = {
  fontSize: "8px",
};

export default SidenavLink;

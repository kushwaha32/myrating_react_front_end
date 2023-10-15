import { Link, useLocation } from "react-router-dom";

const SideBarNav = ({ title, image, cusSty, spImgSty, urlNav }) => {
  const location = useLocation()?.pathname?.split("/");

  return (
    <Link
      to={`/business/${location?.[2]}/${urlNav}`}
      className={`business-console-sidebar-a business-console-sidebar-b ${
        location?.[3] === urlNav ? "business-console-sidebar-active" : ""
      }`}
      style={cusSty && cusSty}
    >
      <span style={spImgSty && spImgSty}>
        <img src={image} alt="img1" />
      </span>
      <p>{title}</p>
    </Link>
  );
};

export default SideBarNav;

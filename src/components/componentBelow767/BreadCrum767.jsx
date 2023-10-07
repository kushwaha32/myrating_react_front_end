import arrowDown from "../../img/arror-down.png";
import { Link } from "react-router-dom";


const BreadCrum767 = ({slugUrl , url}) => {
  return (
    <div className="user-sm-breadcrum">
      <Link to={slugUrl} className="user-sm-breadcrum-a">
        {" "}
        <img src={arrowDown} alt="" />
      </Link>
      <Link to="" className="user-sm-breadcrum-b">
        Setting{" "}
      </Link>{" "}
      /{" "}
      <Link to="" className="user-sm-breadcrum-c">
       {url}
      </Link>
    </div>
  );
};

export default BreadCrum767;

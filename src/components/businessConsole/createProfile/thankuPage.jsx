import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/");
  const [isLoading, setIsLoading] = useState(false);
  const handleThankYou = () => {
    navigate(`/business/${location[2]}/listed-profile/create-profile/`);
    localStorage.removeItem("businessProductProfile");
  };
  return (
    <section className="register-b-main mb-5 para-mai-w position-relative register-b-mn-verify loca-b-main product-profile-photoVd">
      <h2 className="text-center mt-3 thnku-head">Thank you</h2>
      <p className="text-center mb-0 mt-5 thnku-para">
        Thank you Your product profile has been updated and sent to
      </p>
      <p className="text-center mb-0 thnku-para">
        our team. It take maximum 24 hours to publish
      </p>
      <p className="text-center mb-0 thnku-para">on My Ratings Platform.</p>
      <div className="btn-s-main position-absolute btn-otp-s-main">
        <button
          onClick={handleThankYou}
          to="/register/upload-profile-photo"
          className={`btn btn-white ${isLoading && "disabled"}`}
          style={{ fontSize: "14px" }}
        >
          {isLoading ? "Loading" : "Ok"}
          <PulseLoader
            color="rgb(0 40 86 / 80%)"
            loading={isLoading}
            size={6}
            cssOverride={{ width: "37px" }}
          />
        </button>
      </div>
    </section>
  );
};

export default ThankYou;

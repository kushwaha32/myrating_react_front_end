import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./CreateProfile.css";
import { useState } from "react";
import useBusinessPreviousSteps from "../../../utils/ownHooks/useBusinessPreviousSteps";

const CreateProfile = () => {
  const createProfileSteps = [
    { id: 1, name: "product-information" },
    { id: 2, name: "location-information" },
    { id: 3, name: "location-information" },
    { id: 4, name: "contact-information" },
    { id: 5, name: "other-information" },
    { id: 6, name: "profile-keyboards" },
    { id: 7, name: "upload-photos" },
  ];
  const location = useLocation()?.pathname?.split("/");
  const currLocation = location[location?.length - 1];
  const navigate = useNavigate();

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- previous step handling --------------//////////////
  ///////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep, getPreviousSteps, removeItemsFromSteps] =
    useBusinessPreviousSteps("businessProductProfile");

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- previous step handling --------------//////////////
  ///////////////////////////////////////////////////////////////////////////
  const getBackToPreviousStep = (step) => {
    const preSteps = getPreviousSteps();
    if (preSteps?.includes(step)) {
      navigate(`business/${location?.[2]}/listed-profile/${step}`);
    }
  };
  const stepActive = (el) => {
    if (
      currLocation === "create-profile" &&
      el?.name === "product-information"
    ) {
      return "step-active";
    } else {
      if (currLocation === el?.name) {
        return "step-active";
      }
      console.log(currLocation);
      return "";
    }
  };
  return (
    <section className="business-console-body business-console-listed-pro bc-create-profile">
      <h3 className="my-3 bcb-title">List your product at platform</h3>
      <div className="bc-create-profile-main">
        <aside>
          <ul>
            {createProfileSteps?.map((el) => (
              <li key={el?.id}>
                <button
                  className={`text-capitalize ${stepActive(el)}`}
                  onClick={() => getBackToPreviousStep(el?.name)}
                >
                  {el?.name.split("-").join(" ")}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <section className="bc-create-profile-form">
          <Outlet />
        </section>
      </div>
    </section>
  );
};

export default CreateProfile;

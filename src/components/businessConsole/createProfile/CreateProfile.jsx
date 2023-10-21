import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./CreateProfile.css";
import { useEffect, useState } from "react";
import useBusinessPreviousSteps from "../../../utils/ownHooks/useBusinessPreviousSteps";

const CreateProfile = () => {
  const createProfileSteps = [
    { id: 1, name: "product-information" },
    { id: 2, name: "location-information" },
    { id: 3, name: "contact-information" },
    { id: 4, name: "other-information" },
    { id: 5, name: "profile-keyboards" },
    { id: 6, name: "upload-photos" },
    { id: 7, name: "thank-you" },
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
      navigate(
        `/business/${location?.[2]}/listed-profile/${
          step !== "create-profile"
            ? `create-profile/${step}`
            : "create-profile"
        }`
      );
      removeItemsFromSteps(step);
    }
  };
  const stepActive = (el) => {
    if (
      currLocation === "create-profile" ||
      (currLocation === "" && el?.name === "product-information")
    ) {
      return "step-active";
    } else {
      if (currLocation === el?.name) {
        return "step-active";
      }

      return "";
    }
  };
  ///////////////////////////////////////////////////////////
  ////////--- navigate to the old current steps ---/////////
  /////////////////////////////////////////////////////////
  useEffect(() => {
    const steps = getPreviousSteps();
    const preObj = createProfileSteps?.filter(
      (currPro) => currPro?.name === steps[steps.length - 1]
    );
    const currObj = createProfileSteps?.filter(
      (currPro) => currPro?.id === preObj[0]?.id + 1
    );
    navigate(
      `/business/${location[2]}/listed-profile/create-profile/${
        currObj[0]?.name ? currObj[0]?.name : ""
      }`
    );
  }, []);
  return (
    <section className="business-console-body business-console-listed-pro bc-create-profile">
      <h3 className="my-3 bcb-title">List your product at platform</h3>
      <div className="bc-create-profile-main">
        <aside>
          <ul>
            {createProfileSteps?.map(
              (el) =>
                el.name !== "thank-you" && (
                  <li key={el?.id}>
                    <button
                      className={`text-capitalize ${stepActive(el)} ${
                        getPreviousSteps().includes(
                          el?.name === "product-information"
                            ? "create-profile"
                            : el?.name
                        )
                          ? "step-prev-active"
                          : ""
                      }`}
                      onClick={() =>
                        getBackToPreviousStep(
                          el?.name === "product-information"
                            ? "create-profile"
                            : el?.name
                        )
                      }
                    >
                      {el?.name.split("-").join(" ")}
                    </button>
                  </li>
                )
            )}
          </ul>
        </aside>
        <section className="bc-create-profile-form btn-pro-pro-con">
          <Outlet />
        </section>
      </div>
    </section>
  );
};

export default CreateProfile;

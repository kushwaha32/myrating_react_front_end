import { ToastContainer, toast } from "react-toastify";
import HeaderCommon from "../components/header/HeaderCommon";
import "./registerUser.css";
import "./listbusiness.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useCurrentLocationSlug from "../utils/ownHooks/useCurrentLocationSlug";
import { IsTabletOrLess } from "../utils/mediaScreens";
import { useEffect, useState } from "react";
import useBusinessPreviousSteps from "../utils/ownHooks/useBusinessPreviousSteps";

const ListYourBusiness = () => {
  const navigate = useNavigate();
  //////////////////////////////////////////////////////////////
  ////////--------------- All Steps --------------//////////////
  //////////////////////////////////////////////////////////////
  // Business/Company Information

  const [allSteps, setAllSteps] = useState([
    { id: 1, name: "list-your-business" },
    { id: 2, name: "mobile-no-e-mail-id-verification" },
    { id: 3, name: "business-company-category" },
    { id: 4, name: "location-information" },
    { id: 5, name: "contact-information" },
    { id: 6, name: "other-information" },
    { id: 7, name: "business-keywords" },
    { id: 8, name: "upload-photo-video-logo" },
    { id: 9, name: "submit-for-verification" },
  ]);

  //////////////////////////////////////////////////////////////
  ////////---- Get all the profession from db -----///////////////
  //////////////////////////////////////////////////////////////
  const getCurrentSlug = useCurrentLocationSlug();

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- get previous steps --------------///////////////
  ////////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep, getPreviousSteps, removeItemsFromSteps] =
    useBusinessPreviousSteps();

  //////////////////////////////////////////////////////////////////
  //////--------- Get back to previous form -------/////////////////
  /////////////////////////////////////////////////////////////////
  const getBack = (prev) => {
    removeItemsFromSteps(prev.split("/")[prev.split("/").length - 1]);
    navigate(prev);
  };
  useEffect(() => {
    const steps = getPreviousSteps();

    if (steps?.length > 0) {
      const preStep = allSteps?.filter(
        (step) => step?.name === steps[steps?.length - 1]
      );
      console.log(preStep);
      const currStep = allSteps?.filter(
        (step) => preStep[0]?.id + 1 == Number(step?.id)
      );
      if (preStep[0]?.name === "submit-for-verification") {
        navigate(`/list-your-business/${preStep[0]?.name}`);
      } else {
        navigate(`/list-your-business/${currStep[0]?.name}`);
      }
    }
  }, []);
  return (
    <>
      <ToastContainer />
      <HeaderCommon />
      <section className="register-user list-business container">
        <h1 className="title">
          List your Business free to keep your ratings with more control and
          privacy
        </h1>

        <div className="row">
          <div className="register-a col-lg-3 col-sm-12">
            {/*//////////////////////////////////////////////////////////////////////////*/}
            {/*////////////////----------- form step indicator for mobile and Tablet ----------////*/}
            {/*//////////////////////////////////////////////////////////////////////////*/}
            {IsTabletOrLess() ? (
              <ul className="list-business-sm-nav">
                {allSteps?.map((currStp) => (
                  <>
                    {getPreviousSteps()?.includes(currStp?.name) ? (
                      <li
                        className={`${
                          getCurrentSlug === currStp?.name ? "active" : ""
                        } ${
                          getPreviousSteps()?.includes(currStp?.name)
                            ? "previous"
                            : ""
                        }`}
                        onClick={() =>
                          getPreviousSteps()?.includes(
                            "business-company-category"
                          )
                            ? ""
                            : getBack(
                                currStp?.name === "list-your-business"
                                  ? "/list-your-business"
                                  : `/list-your-business/${currStp?.name}`
                              )
                        }
                      >
                        {currStp?.id}
                      </li>
                    ) : (
                      <li
                        className={`${
                          getCurrentSlug === currStp?.name ? "active" : ""
                        } ${
                          getPreviousSteps()?.includes(currStp?.name)
                            ? "previous"
                            : ""
                        }`}
                      >
                        {currStp?.id}
                      </li>
                    )}
                  </>
                ))}
              </ul>
            ) : (
              <>
                {/*//////////////////////////////////////////////////////////////////////////*/}
                {/*////////----------- form step indicator for desktop, laptop ----------////*/}
                {/*//////////////////////////////////////////////////////////////////////////*/}
                {allSteps.map((currStp) => (
                  <h2
                    key={currStp}
                    className={`step-notation text-capitalize ${
                      getCurrentSlug === currStp?.name &&
                      "step-notation-c-active"
                    } ${
                      getPreviousSteps()?.includes(currStp?.name) &&
                      "step-notation-p-active"
                    }`}
                  >
                    {/* step-notation-p-active */}
                    {currStp?.name === "list-your-business"
                      ? "Business/Company Information"
                      : currStp?.name?.split("-").join(" ")}
                  </h2>
                ))}
              </>
            )}
          </div>
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default ListYourBusiness;

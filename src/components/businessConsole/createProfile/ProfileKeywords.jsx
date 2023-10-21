import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import productProfileKeywordValidationSchema from "../../../schemaValidation/productProfileKeywordValidationSchema";
import useBusinessPreviousSteps from "../../../utils/ownHooks/useBusinessPreviousSteps";
import { useLocation, useNavigate } from "react-router-dom";

const initialValues = {
  keywords: "",
};
const ProfileKeywords = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/");

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- previous step handling --------------//////////////
  ///////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep, getPreviousSteps, removeItemsFromSteps] =
    useBusinessPreviousSteps("businessProductProfile");

  const {
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues,
    validationSchema: productProfileKeywordValidationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      localStorage.setItem("proProfileKeywords", JSON.stringify(values));
      handlePreviousStep("profile-keyboards");
      setIsLoading(false);
      navigate(
        `/business/${location[2]}/listed-profile/create-profile/upload-photos`
      );
    },
  });

  /////////////////////////////////////////////////////////////////////////////
  ///////////--------- Fill the previous profile keyword --------/////////////
  ///////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    let preKeyword = localStorage.getItem("proProfileKeywords")
      ? JSON.parse(localStorage.getItem("proProfileKeywords"))
      : "";
    setFieldValue("keywords", preKeyword?.keywords || "");
  }, []);

  //////////////////////////////////////////////////////////////////////
  /////////////////////----- Handle do it latter -----/////////////////
  ////////////////////////////////////////////////////////////////////
  const handleDoItLatter = () => {
    handlePreviousStep("profile-keyboards");
    navigate(
      `/business/${location[2]}/listed-profile/create-profile/upload-photos`
    );
  };
  return (
    <section className="register-b-main mb-5 para-mai-w position-relative register-b-mn-verify loca-b-main">
      <form className="was-validated " onSubmit={handleSubmit}>
        <div className="form-group">
          {/* ////////////////////////////////////////////////////////////// */}
          {/*/////////////////---------- Description -------//////////////// */}
          {/* ////////////////////////////////////////////////////////////// */}
          <div className="row">
            <div className="col-lg-12">
              <label>Type Keyboards for your business search.</label>
              <div>
                <textarea
                  className="form-control mt-2"
                  name="keywords"
                  value={values.keywords}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ height: "156px", width: "100%" }}
                  required
                ></textarea>
                <p style={{ fontSize: "13px" }} className="mt-1">
                  Note : Limit 10 words 200 Character{" "}
                </p>
              </div>
              <div className="invalid-feedback">
                {errors?.keywords || (touched?.keywords && errors?.keywords)}
              </div>
            </div>
          </div>
        </div>
        <div className="btn-s-main position-absolute btn-otp-s-main">
          <button
            type="submit"
            to="/register/upload-profile-photo"
            className={`btn btn-white ${isLoading && "disabled"}`}
          >
            {isLoading ? "Loading" : "Save & Continue"}
            <PulseLoader
              color="rgb(0 40 86 / 80%)"
              loading={isLoading}
              size={6}
              cssOverride={{ width: "37px" }}
            />
          </button>
          <button type="button" style={doitBtn} onClick={handleDoItLatter}>
            Do it latter
          </button>
        </div>
      </form>
    </section>
  );
};
const doitBtn = {
  border: "transparent",
  background: "transparent",
  fontSize: "15px",
  fontFamily: "inherit",
  position: "relative",
  left: "43%",
};
export default ProfileKeywords;

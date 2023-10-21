import { useFormik } from "formik";
import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import navigatePre from "../../img/navigate-pre.png";
import useBusinessPreviousSteps from "../../utils/ownHooks/useBusinessPreviousSteps";
import { useNavigate } from "react-router-dom";
import locationInformationSchema from "../../schemaValidation/locationInformationSchema";
import useCoordinates from "../../utils/ownHooks/useCoordinates";
import { useUpdateBrandLocationMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import { IsTabletOrLess } from "../../utils/mediaScreens";

const initialValues = {
  companyName: "",
  adminName: "",
  building: "",
  street: "",
  landmark: "",
  area: "",
  country: "",
  state: "",
  city: "",
  pinCode: "",
};
const LocationInformation = () => {
  const [isLoading, setIsLoading] = useState("");
  const navigate = useNavigate();

  /////////////////////////////////////////////////////////////////////////////
  ////////------------- geo location coordinates hook --------------///////////
  ////////////////////////////////////////////////////////////////////////////
  const handleGetCoordinates = useCoordinates();

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- previous step handling --------------///////////////
  ////////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep, getPreviousSteps, removeItemsFromSteps] =
    useBusinessPreviousSteps();

  const [updateLocationInfo] = useUpdateBrandLocationMutation();

  const {
    values,
    errors,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: locationInformationSchema,
    onSubmit: async (value) => {
      try {
        setIsLoading(true);
        // set the coordinates into the val object
        const [lat, lng] = await handleGetCoordinates(
          value.city,
          value.state,
          value.country,
          value.pinCode
        );
        const data = {
          building: value.building,
          street: value.street,
          landmark: value.landmark,
          area: value.area,
          country: value.country,
          state: value.state,
          city: value.city,
          pinCode: value.pinCode,
          lng,
          lat,
        };

        const res = await updateLocationInfo(data).unwrap();
        if (res.status === "success") {
          toast.success("Location information updated successfully!");
          handlePreviousStep("location-information");
          navigate("/list-your-business/contact-information");
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    },
  });
  ///////////////////////////////////////////////////////////////////////////////////
  //////--------- Set the company name and admin name as component load-------///////
  //////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const getField = localStorage.getItem("businessInfo")
      ? JSON.parse(localStorage.getItem("businessInfo"))
      : [];
    setFieldValue("companyName", getField ? getField?.companyName : "");
    setFieldValue(
      "adminName",
      getField?.title ? `${getField?.title} ${getField?.fullName}` : ""
    );
  }, []);

  //////////////////////////////////////////////////////////////////
  //////--------- Get back to previous form -------/////////////////
  /////////////////////////////////////////////////////////////////
  const getBack = () => {
    removeItemsFromSteps("business-company-category");
    navigate("/list-your-business/business-company-category");
  };
  return (
    <div className="register-b col-lg-9 col-sm-12 mobile-verify position-relative">
      {!IsTabletOrLess() ? (
        <h1 className="title position-absolute list-business-navigate">
          <button onClick={getBack} className="transparent-btn">
            <img
              src={navigatePre}
              alt="navigate"
              loading="lazy"
              className="navigate-img"
            />
          </button>
        </h1>
      ) : (
        ""
      )}

      {/*/////////////------from field  .error-active -> for active error class ---////// 
     //////////////----------- .valid-active-g -> for valid input -----/////////////////
      */}

      <section className="register-b-main register-b-mn-verify loca-b-main business-b-main mb-5 position-relative">
        <form className="was-validated " onSubmit={handleSubmit}>
          <div className="form-group">
            {/* ////////////////////////////////////////////////////////////// */}
            {/*////////-------- Business / Company Name --------////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-4 align-items-center">
              <div className="col-lg-3">
                <label className="bus-label-sm" htmlFor="cName">
                  Business / Company Name
                </label>
              </div>
              <div className="col-lg-9">
                <input
                  type="text"
                  className={`form-control ${
                    errors.companyName && touched.companyName && "error-active"
                  }`}
                  placeholder="Company Name *"
                  name="companyName"
                  value={values.companyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.companyName && touched.companyName && (
                  <div className="invalid-feedback">
                    Please provide your Company Name.
                  </div>
                )}
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*////////////-------- Profile Admin Name --------/////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-3 align-items-center mail-bus-sm-l">
              <div className="col-lg-3">
                <label className="bus-label-sm" htmlFor="adminName">
                  Profile Admin Name
                </label>
              </div>
              <div className="col-lg-9">
                <input
                  type="text"
                  className={`form-control ${
                    errors.adminName && touched.adminName && "error-active"
                  }`}
                  id="adminName"
                  placeholder="Admin Name *"
                  name="adminName"
                  value={values.adminName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.adminName && touched.adminName && (
                  <div className="invalid-feedback">
                    Please provide your Company Name.
                  </div>
                )}
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*////////////-------------- Building ------------/////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-3 align-items-center mail-bus-sm-l">
              <div className="col-lg-3">
                <label className="bus-label-sm" htmlFor="building">
                  Building
                </label>
              </div>
              <div className="col-lg-9">
                <input
                  type="text"
                  className={`form-control ${
                    errors.building && touched.building && "error-active"
                  }`}
                  id="building"
                  placeholder="Building"
                  name="building"
                  value={values.building}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.building && touched.building && (
                  <div className="invalid-feedback">
                    Please provide your Company Name.
                  </div>
                )}
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*////////////-------------- Street ------------/////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-3 align-items-center mail-bus-sm-l">
              <div className="col-lg-3">
                <label className="bus-label-sm" htmlFor="street">
                  Street
                </label>
              </div>
              <div className="col-lg-9">
                <input
                  type="text"
                  className={`form-control ${
                    errors.street && touched.street && "error-active"
                  }`}
                  id="street"
                  placeholder="Street"
                  name="street"
                  value={values.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.street && touched.street && (
                  <div className="invalid-feedback">
                    Please provide your Company Name.
                  </div>
                )}
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*////////////-------------- Landmark ------------/////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-3 align-items-center mail-bus-sm-l">
              <div className="col-lg-3">
                <label className="bus-label-sm" htmlFor="landmark">
                  Landmark
                </label>
              </div>
              <div className="col-lg-9">
                <input
                  type="text"
                  className={`form-control ${
                    errors.landmark && touched.landmark && "error-active"
                  }`}
                  id="landmark"
                  placeholder="Landmark"
                  name="landmark"
                  value={values.landmark}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.landmark && touched.landmark && (
                  <div className="invalid-feedback">
                    Please provide your Company Name.
                  </div>
                )}
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*////////////-------------- Area ------------/////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-3 align-items-center mail-bus-sm-l">
              <div className="col-lg-3">
                <label className="bus-label-sm" htmlFor="area">
                  Area
                </label>
              </div>
              <div className="col-lg-9">
                <input
                  type="text"
                  className={`form-control ${
                    errors.area && touched.area && "error-active"
                  }`}
                  id="area"
                  placeholder="Area"
                  name="area"
                  value={values.area}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.area && touched.area && (
                  <div className="invalid-feedback">
                    Please provide your Company Name.
                  </div>
                )}
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*////////////-------------- Country ------------/////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-3 align-items-center mail-bus-sm-l">
              <div className="col-lg-3">
                <label className="bus-label-sm" htmlFor="country">
                  Country
                </label>
              </div>
              <div className="col-lg-9">
                <input
                  type="text"
                  className={`form-control ${
                    errors.country && touched.country && "error-active"
                  }`}
                  id="country"
                  placeholder="Country"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.country && touched.country && (
                  <div className="invalid-feedback">
                    Please provide your Company Name.
                  </div>
                )}
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*////////////-------------- State ------------/////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-3 align-items-center mail-bus-sm-l">
              <div className="col-lg-3">
                <label className="bus-label-sm" htmlFor="state">
                  State
                </label>
              </div>
              <div className="col-lg-9">
                <input
                  type="text"
                  className={`form-control ${
                    errors.state && touched.state && "error-active"
                  }`}
                  id="state"
                  placeholder="State"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.state && touched.state && (
                  <div className="invalid-feedback">
                    Please provide your Company Name.
                  </div>
                )}
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*//////////---------- City and pincode ------------///////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-3  align-items-center mail-bus-sm-l">
              <div className="col-lg-3">
                <label className="bus-label-sm" htmlFor="city">
                  City
                </label>
              </div>
              <div className="col-lg-9">
                <div className="row mail-bus-sm-l">
                  {/* city */}
                  <div className="col-lg-4">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.city && touched.city && "error-active"
                      }`}
                      id="city"
                      placeholder="City"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.city && touched.city && (
                      <div className="invalid-feedback">
                        Please provide your Company Name.
                      </div>
                    )}
                  </div>

                  {/* pin code */}
                  <div className="col-lg-8">
                    <div className="row align-items-center mail-bus-sm-l">
                      <div className="col-lg-3 text-center t-l-sm">
                        {" "}
                        <label className="bus-label-sm" htmlFor="pinCode">
                          Pin Code
                        </label>
                      </div>
                      <div className="col-lg-9">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.pinCode && touched.pinCode && "error-active"
                          }`}
                          id="pinCode"
                          placeholder="City"
                          name="pinCode"
                          value={values.pinCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.pinCode && touched.pinCode && (
                          <div className="invalid-feedback">
                            Please provide your Company Name.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
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
          </div>
        </form>
      </section>
    </div>
  );
};

export default LocationInformation;

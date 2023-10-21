import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { PulseLoader } from "react-spinners";
import { useGetBrandIndustryQuery } from "../../../slices/brandIndustryApiSlice";
import useBusinessPreviousSteps from "../../../utils/ownHooks/useBusinessPreviousSteps";
import { productInformationSchema } from "../../../schemaValidation/createProductValidation";
import { useLocation, useNavigate } from "react-router-dom";

const initialValues = {
  productName: "",
  productCategory: "",
  productCategoryId: "",
};

const ProductInformation = () => {
  const [loading, setLoading] = useState(false);
  const brandIndustry = useGetBrandIndustryQuery();
  const location = useLocation()?.pathname?.split("/");
  const navigate = useNavigate();

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- previous step handling --------------//////////////
  ///////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep, getPreviousSteps, removeItemsFromSteps] =
    useBusinessPreviousSteps("businessProductProfile");

  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    errors,
    touched,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: productInformationSchema,
    onSubmit: (values) => {
      setLoading(true);
      handlePreviousStep("create-profile");
      localStorage.setItem(
        "newProductInfo",
        JSON.stringify({
          productName: values.productName,
          productCategory: values.productCategory,
          productCategoryId: values.productCategoryId,
        })
      );
      navigate(
        `/business/${location[2]}/listed-profile/create-profile/location-information`
      );
      setLoading(false);
    },
  });

  //////////////////////////////////////////////////////////////
  ////////////////---- Set Come back value ----////////////////
  ////////////////////////////////////////////////////////////
  const setBackvalue = () => {
    const preVal = localStorage.getItem("newProductInfo")
      ? JSON.parse(localStorage.getItem("newProductInfo"))
      : "";
    if (preVal) {
      setFieldValue("productName", preVal?.productName);
      setFieldValue("productCategory", preVal?.productCategory);
      setFieldValue("productCategoryId", preVal?.productCategoryId);
    }
  };
  useEffect(() => {
    setBackvalue();
  }, []);
  return (
    <section className="register-b-main mb-5 para-mai-w position-relative register-b-mn-verify loca-b-main">
      <form className="was-validated" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="row bc-cprofile-form">
            {/* ///////////////////////////////////////////////////////////// */}
            {/*/////////////////----- Product name -----//////////////////////*/}
            {/*///////////////////////////////////////////////////////////////*/}
            <div className="col-lg-12 col-sm-12">
              <label htmlFor="cName" className="register-label">
                Enter your product name *
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.productName && touched.productName && "error-active"
                }`}
                placeholder="Product Name *"
                name="productName"
                value={values.productName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.productName && touched.productName && (
                <div className="invalid-feedback">
                  Please provide your product name.
                </div>
              )}
            </div>
          </div>

          <div className="row bc-cprofile-form mt-4 ">
            {/* ///////////////////////////////////////////////////////////// */}
            {/*/////////////////----- Category of product -----///////////////*/}
            {/*///////////////////////////////////////////////////////////////*/}
            <div className="col-lg-12 col-sm-12">
              <label htmlFor="cName" className="register-label">
                Category of product *
              </label>
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  className="drop-id-veri drop-id-business"
                  id="dropdown-basic"
                >
                  {values.productCategory
                    ? values.productCategory
                    : "Select Industry"}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: "100%" }}>
                  {brandIndustry?.data?.data?.industry.map((curEl) => (
                    <Dropdown.Item
                      key={curEl?._id}
                      as="div"
                      className="text-capitalize"
                      onClick={() => {
                        setFieldValue("productCategory", curEl?.name);
                        setFieldValue("productCategoryId", curEl?._id);
                      }}
                    >
                      {curEl?.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
                {errors?.productCategory &&
                  touched?.productCategory &&
                  !values.productCategory && (
                    <div className="invalid-feedback">
                      Please select product category
                    </div>
                  )}
              </Dropdown>
            </div>
          </div>
        </div>
        {/* /////////////////////////////////////////////////////////// */}
        {/* ///////--------  form submit button  ------------////////// */}
        {/* /////////////////////////////////////////////////////////// */}
        <div className="row mt-4">
          <div className="col btn-s-main tacsm">
            <button
              type="submit"
              className={`btn btn-white ${
                loading && "disabled"
              } bc-pro-sub-btn`}
            >
              {loading ? "Loading" : "Save & Continue"}
              <PulseLoader
                color="rgb(0 40 86 / 80%)"
                loading={loading}
                size={6}
              />
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ProductInformation;

import { useFormik } from "formik";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { PulseLoader } from "react-spinners";
import { useGetBrandIndustryQuery } from "../../../slices/brandIndustryApiSlice";
import useBusinessPreviousSteps from "../../../utils/ownHooks/useBusinessPreviousSteps";
import { productInformationSchema } from "../../../schemaValidation/createProductValidation";

const initialValues = {
  productName: "",
  productCategory: "",
};

const ProductInformation = () => {
  const [loading, setLoading] = useState(false);
  const brandIndustry = useGetBrandIndustryQuery();

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- previous step handling --------------//////////////
  ///////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep, getPreviousSteps, removeItemsFromSteps] =
    useBusinessPreviousSteps("businessProductProfile");

  const { values, setFieldValue, errors } = useFormik({
    initialValues,
    validationSchema: productInformationSchema,
    onSubmit: () => {},
  });
  return (
    <section className="register-b-main mb-5 para-mai-w position-relative register-b-mn-verify loca-b-main">
      <form className="was-validated">
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
                // className={`form-control ${
                //   errors.companyName && touched.companyName && "error-active"
                // }`}
                className="form-control"
                placeholder="Product Name *"
                name="companyName"
                // value={values.companyName}
                // onChange={handleChange}
                // onBlur={handleBlur}
                required
              />
              {/* {errors.companyName && touched.companyName && (
                <div className="invalid-feedback">
                  Please provide your Company Name.
                </div>
              )} */}
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
                  {values.businessCategory
                    ? values.businessCategory
                    : "Select Industry"}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: "100%" }}>
                  {brandIndustry?.data?.data?.industry.map((curEl) => (
                    <Dropdown.Item
                      key={curEl?._id}
                      as="div"
                      className="text-capitalize"
                      onClick={() => {
                        setFieldValue("businessCategory", curEl?.name);
                        setFieldValue("businessCategoryId", curEl?._id);
                      }}
                    >
                      {curEl?.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
                {errors?.businessCategory && (
                  <div className="invalid-feedback">
                    {errors?.businessCategory}
                  </div>
                )}
              </Dropdown>
              {/* {errors.companyName && touched.companyName && (
                <div className="invalid-feedback">
                  Please provide your Company Name.
                </div>
              )} */}
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

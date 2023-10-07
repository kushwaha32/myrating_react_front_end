import { useFormik } from "formik";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import PulseLoader from "react-spinners/PulseLoader";
import documentIdValidationSchema from "../../schemaValidation/DocumentIdvalidationSchema";
import businessCompanyCategorySchema from "../../schemaValidation/businessCompanyCategorySchema";
import useBusinessPreviousSteps from "../../utils/ownHooks/useBusinessPreviousSteps";
import { useNavigate } from "react-router-dom";
import { useGetBrandIndustryQuery } from "../../slices/brandIndustryApiSlice";
import { useUpdateBrandIndustryMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";

const initialValues = {
  businessCategory: "",
  businessCategoryId: "",
};
const BusinessCompanyCategory = () => {
  const [isLoading, setIsLoading] = useState("");
  const navigate = useNavigate();
  const brandIndustry = useGetBrandIndustryQuery();

  /////////////////////////////////////////////////////////////////////////////
  ///////------------- Update brand industry mutation -------------///////////
  ///////////////////////////////////////////////////////////////////////////
  const [updateBrandIndustry] = useUpdateBrandIndustryMutation();

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- previous step handling --------------//////////////
  ///////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep, getPreviousSteps, removeItemsFromSteps] =
    useBusinessPreviousSteps();

  const {
    values,
    errors,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: businessCompanyCategorySchema,
    onSubmit: async (value) => {
      try {
        setIsLoading(true);
        const industry = value.businessCategoryId;
        const res = await updateBrandIndustry({ industry }).unwrap();
        if (res.status === "success") {
          toast.success("Industry created successfully!");
          handlePreviousStep("business-company-category");
          navigate("/list-your-business/location-information");
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    },
  });
  return (
    <div className="register-b col-lg-9 col-sm-12 mobile-verify position-relative">
      {/*/////////////------from field  .error-active -> for active error class ---////// 
     //////////////----------- .valid-active-g -> for valid input -----/////////////////
      */}

      <section className="register-b-main register-b-mn-verify business-b-main mb-5 position-relative">
        <p>Which Industry does your business/company belongs? *</p>
        <form className="was-validated " onSubmit={handleSubmit}>
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
              <div className="invalid-feedback">{errors?.businessCategory}</div>
            )}
          </Dropdown>
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

export default BusinessCompanyCategory;

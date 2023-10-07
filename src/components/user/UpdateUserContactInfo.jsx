import Modal from "react-bootstrap/Modal";
import ImgWithSideCaption from "../ImgWithSideCaption";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateBrandContactInfoMutation, useUpdateBrandProfileMutation } from "../../slices/usersApiSlice";
import { updateCredentials } from "../../slices/authSlice";

const initialValues = {
  contactNumber: "",
  email: "",
};

const UpdateUserContactInfo = ({ handalModalClose, modalShow }) => {
  

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [updateBrandContactInfo, { isLoading }] = useUpdateBrandContactInfoMutation();

  useEffect(() => {
    setFieldValue("contactNumber", userInfo?.user?.contactNumber);
    setFieldValue("email", String(userInfo?.user?.email).includes("testmyrating") ? "" : userInfo?.user?.email);
    setFieldValue("id", userInfo?.user?._id);
   
  }, []);

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues,
    // validationSchema: createProductSchema,
    onSubmit: async (value) => {
      try {
       
        const res = await updateBrandContactInfo(value).unwrap();
        
        if (res.status === "success") {
          // set the product into localstorage

          dispatch(updateCredentials({user: {...res.data.user}, token: userInfo?.token}));
          toast.success("Contact info updated successfully!");
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error(errors.message);
      }
    },
  });

  

  return (
    <Modal
      show={modalShow}
      onHide={handalModalClose}
      className="edit-profile-modal"
    >
      <h2 className="product-profile-h">
        Update Contact Information <span onClick={handalModalClose}>X</span>
      </h2>
      <form onSubmit={handleSubmit} className="product-profile-a">
        <section className="product-profile-ab business">
          <ImgWithSideCaption
            img={userInfo?.user?.brandProfile?.brandImage || "man.png"}
            title={userInfo?.user?.brandProfile?.brandName}
          />
        </section>
        <section className="product-profile-ac">
          {/* Contact Number */}
          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              className={`form-control ${
                errors.contactNumber && touched.contactNumber
                  ? "is-invalid"
                  : ""
              }`}
              id="contactNumber"
              value={values.contactNumber}
              placeholder="Contact Number"
              name="contactNumber"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {/* error handling of contact number */}
          {errors.contactNumber && touched.contactNumber ? (
            <div className="field-eror">{errors.contactNumber}</div>
          ) : null}

          {/* email id */}
          <div className="form-group mt-4">
            <label htmlFor="email">Email Id</label>
            <input
              type="email"
              className={`form-control ${
                errors.email && touched.email
                  ? "is-invalid"
                  : ""
              }`}
              id="email"
              value={values.email}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {/* error handling of contact number */}
          {errors.email && touched.email ? (
            <div className="field-eror">{errors.email}</div>
          ) : null}
        
          <div className="mt-3 text-center">
            <button
              className={`btn btn-form ${isLoading && "disabled"}`}
              type="submit"
              style={buttonStyle}
            >
              {isLoading ? "...loading" : "Submit"}
            </button>
          </div>
        </section>
      </form>
    </Modal>
  );
};

const buttonStyle = {
  fontSize: "17px",
  borderRadius: "10px",
  width: "270px",
  padding: "8px 0",
  fontWeight: "bold",
};

export default UpdateUserContactInfo;

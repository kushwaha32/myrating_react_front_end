import Modal from "react-bootstrap/Modal";
import ImgWithSideCaption from "../ImgWithSideCaption";
import manImg from "../../img/business-profile.png";
import noImage from "../../img/img.png";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateBrandProfileMutation } from "../../slices/usersApiSlice";
import { updateCredentials } from "../../slices/authSlice";
import { useGetRegisteredAsQuery } from "../../slices/brandRegisteredAsApiSlice";
import { useGetBrandIndustryQuery } from "../../slices/brandIndustryApiSlice";
import GoogleAutoComplete from "../googleLocationAutoComplete";
import { useGetS3SecureUrlMutation } from "../../slices/s3bucketApiSlice";
import axios from "axios";

const initialValues = {
  brandName: "",
  registeredAs: "",
  googleLocation: "",
  industry: "",
  image: "",
};

const UpdatePersonalInfo = ({ handalModalClose, modalShow }) => {
  const [profileImg, setProfileImg] = useState();
  const [loading, setLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [updateBrandProfile, { isLoading }] = useUpdateBrandProfileMutation();
  // get secure url s3 bucket mutation
  const [getSecureUrl, { isLoading: secureUrlLoading }] =
    useGetS3SecureUrlMutation();

  // get the brand registered
  const {
    data: registeredAsData,
    isLoading: registeredAsLoading,
    isError,
  } = useGetRegisteredAsQuery();

  // get the industry
  const {
    data: industry,
    isLoading: industryLoading,
    isError: industryError,
  } = useGetBrandIndustryQuery();

  useEffect(() => {
    setFieldValue("brandName", userInfo?.user?.brandProfile?.brandName);
    setFieldValue(
      "registeredAs",
      userInfo?.user?.brandProfile?.registeredAs?._id
    );
    setFieldValue(
      "googleLocation",
      JSON.stringify(userInfo?.user?.brandProfile?.location)
    );
    setFieldValue("industry", userInfo?.user?.brandProfile?.industry?._id);
    setProfileImg(userInfo?.user?.brandProfile?.brandImg);
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
        setLoading(true)
        const data = {
          brandName: value.brandName,
          registeredAs: value.registeredAs,
          location: value.googleLocation,
          industry: value.industry,
          image: value.image,
          id: userInfo?.user._id,
        };

        const resUrl = await getSecureUrl().unwrap();
        if (resUrl.status === "success") {
          const secureUrl = resUrl.uploadUrl;

          // make request to store img to the s3bucket
          await axios(secureUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            data: value.image, // Use the "data" key to send the request body
          });

          const imgUrl = secureUrl.split("?")[0];

          data.image = imgUrl;

          const res = await updateBrandProfile(data).unwrap();

          if (res.status === "success") {
            //  set the product into localstorage
            dispatch(
              updateCredentials({
                user: { ...res.data.user },
                token: userInfo?.token,
              })
            );
            toast.success(res.message);
            setLoading(false)
          } else {
            toast.error(res.message);
            setLoading(false)
          }
        }
      } catch (error) {
        toast.error(errors.message);
        setLoading(false)
      }

    },
  });

  //   handle profile background image
  const handleImage = (e) => {
    setFieldValue("image", e.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      setProfileImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  //  profile background image
  const profileBgImg = (img) => {
    return {
      backgroundImage: `url(${img ? img : noImage})`,
    };
  };
  const handleLocationSelect = (geoLocation) => {
    // Use the selected location in your parent component logic
    setFieldValue("googleLocation", JSON.stringify(geoLocation));
  };
  return (
    <Modal
      show={modalShow}
      onHide={handalModalClose}
      className="edit-profile-modal"
    >
      <h2 className="product-profile-h">
        Update Personal Information <span onClick={handalModalClose}>X</span>
      </h2>
      <form onSubmit={handleSubmit} className="product-profile-a">
        <section className="product-profile-ab business">
          <ImgWithSideCaption
            img={userInfo?.user?.brandProfile?.brandImage || manImg}
            title={userInfo?.user?.brandProfile?.brandName}
          />
          <div
            className="product-profile-ab-a"
            style={profileBgImg(profileImg)}
          ></div>
          {/* error handling of image */}
          {errors.image && touched.image ? (
            <div className="field-eror">{errors.image}</div>
          ) : null}

          <figure className="product-profile-ab-b text-center">
            <span className="addProfile product-profile-ab-ba">
              <input type="file" name="image" onChange={handleImage} />
              Update Photo
            </span>
          </figure>
        </section>
        <section className="product-profile-ac">
          {/* brand name */}
          <div className="form-group">
            <label htmlFor="brandName">Brand Name</label>
            <input
              type="text"
              className={`form-control ${
                errors.brandName && touched.brandName ? "is-invalid" : ""
              }`}
              id="brandName"
              value={values.brandName}
              placeholder="Brand Name"
              name="brandName"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {/* error handling of image */}
          {errors.brandName && touched.brandName ? (
            <div className="field-eror">{errors.brandName}</div>
          ) : null}

          {/* registered as */}
          {/* registered as */}
          <div className="form-group mt-4">
            <label htmlFor="registeredAs" className="profile-field-label">
              Registered as <span>*</span>
            </label>
            <select
              aria-label="Default select example"
              name="registeredAs"
              className={`form-select select-profession ${
                errors.registeredAs && touched.registeredAs ? "is-invalid" : ""
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.registeredAs} // Set value on the select element
            >
              <option value="">Select Registered as</option>

              {registeredAsLoading ? (
                <option>loading...</option>
              ) : (
                <>
                  {registeredAsData?.data?.registeredAs?.map((currEl) => (
                    <option value={currEl._id} key={currEl._id}>
                      {currEl.name}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          {errors.registeredAs && touched.registeredAs ? (
            <div className="field-eror">{errors.registeredAs}</div>
          ) : null}

          {/* Industry */}
          <div className="form-group mt-2">
            <label htmlFor="industry" className="profile-field-label">
              Industry <span>*</span>
            </label>
            <select
              aria-label="Default select example"
              name="industry"
              className={`form-select select-profession ${
                errors.industry && touched.industry ? "is-invalid" : ""
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.industry} // Set value on the select element
            >
              <option value="">Select Your Industry</option>
              {industryLoading ? (
                <option>loading...</option>
              ) : (
                industry?.data?.industry?.map((currEl) => (
                  <option
                    value={currEl?._id}
                    key={currEl?._id}
                    className="text-capitalize"
                  >
                    {currEl?.name}
                  </option>
                ))
              )}
            </select>
          </div>
          {errors.industry && touched.industry ? (
            <div class="field-eror">{errors.industry}</div>
          ) : null}

          {/* Business current location */}
          <GoogleAutoComplete
            handleLocationSelect={handleLocationSelect}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
          />

          <div className="mt-3 text-center">
            <button
              className={`btn btn-form ${loading && "disabled"}`}
              type="submit"
              style={buttonStyle}
            >
              {loading ? "...loading" : "Submit"}
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

export default UpdatePersonalInfo;

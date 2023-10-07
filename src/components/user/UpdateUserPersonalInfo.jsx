import Modal from "react-bootstrap/Modal";
import ImgWithSideCaption from "../ImgWithSideCaption";
import noImage from "../../img/img.png";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserProfileInfoMutation } from "../../slices/usersApiSlice";
import { updateCredentials } from "../../slices/authSlice";
import { useGetUserProffessionQuery } from "../../slices/userProffessionApiSlice";
import { userProfileUpdateValidationSchema } from "../../schemaValidation/userProfileUpdateValidation";
import GoogleAutoComplete from "../googleLocationAutoComplete";
import axios from "axios";
import { useGetS3SecureUrlMutation } from "../../slices/s3bucketApiSlice";

const initialValues = {
  name: "",
  proffession: "",
  googleLocation: "",
  dateOfBirth: "",
  gender: "",
  image: "",
};

const UpdateUserPersonalInfo = ({ handalModalClose, modalShow }) => {
  const [profileImg, setProfileImg] = useState();
  const [notImg, setNotImg] = useState();
  const [loading, setLoading] = useState(false);
  // geting the user proffession category
  const {
    data: proffessionCat,
    isLoading: professionLoading,
    isError,
  } = useGetUserProffessionQuery();
  const proffessionData = proffessionCat?.data?.data;
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileInfoMutation();
   // get secure url s3 bucket mutation
   const [getSecureUrl, { isLoading: secureUrlLoading }] =
   useGetS3SecureUrlMutation();

  useEffect(() => {
    setFieldValue("name", userInfo?.user?.userProfile?.name);
    setFieldValue("proffession", userInfo?.user?.proffession?._id);
    setFieldValue(
      "googleLocation",
      JSON.stringify(userInfo?.user?.userProfile?.location)
    );
    setFieldValue("dateOfBirth", userInfo?.user?.userProfile?.dob);
    setFieldValue("gender", userInfo?.user?.userProfile?.gender);
    setProfileImg(
      `${userInfo?.user?.userProfile?.userImg}`
    );
    setNotImg(
      userInfo?.user?.userProfile?.userImg
        ? userInfo?.user?.userProfile?.userImg
        : noImage
    );
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
    validationSchema: userProfileUpdateValidationSchema,
    onSubmit: async (value) => {
      try {
          // setup  data fields
          setLoading(true)
        const data= {
          name: value.name,
          proffession: value.proffession,
          location: value.googleLocation,
          dateOfBirth: value.dateOfBirth,
          gender: value.gender,
          id: userInfo?.user._id
        }
      
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
          const res = await updateUserProfile(data).unwrap();

          if (res.status === "success") {
            //  set the product into localstorage
            dispatch(
              updateCredentials({
                user: { ...res.data.user },
                token: userInfo?.token,
              })
            );
            toast.success(res.message);
            handalModalClose();
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
      backgroundImage: `url(${img ? img : notImg})`,
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
            img={userInfo?.user?.userProfile?.userImg || "man.png"}
            title={userInfo?.user?.userProfile?.name}
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
            <label htmlFor="name"> Name</label>
            <input
              type="text"
              className={`form-control ${
                errors.name && touched.name ? "is-invalid" : ""
              }`}
              id="name"
              value={values.name}
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {/* error handling of image */}
          {errors.name && touched.name ? (
            <div className="field-eror">{errors.name}</div>
          ) : null}

          {/* profession */}
          <div className="form-group mt-4">
            <label htmlFor="registeredAs" className="profile-field-label">
              Choose your proffession
            </label>
            <select
              aria-label="Default select example"
              name="proffession"
              className={`form-select select-profession ${
                errors.proffession && touched.proffession ? "is-invalid" : ""
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.proffession} // Set value on the select element
            >
              <option value="">Open this select menu</option>
              {professionLoading ? (
                <option>...Loading</option>
              ) : isError ? (
                "Error"
              ) : (
                <>
                  {proffessionData?.map((el) => (
                    <option value={el._id} key={`${el._id}-${el.proffession}`}>
                      {el.proffession}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          {errors.proffession && touched.proffession ? (
            <div className="field-eror">{errors.proffession}</div>
          ) : null}

          {/* Business current location */}
          <GoogleAutoComplete
            handleLocationSelect={handleLocationSelect}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
          />

          {/*  dob */}

          <div className="form-group loc-profile mt-4">
            <label htmlFor="dateOfBirth" className="label-with-not">
              Date of Birth <i className="i-if-r"></i>
            </label>
            <input
              type="date"
              className={`form-control location ${
                errors.dateOfBirth && touched.dateOfBirth ? "is-invalid" : ""
              }`}
              value={values.dateOfBirth}
              name="dateOfBirth"
              id="dateOfBirth"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.dateOfBirth && touched.dateOfBirth ? (
            <div className="field-eror">{errors.dateOfBirth}</div>
          ) : null}

          {/* check box for gender */}
          <div className="d-flex justify-content-between mt-3">
            {/* male radio button */}
            <div className="form-radio-user">
              <input
                className="form-radio-input"
                type="radio"
                name="gender"
                value="male"
                id="male"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.gender === "male"}
              />
              <label className="form-radio-label" htmlFor="male">
                Male
              </label>
            </div>
            {/* female radio button */}
            <div className="form-radio-user">
              <input
                className="form-radio-input"
                type="radio"
                name="gender"
                value="female"
                id="female"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.gender === "female"}
              />
              <label className="form-radio-label" htmlFor="female">
                Female
              </label>
            </div>
            {/* other radio button */}
            <div className="form-radio-user">
              <input
                className="form-radio-input"
                type="radio"
                name="gender"
                value="other"
                onChange={handleChange}
                id="other"
                onBlur={handleBlur}
                checked={values.gender === "other"}
              />
              <label className="form-radio-label" htmlFor="other">
                Other
              </label>
            </div>
          </div>
          {errors.gender && touched.gender ? (
            <div className="field-eror">{errors.gender}</div>
          ) : null}

          <div className="mt-3 text-center">
            <button
              className={`btn btn-form ${loading && "disabled"}`}
              type="submit"
              style={buttonStyle}
            >
              {loading ? "...loading" : "Update"}
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

export default UpdateUserPersonalInfo;

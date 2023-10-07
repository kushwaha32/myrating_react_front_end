import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { useState } from "react";
import uploadProImg from "../../img/upload-pro-img.png";
import transparend from "../../img/transparent.png";
import { useFormik } from "formik";
import profileImageValidationSchema from "../../schemaValidation/ProfileImageValidationSchema";
import useHandleImage from "../../utils/ownHooks/useHandleImage";
import useGetImageSecureUrl from "../../utils/ownHooks/useGetImageScureUrl";
import { useSelector } from "react-redux";
import { useUpdateUserProfileImageMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import usePreviousSteps from "../../utils/ownHooks/usePreviousSteps";
import { IsTabletOrLess } from "../../utils/mediaScreens";
import useCurrentLocationSlug from "../../utils/ownHooks/useCurrentLocationSlug";
import ImageCropper from "../ImageCropper/ImageCropper";

const initialValues = {
  image: "",
};

const UploadProfilePhoto = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImg, setProfileImg] = useState();
  const [imageName, setImageName] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  /////////////////////////////////////////////////////////////////////////////////////
  /////----------------- get user info from redux state //-------------------/////////
  ///////////////////////////////////////////////////////////////////////////////////

  const { userInfo } = useSelector((state) => state.auth);

  //////////////////////////////////////////////////////////////
  ////////---- Get the current slug -----///////////////
  //////////////////////////////////////////////////////////////
  const getCurrentSlug = useCurrentLocationSlug();

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- previous step handling --------------///////////////
  ////////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep] = usePreviousSteps();

  /////////////////////////////////////////////////////////////////////////////////////
  /////--- Handle and upload image to s3 bucket in update to user profile ---/////////
  ///////////////////////////////////////////////////////////////////////////////////
  const handleSecureUrl = useGetImageSecureUrl();
  const [updateUserProfileImg] = useUpdateUserProfileImageMutation();

  const {
    values,
    errors,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: profileImageValidationSchema,
    onSubmit: async (value) => {
      try {
        setIsLoading(true);
        const img = await handleSecureUrl(value.image);
        const res = await updateUserProfileImg({
          id: userInfo.user.userProfile._id,
          image: img,
        }).unwrap();

        if (res?.status === "success") {
          toast.success(res?.message);
          navigate("/register/submit-for-varification");
          handlePreviousStep("upload-profile-photo");
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    },
  });

  //////////////////////////////////////////////////////////////////
  //////--- handling the image in change ---///////////////////////
  /////////////////////////////////////////////////////////////////

  const handleImage = useHandleImage(
    setFieldValue,
    setProfileImg,
    setImageName,
    values,
    setShow
  );

  //////////////////////////////////////////////////////////////////
  //////--------- Skip step function --------///////////////////////
  /////////////////////////////////////////////////////////////////

  const skipStep = () => {
    navigate("/register/submit-for-varification");
    handlePreviousStep("upload-profile-photo");
  };

  return (
    <div className="register-b col-lg-9 col-sm-12 mobile-verify">
      {/* /////////////////////////////////////////////////////////// */}
      {/* /////////////////------- Image Cropper -------///////////// */}
      {/* /////////////////////////////////////////////////////////// */}
      <ImageCropper
        show={show}
        setShow={setShow}
        setProfileImg={setProfileImg}
        profileImg={profileImg}
        setFieldValue={setFieldValue}
        fieldValueName={"image"}
      />
      {!IsTabletOrLess() && (
        <h1 className="title position-relative">
          <span> Create your profile</span>
        </h1>
      )}

      {/*/////////////------from field  .error-active -> for active error class ---////// 
       //////////////----------- .valid-active-g -> for valid input -----/////////////////
        */}

      <section className="register-b-main mb-5 position-relative">
        {IsTabletOrLess() && (
          <>
            <h2 className="register-b-cur">
              {getCurrentSlug === "register"
                ? "Personal Information"
                : getCurrentSlug.split("-").join(" ")}
            </h2>
            <br />
          </>
        )}
        <form className="was-validated " onSubmit={handleSubmit}>
          <div className="form-group">
            <figure className="d-flex align-items-center justify-content-between my-2 mx-2">
              <figcaption className="upload-photo-text">
                Upload Profile Photo
                <span className="d-block">
                  File Size Max. 10 MB <span>(JPEG, PNG)</span>
                </span>
              </figcaption>
              {/* /////////////////////////////////////////////////////////// */}
              {/* /////////////------- Upload profile photo -------////////// */}
              {/* /////////////////////////////////////////////////////////// */}
              <div className="uploadImg position-relative">
                <input
                  type="file"
                  className="uploadImg-a"
                  onChange={handleImage}
                  name="image"
                  id=""
                />
                <div className="place-holder-file d-flex align-items-center">
                  <span className="place-holder-file-a">
                    <img src={uploadProImg} alt="Upload Profile" />
                  </span>
                  <span className="place-holder-file-b" title={imageName}>
                    {imageName
                      ? imageName.slice(0, 12) + "..."
                      : "No File Upload"}
                  </span>
                </div>
              </div>
            </figure>
            {/* /////////////////////////////////////////////////////////// */}
            {/* /////////////------- Preview Profile photo -------///////// */}
            {/* /////////////////////////////////////////////////////////// */}
            <div className="profile-img">
              <img src={profileImg || transparend} alt="profile-img" />

              {errors?.image && (
                <div className="invalid-feedback mt-4">{errors?.image}</div>
              )}
            </div>
          </div>
          <div className="btn-s-main position-absolute btn-otp-s-main">
            <button
              className={`btn btn-white ${isLoading && "disabled"}`}
              type="submit"
            >
              {isLoading ? "loading" : "Verify & Continue"}
              <PulseLoader
                color="rgb(0 40 86 / 80%)"
                loading={isLoading}
                size={6}
              />
            </button>
          </div>
        </form>
        <button onClick={skipStep} className="skip-btn">
          Do it later
        </button>
      </section>
    </div>
  );
};

export default UploadProfilePhoto;

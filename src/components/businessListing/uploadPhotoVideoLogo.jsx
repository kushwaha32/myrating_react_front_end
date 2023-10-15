import { useFormik } from "formik";
import { useState } from "react";
import uploadProImg from "../../img/upload-pro-img.png";
import PulseLoader from "react-spinners/PulseLoader";
import navigatePre from "../../img/navigate-pre.png";
import useBusinessPreviousSteps from "../../utils/ownHooks/useBusinessPreviousSteps";
import { useNavigate } from "react-router-dom";
import useHandleImage from "../../utils/ownHooks/useHandleImage";
import ImageCropper from "../ImageCropper/ImageCropper";
import useGetImageSecureUrl from "../../utils/ownHooks/useGetImageScureUrl";
import { IsTabletOrLess } from "../../utils/mediaScreens";
import { useUpdateBrandPhotosMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const UploadPhotoVideoLogo = () => {
  const [isLoading, setIsLoading] = useState("");
  const [profileImg, setProfileImg] = useState();
  const [imageName, setImageName] = useState("");
  const [multipleImg, setMultipleImg] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  /////////////////////////////////////////////////////////////////////////////
  ///////////----------------- Initial state ------------------///////////////
  ////////////////////////////////////////////////////////////////////////////

  const [initialValues, setInitialValues] = useState({
    // description
    image: "",
  });

  /////////////////////////////////////////////////////////////////////////////
  //////////////--------- Update Brand photos mutation -------/////////////////
  ////////////////////////////////////////////////////////////////////////////
  const [updateBrandPhotos] = useUpdateBrandPhotosMutation();

  /////////////////////////////////////////////////////////////////////////////////////
  /////--- Handle and upload image to s3 bucket in update to user profile ---/////////
  ///////////////////////////////////////////////////////////////////////////////////
  const handleSecureUrl = useGetImageSecureUrl();

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- previous step handling --------------///////////////
  ////////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep, getPreviousSteps, removeItemsFromSteps] =
    useBusinessPreviousSteps();

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
    // validationSchema: contactInfoValidationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        let img;
        if (profileImg) {
          let blob = await fetch(profileImg).then((b) => b.blob());
          img = await handleSecureUrl(blob);
        }

        const mutiImgUploadedUrl = await Promise.all(
          multipleImg.map(async (img) => {
            let newImg = await handleSecureUrl(img);
            return newImg;
          })
        );
        const data = {
          profileImg: img ? img : "",
          multiImg: mutiImgUploadedUrl ? mutiImgUploadedUrl : [],
        };
        const res = await updateBrandPhotos(data).unwrap();
        if (res.status === "success") {
          // let user = { ...userInfo?.user };
          // // user?.brandProfile = {...res?.data?.brandProfile};
          // dispatch(setCredentials({ ...userInfo, user }));
          handlePreviousStep("upload-photo-video-logo");
          toast.success("Profile updated successfully!");
          navigate("/list-your-business/submit-for-verification");
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
  //////--------- Get back to previous form -------/////////////////
  /////////////////////////////////////////////////////////////////
  const getBack = () => {
    removeItemsFromSteps("business-keywords");
    navigate("/list-your-business/business-keywords");
  };

  //////////////////////////////////////////////////////////////////
  //////////--------- Handle multiple image -------/////////////////
  /////////////////////////////////////////////////////////////////

  const handleMultiImage = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    setMultipleImg([...multipleImg, ...selectedFilesArray]);
  };

  return (
    <div className="register-b col-lg-9 col-sm-12 mobile-verify position-relative">
      <ImageCropper
        show={show}
        setShow={setShow}
        setProfileImg={setProfileImg}
        profileImg={profileImg}
      />
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
            {/*////////////---------- upload profile photo -------//////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-2 upload-profile-bu">
              <div className="col-lg-5">
                <h3 className="upload-profile-bu-1">
                  Upload Profile Photo / Logo / Video
                </h3>
                <p className="upload-profile-bu-2">
                  File Size Max. 10 MB (JPEG, PNG)
                </p>
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
              </div>
              <div className="col-lg-7">
                <div className="row mt-4 align-items-center">
                  <div className="col-lg-5">
                    <div className="preview-circle">
                      {profileImg ? (
                        <img src={profileImg} alt="profileImg" />
                      ) : (
                        <p>Preview</p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="preview-circle preview-rectangle">
                      {profileImg ? (
                        <img src={profileImg} alt="profileImg" />
                      ) : (
                        <p>Preview</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5 mar-mai">
              <div className="col-lg-12">
                <h3 className="upload-profile-bu-1">
                  Upload more photos and videos
                </h3>
                <p className="upload-profile-bu-2">
                  File Size Max. 10 MB (JPEG, PNG) and 60 seconds video
                </p>
                <div className="preview-circle preview-rectangle mt-3">
                  <div className="img-m-main">
                    {multipleImg?.map((img, index) => (
                      <div className="img-m-con">
                        <img
                          src={URL.createObjectURL(img)}
                          alt=""
                          key={index}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="uploadImg  position-relative mt-3">
                  <input
                    type="file"
                    className="uploadImg-a"
                    onChange={handleMultiImage}
                    name="image"
                    multiple
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                  />
                  <div className="place-holder-file d-flex align-items-center justify-content-end">
                    <span className="place-holder-file-a">
                      <img src={uploadProImg} alt="Upload Profile" />
                    </span>
                    <span
                      className="place-holder-file-b"
                      title={multipleImg?.map((img) => img)}
                    >
                      {multipleImg.length > 0
                        ? multipleImg[0]?.name?.slice(0, 12) + "..."
                        : "No File Upload"}
                    </span>
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

export default UploadPhotoVideoLogo;

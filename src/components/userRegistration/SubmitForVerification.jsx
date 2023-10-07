import { Link, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Dropdown from "react-bootstrap/Dropdown";
import navigatePre from "../../img/navigate-pre.png";
import { useState } from "react";
import camera from "../../img/scanner.png";
import uploadProImg from "../../img/upload-pro-img.png";
import transparend from "../../img/transparent.png";
import usePreviousSteps from "../../utils/ownHooks/usePreviousSteps";
import {
  useUpdateUserDocumentIdMutation,
  useUpdateUserProfileImageMutation,
} from "../../slices/usersApiSlice";
import useGetImageSecureUrl from "../../utils/ownHooks/useGetImageScureUrl";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import useHandleImage from "../../utils/ownHooks/useHandleImage";
import profileImageValidationSchema from "../../schemaValidation/ProfileImageValidationSchema";
import documentIdValidationSchema from "../../schemaValidation/DocumentIdvalidationSchema";
import { toast } from "react-toastify";
import { IsTabletOrLess } from "../../utils/mediaScreens";
import useCurrentLocationSlug from "../../utils/ownHooks/useCurrentLocationSlug";
import WebCamCapturePhoto from "../webcamCapturePhoto/WebCapCapturePhoto";
import ImageCropper from "../ImageCropper/ImageCropper";

const initialValues = {
  documentType: "",
  idDocument: "",
  selfieImg: "",
};

const SubmitForVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImg, setProfileImg] = useState();
  const [imageName, setImageName] = useState("");
  const navigate = useNavigate();
  const [photoIdDocImg, setPhotoIdDocImg] = useState();
  const [photoIdDocImgName, setPhotoIdDocImgName] = useState("");
  const [photoIdShow, setPhotoIdShow] = useState(false);
  const [show, setShow] = useState(false);

  const [capturedImage, setCapturedImage] = useState(null);

  /////////////////////////////////////////////////////////////////////////////////////
  /////----------------- get user info from redux state //-------------------/////////
  ///////////////////////////////////////////////////////////////////////////////////

  const { userInfo } = useSelector((state) => state.auth);

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- previous step handling --------------///////////////
  ////////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep, getPreviousSteps, removeItemsFromSteps] =
    usePreviousSteps();

  //////////////////////////////////////////////////////////////
  ////////------- Get the current slug ----------///////////////
  //////////////////////////////////////////////////////////////
  const getCurrentSlug = useCurrentLocationSlug();

  /////////////////////////////////////////////////////////////////////////////////////
  /////--- Handle and upload image to s3 bucket in update to user profile ---/////////
  ///////////////////////////////////////////////////////////////////////////////////

  const handleSecureUrl = useGetImageSecureUrl();
  const [updateUserDocumentId] = useUpdateUserDocumentIdMutation();

  const {
    values,
    errors,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: documentIdValidationSchema,
    onSubmit: async (value) => {
      try {
        setIsLoading(true);
        const selfiImg = await handleSecureUrl(value.selfieImg);
        const idDocument = await handleSecureUrl(value.idDocument);
        setPhotoIdDocImg(idDocument);
        setCapturedImage(selfiImg);

        const res = await updateUserDocumentId({
          id: userInfo.user.userProfile._id,
          idDocument: idDocument,
          selfiImg: selfiImg,
          documentType: value.documentType,
        }).unwrap();

        if (res?.status === "success") {
          toast.success(res?.message);
          navigate("/register/varification-message");
          handlePreviousStep("submit-for-varification");
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
    setPhotoIdDocImg,
    setPhotoIdDocImgName,
    values,
    setPhotoIdShow,
    "idDocument"
  );

  //////////////////////////////////////////////////////////////////
  //////--------- Skip step function --------///////////////////////
  /////////////////////////////////////////////////////////////////

  const skipStep = () => {
    navigate("/register/varification-message");
    handlePreviousStep("submit-for-varification");
  };

  //////////////////////////////////////////////////////////////////
  //////--------- Get back to previous form -------/////////////////
  /////////////////////////////////////////////////////////////////
  const getBack = () => {
    removeItemsFromSteps("upload-profile-photo");
    navigate("/register/upload-profile-photo");
  };

  //////////////////////////////////////////////////////
  //////////----- recapture img fun -----//////////////
  ////////////////////////////////////////////////////
  const recapture = () => {
    setCapturedImage(null);
  };
  return (
    <div className="register-b col-lg-9 col-sm-12 mobile-verify">
      {/* ////////////////////////////////////////////////////////// */}
      {/*////////----- Webcam image capture -----///////////////////*/}
      {/*////////////////////////////////////////////////////////////*/}
      <WebCamCapturePhoto
        show={show}
        setShow={setShow}
        capturedImage={capturedImage}
        setCapturedImage={setCapturedImage}
        recapture={recapture}
        setFieldValue={setFieldValue}
        fieldValueName={"selfieImg"}
      />
      {/* ////////////////////////////////////////////////////////////// */}
      {/*///////////----- Photo id image cropper -----///////////////////*/}
      {/*////////////////////////////////////////////////////////////////*/}

      <ImageCropper
        setProfileImg={setPhotoIdDocImg}
        profileImg={photoIdDocImg}
        setShow={setPhotoIdShow}
        show={photoIdShow}
        recapture={null}
        setFieldValue={setFieldValue}
        fieldValueName={"idDocument"}
      />

      {!IsTabletOrLess() && (
        <h1 className="title position-relative">
          <span> Create your profile</span>
          <button onClick={getBack} className="transparent-btn">
            <img
              src={navigatePre}
              alt="navigate"
              loading="lazy"
              className="navigate-img"
            />
          </button>
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
        <form className="was-validated" onSubmit={handleSubmit}>
          <div className="upload-photo-text">
            Upload Documents for verification
            <span className="d-block">
              File Size Max. 10 MB <span>(JPEG, PNG, PDF)</span>
            </span>
          </div>
          <div className="form-group mt-4">
            {/* /////////////////////////////////////////////////////////////////////////// */}
            {/*//////////////---------- Id document and there Preview -------////////////// */}
            {/* /////////////////////////////////////////////////////////////////////////// */}
            <div className="row justify-content-center align-items-center">
              {/* /////////////////////////////////////////////////////////////////////////// */}
              {/*//////////////////////---------- Id document  -----------/////////////////// */}
              {/* /////////////////////////////////////////////////////////////////////////// */}
              <div className="col-lg-5 mct">
                {/* /////////////////////////////////////////////////////////////////////// */}
                {/*////////////---------- Verification document options -------//////////// */}
                {/* /////////////////////////////////////////////////////////////////////// */}
                <div className="upload-photo-text mb-4 d-flex align-items-center justify-content-between">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="success"
                      className="drop-id-veri"
                      id="dropdown-basic"
                    >
                      {values.documentType
                        ? values.documentType
                        : "Select Document Type"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ width: "100%" }}>
                      <Dropdown.Item
                        as="div"
                        onClick={() =>
                          setFieldValue("documentType", "Aadhar Card")
                        }
                      >
                        Aadhar Card
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="div"
                        onClick={() =>
                          setFieldValue("documentType", "Driver License")
                        }
                      >
                        Driver License
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="div"
                        onClick={() =>
                          setFieldValue("documentType", "Voter ID")
                        }
                      >
                        Voter ID
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="div"
                        onClick={() =>
                          setFieldValue(
                            "documentType",
                            "Employee ID (Issued by Office)"
                          )
                        }
                      >
                        Employee ID (Issued by Office)
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="div"
                        onClick={() =>
                          setFieldValue("documentType", "Passport")
                        }
                      >
                        Passport
                      </Dropdown.Item>
                    </Dropdown.Menu>
                    {errors?.documentType && (
                      <div className="invalid-feedback">
                        {errors?.documentType}
                      </div>
                    )}
                  </Dropdown>
                </div>

                <label htmlFor="uname" className="register-label mt-4">
                  Attach document
                </label>
                <div className="uploadImg position-relative">
                  <input
                    type="file"
                    className="uploadImg-a"
                    onChange={handleImage}
                    name="idDocument"
                    id=""
                  />
                  <div className="place-holder-file d-flex align-items-center">
                    <span className="place-holder-file-a">
                      <img
                        src={camera}
                        alt="Upload Profile"
                        style={{ width: "23px" }}
                      />
                    </span>
                    <span
                      className="place-holder-file-b"
                      title={photoIdDocImgName}
                    >
                      {photoIdDocImgName
                        ? photoIdDocImgName.slice(0, 12) + "..."
                        : "Id Document"}{" "}
                    </span>
                  </div>
                </div>
              </div>

              {/* ////////////////////////////////////////////////////////// */}
              {/*/////////////-------- 2-col gap ------------////////////////*/}
              {/* ////////////////////////////////////////////////////////// */}
              <div className="col-lg-1 col-sm-12"></div>

              {/* /////////////////////////////////////////////////////////////////////////// */}
              {/*//////////////////////---------- There preview  -----------///////////////// */}
              {/* /////////////////////////////////////////////////////////////////////////// */}
              <div className="col-lg-5 mct">
                <div className="row mt-4 align-items-center">
                  <div className="col-lg-12">
                    <div className="preview-circle preview-rectangle">
                      {photoIdDocImg ? (
                        <img src={photoIdDocImg} alt="profileImg" />
                      ) : (
                        <p>Preview</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* /////////////////////////////////////////////////////////////////////////// */}
            {/*//////////////---------- Take selfie and there Preview -------////////////// */}
            {/* /////////////////////////////////////////////////////////////////////////// */}
            <div className="row justify-content-center align-items-center">
              {/* /////////////////////////////////////////////////////////////////////////// */}
              {/*//////////////////////---------- Take selfie  -----------/////////////////// */}
              {/* /////////////////////////////////////////////////////////////////////////// */}
              <div className="col-lg-5 mct">
                <label htmlFor="uname" className="register-label">
                  {capturedImage ? "Re-Take Selfie" : "Take Selfie"}
                </label>
                <div className="uploadImg position-relative">
                  <div
                    className="place-holder-file d-flex align-items-center"
                    onClick={() =>
                      !capturedImage ? setShow(true) : recapture()
                    }
                  >
                    <span className="place-holder-file-a">
                      <img
                        src={camera}
                        alt="Upload Profile"
                        style={{ width: "23px" }}
                      />
                    </span>
                    <span className="place-holder-file-b">
                      {capturedImage ? "Re-Take Selfie" : "Take Selfie"}
                    </span>
                  </div>
                </div>
              </div>

              {/* ////////////////////////////////////////////////////////// */}
              {/*/////////////-------- 2-col gap ------------////////////////*/}
              {/* ////////////////////////////////////////////////////////// */}
              <div className="col-lg-1 col-sm-12"></div>

              {/* /////////////////////////////////////////////////////////////////////////// */}
              {/*//////////////////////---------- There preview  -----------///////////////// */}
              {/* /////////////////////////////////////////////////////////////////////////// */}
              <div className="col-lg-5 mct">
                <div className="row mt-4 align-items-center">
                  <div className="col-lg-12">
                    <div className="preview-circle preview-rectangle">
                      {capturedImage ? (
                        <img src={capturedImage} alt="profileImg" />
                      ) : (
                        <p>Preview</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
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

export default SubmitForVerification;

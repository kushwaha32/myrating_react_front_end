import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import camera from "../img/scanner.png";
import UserSettingAccountContainer from "./UserSettingAccoutContainer";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import WebCamCapturePhoto from "./webcamCapturePhoto/WebCapCapturePhoto";
import useHandleImage from "../utils/ownHooks/useHandleImage";
import ImageCropper from "./ImageCropper/ImageCropper";
import { PulseLoader } from "react-spinners";
import {
  useGetUserProfileMutation,
  useUpdateUserDocumentIdMutation,
} from "../slices/usersApiSlice";
import useGetImageSecureUrl from "../utils/ownHooks/useGetImageScureUrl";
import { toast } from "react-toastify";
import documentIdValidationSchema from "../schemaValidation/DocumentIdvalidationSchema";

const initialValues = {
  name: "",
  dob: "",
  email: "",
  contactNumber: "",
  documentType: "",
  idDocument: "",
  selfieImg: "",
};

const UserAccoutVarification = () => {
  //////////////////////////////////////////////////////////////////
  //////--- Get User Info from the state ---////////////////////////
  /////////////////////////////////////////////////////////////////
  const { userInfo } = useSelector((state) => state.auth);

  const [userSlug, setUserSlug] = useState(userInfo?.user?._id);
  const slugUrl = `/user/${userSlug}/setting`;
  const [show, setShow] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [photoIdDocImg, setPhotoIdDocImg] = useState();
  const [photoIdDocImgName, setPhotoIdDocImgName] = useState("");
  const [photoIdShow, setPhotoIdShow] = useState(false);

  /////////////////////////////////////////////////////////////////////////////////////
  /////--- Handle and upload image to s3 bucket in update to user profile ---/////////
  ///////////////////////////////////////////////////////////////////////////////////
  const handleSecureUrl = useGetImageSecureUrl();
  const [updateUserDocumentId] = useUpdateUserDocumentIdMutation();

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
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
          id: userInfo?.user?.userProfile?._id,
          idDocument: idDocument,
          selfiImg: selfiImg,
          documentType: value.documentType,
        }).unwrap();

        if (res?.status === "success") {
          toast.success(res?.message);
          handleGetUserProfile();
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    },
  });
  const [getUserProfile] = useGetUserProfileMutation();

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
  //////////--- Set Field values as component load ---/////////////
  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    setFieldValue("name", userInfo?.user?.userProfile?.name);
    setFieldValue("dob", userInfo?.user?.userProfile?.dob);
    setFieldValue("email", userInfo?.user?.email);
    setFieldValue("contactNumber", userInfo?.user?.contactNumber);
    handleGetUserProfile();
  }, []);

  //////////////////////////////////////////////////////////////////
  ////////////////--------- Get User profile --------//////////////
  ////////////////////////////////////////////////////////////////
  const handleGetUserProfile = async () => {
    try {
      const res = await getUserProfile().unwrap();
      if (res.status === "success") {
        setProfileData(res.data);
      }
    } catch (error) {}
  };

  //////////////////////////////////////////////////////
  //////////----- recapture img fun -----//////////////
  ////////////////////////////////////////////////////

  const recapture = () => {
    setCapturedImage(null);
  };
  return (
    <UserSettingAccountContainer
      slugUrl={slugUrl}
      title={`Account Verification ${
        profileData?.verified ? "( Verified )" : "( Unverified )"
      }`}
    >
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
      <form onSubmit={handleSubmit} className="was-validated">
        <div className="form-group container px-4">
          {/* ////////////////////////////////////////////////////////// */}
          {/*-----///////////////// name and dob -----///////////////////*/}
          {/*////////////////////////////////////////////////////////////*/}
          <div className="row justify-content-center">
            {/* ////////////////////////////////////////////////// */}
            {/*-----///////////////// name -----///////////////////*/}
            {/*////////////////////////////////////////////////////*/}
            <div className="col-lg-5 col-sm-12 mct">
              <label htmlFor="uname" className="register-label">
                Name *
              </label>
              <div
                className={`form-control input-contact`}
                placeholder="Enter Mobile Number"
                name="contactNumber"
              >
                {values.name}
              </div>
            </div>
            {/* ////////////////////////////////////////////////////////// */}
            {/*/////////////-------- 2-col gap ------------////////////////*/}
            {/* ////////////////////////////////////////////////////////// */}
            <div className="col-lg-1 col-sm-12"></div>

            {/* ////////////////////////////////////////////////////////// */}
            {/*///////////-------- date of birth ------------//////////////*/}
            {/* ////////////////////////////////////////////////////////// */}

            <div className="col-lg-5 col-sm-12 mct">
              <label htmlFor="dob" className="register-label">
                Date Of Birth *
              </label>
              <input
                type="date"
                className={`form-control ${
                  errors.dob && touched.dob && "error-active"
                }`}
                id="dob"
                placeholder="Enter username"
                name="dob"
                value={values.dob}
                style={{ height: "38px" }}
                required
              />
              {errors.dob && touched.dob && (
                <div className="invalid-feedback">
                  Please provide you Date Of Birth.
                </div>
              )}
            </div>
          </div>

          {/* ///////////////////////////////////////////////////////////// */}
          {/*-----///////////////// email and mobile-----///////////////////*/}
          {/*///////////////////////////////////////////////////////////////*/}
          <div className="row justify-content-center">
            {/* ////////////////////////////////////////////////// */}
            {/*-----///////////////// email -----///////////////////*/}
            {/*////////////////////////////////////////////////////*/}
            <div className="col-lg-5 col-sm-12 mct">
              <label htmlFor="email" className="register-label">
                E-Mail Address *
              </label>
              <div
                className={`form-control input-contact`}
                placeholder="Enter Mobile Number"
                name="contactNumber"
              >
                {` ${userInfo?.user?.email?.slice(0, 3)}${Array.from(
                  {
                    length:
                      userInfo?.user?.email.length -
                      3 -
                      userInfo?.user?.email.slice(
                        userInfo?.user?.email?.indexOf("@")
                      ).length,
                  },
                  () => "x"
                ).join("")}${userInfo?.user?.email.slice(
                  userInfo?.user?.email?.indexOf("@")
                )}`}
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////// */}
            {/*/////////////-------- 2-col gap ------------////////////////*/}
            {/* ////////////////////////////////////////////////////////// */}
            <div className="col-lg-1 col-sm-12"></div>

            {/* ////////////////////////////////////////////////////////// */}
            {/*///////////-------- Mobile number ------------//////////////*/}
            {/* ////////////////////////////////////////////////////////// */}
            <div className="col-lg-5 col-sm-12 mct">
              <label htmlFor="contactNumber" className="register-label">
                Mobile No.*
              </label>
              <div
                className={`form-control input-contact`}
                placeholder="Enter Mobile Number"
                name="contactNumber"
              >
                {`+91 ${userInfo?.user?.contactNumber?.slice(0, 2)}${Array.from(
                  { length: 5 },
                  () => "x"
                ).join("")}${userInfo?.user?.contactNumber?.slice(
                  userInfo?.user?.contactNumber.length - 3
                )}`}
              </div>
            </div>
          </div>
          {!profileData?.submitVerification ? (
            <>
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
                  <div className="row mt-4 sm-m align-items-center">
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
                  <label htmlFor="uname" className="register-label">
                    Attach any photo ID document
                  </label>
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
              {/*/////////////---------- Submit for verification Handler -------///////////// */}
              {/* /////////////////////////////////////////////////////////////////////////// */}
              <div className="btn-s-main mt-5 row justify-content-center">
                <button
                  type="submit"
                  className={`btn btn-white ${isLoading && "disabled"}`}
                  style={{ width: "215px" }}
                >
                  {isLoading ? "Loading" : "Submit for Verification"}
                  <PulseLoader
                    color="rgb(0 40 86 / 80%)"
                    loading={isLoading}
                    size={6}
                    cssOverride={{ width: "37px", display: "inline" }}
                  />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* /////////////////////////////////////////////////////////////////////////// */}
              {/*/////////////---------- Uploaded selfie and Id Document -------///////////// */}
              {/* /////////////////////////////////////////////////////////////////////////// */}
              <div className="row justify-content-center align-items-center">
                {/* /////////////////////////////////////////////////////////////////////////// */}
                {/*//////////////////////---------- Selfie Image  -----------/////////////////// */}
                {/* /////////////////////////////////////////////////////////////////////////// */}
                <div className="col-lg-5 mct">
                  <div className="row mt-4 sm-m align-items-center">
                    <div className="col-lg-12">
                      <label
                        htmlFor="contactNumber"
                        className="register-label mb-2"
                      >
                        User Selfie
                      </label>
                      <div className="preview-circle preview-rectangle">
                        <img
                          src={profileData?.selfiImg}
                          alt="profileImg"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ////////////////////////////////////////////////////////// */}
                {/*/////////////-------- 2-col gap ------------////////////////*/}
                {/* ////////////////////////////////////////////////////////// */}
                <div className="col-lg-1 col-sm-12"></div>

                {/* /////////////////////////////////////////////////////////////////////////// */}
                {/*//////////////////////---------- Id Document  -----------///////////////// */}
                {/* /////////////////////////////////////////////////////////////////////////// */}
                <div className="col-lg-5 mct">
                  <div className="row mt-4 sm-m align-items-center">
                    <div className="col-lg-12">
                      <label
                        htmlFor="contactNumber"
                        className="register-label mb-2"
                      >
                        User Id Type :{" "}
                        {JSON.parse(profileData?.verificationId)?.documentType}
                      </label>
                      <div className="preview-circle preview-rectangle">
                        <img
                          src={
                            JSON.parse(profileData?.verificationId)?.idDocument
                          }
                          alt="profileImg"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </form>
    </UserSettingAccountContainer>
  );
};

const style = {
  width: "160px",
  padding: "9px 0",
  color: "#fff",
};
export default UserAccoutVarification;

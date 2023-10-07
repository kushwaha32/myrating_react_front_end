import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Modal from "react-bootstrap/Modal";
import { PulseLoader } from "react-spinners";
import "./WebCamCapturePhoto.css";
import ImageCropper from "../ImageCropper/ImageCropper";

const WebCamCapturePhoto = ({
  show,
  setShow,
  capturedImage,
  setCapturedImage,
  recapture,
  setFieldValue,
  fieldValueName,
}) => {
  const webcamRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showCropper, setShowCropper] = useState(true);
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const handleClose = () => setShow(false);
  return (
    <>
      {!capturedImage ? (
        <Modal show={show} onHide={handleClose} className="crop-img-model">
          <Modal.Header closeButton>
            <Modal.Title>
              {capturedImage ? "Captured Selfie" : "Take Selfie"}{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="webCam-img">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="btn-s-main">
            <button
              type="button"
              className={`btn btn-white ${isLoading && "disabled"}`}
              onClick={capture}
            >
              {isLoading ? "Loading" : "Save"}
              <PulseLoader
                color="rgb(0 40 86 / 80%)"
                loading={isLoading}
                size={6}
                cssOverride={{ width: "37px" }}
              />
            </button>
          </Modal.Footer>
        </Modal>
      ) : (
        <ImageCropper
          setProfileImg={setCapturedImage}
          profileImg={capturedImage}
          setShow={setShowCropper}
          show={showCropper}
          recapture={recapture}
          setFieldValue={setFieldValue}
          fieldValueName={fieldValueName}
        />
      )}
    </>
  );
};

export default WebCamCapturePhoto;

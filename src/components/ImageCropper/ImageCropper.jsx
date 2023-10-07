import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import Modal from "react-bootstrap/Modal";
import "./imageCropper.css";
import plusZoom from "../../img/plus.png";
import PulseLoader from "react-spinners/PulseLoader";
import minusZoomOut from "../../img/minus-sign.png";
import getCroppedImg from "../../utils/helperFunction/getCroppedImg";

const ImageCropper = ({
  setProfileImg,
  profileImg,
  setShow,
  show,
  recapture,
  setFieldValue,
  fieldValueName,
}) => {
  const handleClose = () => setShow(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const slider = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const zoomIn = () => {
    slider.current.stepUp();
    setZoom(slider.current.value);
  };
  const zoomOut = () => {
    slider.current.stepDown();
    setZoom(slider.current.value);
  };

  ///////////////////////////////////////////////////////////////
  ////--- Function to convert Blob URL to Blob -----////////////
  /////////////////////////////////////////////////////////////
  async function convertBlobUrlToBlob(blobUrl) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return blob;
  }

  const getCroppedImage = useCallback(async () => {
    try {
      setIsLoading(true);

      const blobUrl = await getCroppedImg(profileImg, croppedAreaPixels);
      ////////////////////////////////////////////////////////
      ////--- Get blob Object from blob url -----////////////
      //////////////////////////////////////////////////////
      const blob = await convertBlobUrlToBlob(blobUrl);

      setFieldValue && setFieldValue(fieldValueName, blob);
      setProfileImg(blobUrl);
      setIsLoading(false);
      setShow(false);
    } catch (error) {}
  }, [croppedAreaPixels]);
  return (
    <>
      <Modal show={show} onHide={handleClose} className="crop-img-model">
        <Modal.Header closeButton>
          <Modal.Title>Upload Profile Photo / Logo </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="image-croper-center">
            <div className="crop-img-model">
              <Cropper
                image={profileImg}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                cropShape="round"
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          </div>
          <div className="slider-zoom-crop">
            <div className="slider_inc_icon" onClick={() => zoomOut()}>
              <img src={minusZoomOut} alt="zoomOut" />
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={0.2}
              value={zoom}
              ref={slider}
              onChange={(e) => setZoom(e.target.value)}
            />
            <div className="slider_inc_icon" onClick={() => zoomIn()}>
              <img src={plusZoom} alt="zoomIn" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="btn-s-main">
          {recapture && (
            <button
              className={`btn btn-white ${isLoading && "disabled"}`}
              onClick={recapture}
            >
              Re-Take Selfie
            </button>
          )}
          <button
            type="button"
            className={`btn btn-white ${isLoading && "disabled"}`}
            onClick={getCroppedImage}
          >
            {isLoading ? "Loading" : "Save "}
            <PulseLoader
              color="rgb(0 40 86 / 80%)"
              loading={isLoading}
              size={6}
              cssOverride={{ width: "37px" }}
            />
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImageCropper;

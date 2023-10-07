import { useRef, useState } from "react";
import copy from "clipboard-copy";
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";
import Modal from "react-bootstrap/Modal";
import dot from "../img/dots.png";
import copyClipboard from "../img/copy-clipboard.png";
import checkMark from "../img/check-mark.png";
import useCloseOutsideClick from "../utils/ownHooks/useCloseOutsideClick";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ThreeDotsShareAndInterest = ({ currentProduct }) => {
  const [toggleShare, setToggleShare] = useState(false);
  const shareRef = useRef();
  /////////////////////////////////////////////////////////////////
  /////////---- Share and Interested button handler ----//////////
  ///////////////////////////////////////////////////////////////
  useCloseOutsideClick(shareRef, setToggleShare);
  const [copiedText, setCopiedText] = useState(
    document?.URL?.split("/").splice(0, 5).join("/")
  );
  const [isCopied, setIsCopied] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCopyClick = async () => {
    try {
      setIsCopied(false);
      await copy(copiedText);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (error) {
      setIsCopied(false);
    }
  };
  return (
    <>
      <div className="share-content-modal">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Share Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body className="share-content-modal">
            <label>Link</label>
            {/* //////////////////////////////////////////////////////// */}
            {/* ///////////////--- Copy to Clipboard ---//////////////// */}
            {/* //////////////////////////////////////////////////////// */}
            <ul className="copy-clipboard mt-2">
              <li>{copiedText}</li>
              <li onClick={() => (!isCopied ? handleCopyClick() : "")}>
                {isCopied ? (
                  <>
                    <img src={checkMark} alt="" /> Copied
                  </>
                ) : (
                  <>
                    <img src={copyClipboard} alt="" />
                    Copy
                  </>
                )}
              </li>
            </ul>

            {/* //////////////////////////////////////////////////////// */}
            {/* //////////////////--- Share buttons ---///////////////// */}
            {/* //////////////////////////////////////////////////////// */}
            <ul className="d-flex align-items-center share-social-media mt-4 mb-3">
              <li>
                <WhatsappShareButton url={copiedText}>
                  <i className="fa fa-whatsapp"></i>
                </WhatsappShareButton>
              </li>
              <li>
                <FacebookShareButton url={copiedText}>
                  <i className="fa fa-facebook"></i>
                </FacebookShareButton>
              </li>
              <li>
                {/* Twitter */}
                <TwitterShareButton url={copiedText}>
                  <i className="fa fa-twitter"></i>
                </TwitterShareButton>
              </li>
            </ul>
          </Modal.Body>
        </Modal>
      </div>

      <span className="product-d-menu-dot-a" ref={shareRef}>
        <img
          src={dot}
          alt=""
          onClick={() => setToggleShare((toggleShare) => !toggleShare)}
        />
        <ul
          className={`product-d-menu-dot-share ${
            toggleShare ? "dot-share-active" : ""
          }`}
        >
          <li onClick={handleShow}>Share Profile</li>
          <li>I'm not interested</li>
        </ul>
      </span>
    </>
  );
};

export default ThreeDotsShareAndInterest;

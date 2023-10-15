import Dropdown from "react-bootstrap/Dropdown";
import uploadProImg from "../../img/upload-pro-img.png";
import { useState } from "react";
import useHandleImage from "../../utils/ownHooks/useHandleImage";

const DocumentVerification = ({
  values,
  setFieldValue,
  errors,
  verify,
  fieldSet,
  imgSetField,
}) => {
  const [profileImg, setProfileImg] = useState();
  const [imageName, setImageName] = useState("");

  //////////////////////////////////////////////////////////////////
  //////--- handling the image in change ---///////////////////////
  /////////////////////////////////////////////////////////////////

  const handleImage = useHandleImage(
    setFieldValue,
    setProfileImg,
    setImageName,
    values,
    "",
    imgSetField
  );
  return (
    <div className="form-group mt-2">
      <div className="d-flex align-items-center bus-doc-upimg justify-content-between my-2 mx-2">
        <div className="upload-photo-text">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              className="drop-id-veri"
              id="dropdown-basic"
            >
              {values?.[fieldSet] ? (
                <>
                  {values?.[fieldSet]?.length > 15
                    ? `${values?.[fieldSet].slice(0, 15)}...`
                    : values?.[fieldSet]}
                </>
              ) : (
                "Select Document Type"
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: "100%" }}>
              {verify?.map((curEl) => (
                <Dropdown.Item
                  as="div"
                  onClick={() => setFieldValue(fieldSet, curEl)}
                >
                  {curEl}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
            {errors?.[fieldSet] && (
              <div className="invalid-feedback">{errors?.[fieldSet]}</div>
            )}
          </Dropdown>
        </div>
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
              <img src={uploadProImg} alt="Upload Document Id" />
            </span>
            <span className="place-holder-file-b" title={imageName}>
              {imageName ? imageName.slice(0, 12) + "..." : "No File Upload"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentVerification;

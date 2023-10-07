import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImgWithSideCaption from "../ImgWithSideCaption";

const QrcodeAccordNav = ({ catSlug, slugUrl, products }) => {
  return (
    <Accordion.Item eventKey={catSlug}>
      <Accordion.Header>{catSlug.split("-").join(" ")}</Accordion.Header>
      <Accordion.Body>
        {products.length > 0 && (
          <>
            {products?.map((pro) => (
              <Link
                to={`${slugUrl}/product/${pro?.productNameSlug}`}
                className="ac-content d-block"
              >
                <ImgWithSideCaption
                  img={pro?.proifleImg}
                  title={pro?.productName}
                >
                  <p className="ab-text" style={{ color: "#333" }}>
                    {pro?.location?.address}
                  </p>
                </ImgWithSideCaption>
              </Link>
            ))}
          </>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default QrcodeAccordNav;

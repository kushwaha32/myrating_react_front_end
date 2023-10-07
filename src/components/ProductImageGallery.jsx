import LightGallery from "lightgallery/react";
import akber from "../img/akbar-tomb.jpg";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-rotate.css";

// own styles
import "../assets/css/productImageGallery.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgShare from "lightgallery/plugins/share";
import { useLocation, useNavigate } from "react-router-dom";

const ProductImageGallery = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  return (
    <div className="App light-g-img-main position-relative">
      <LightGallery
        speed={500}
        plugins={[lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgShare]}
      >
        <a href={akber}>
          <img alt="img1" src={akber} />
        </a>
        <a href={akber}>
          <img alt="img2" src={akber} />
        </a>
        <a href={akber}>
          <img alt="img2" src={akber} />
        </a>
        <a href={akber}>
          <img alt="img2" src={akber} />
        </a>
        <a href={akber}>
          <img alt="img2" src={akber} />
        </a>
        <a href={akber}>
          <img alt="img2" src={akber} />
        </a>
        <a href={akber}>
          <img alt="img2" src={akber} />
        </a>
        <a href={akber}>
          <img alt="img2" src={akber} />
        </a>
        <a href={akber}>
          <img alt="img2" src={akber} />
        </a>
        <a href={akber}>
          <img alt="img2" src={akber} />
        </a>
        <a href={akber}>
          <img alt="img2" src={akber} />
        </a>
        <a href={akber}>
          <img alt="img2" src={akber} />
        </a>
        <a href={akber}>
          <img alt="img2" src={akber} />
        </a>
        <a href={akber}>
          <img alt="img2" src={akber} />
        </a>
        <a href={akber}>
          <img alt="img2" src={akber} />
        </a>
        <a href={akber}>
          <img alt="img2" src={akber} />
        </a>
        <a href={akber}>
          <img alt="img2" src={akber} />
        </a>
      </LightGallery>
      {`${location}` !== "/product/moong-daal-chila/images" ? (
        <div
          className="view-all-img"
          onClick={() => navigate(`${location}/images`)}
        >
          <span>View all</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductImageGallery;

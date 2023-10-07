import LightGallery from "lightgallery/react";
import akber from "../../img/akbar-tomb.jpg";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-rotate.css";

// own styles
import "../../assets/css/reviewImageGallery.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgShare from "lightgallery/plugins/share";

const ReviewImageGallery = ({ images }) => {
  return (
    <div className="App light-g-img-main position-relative">
      <LightGallery
        speed={500}
        plugins={[lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgShare]}
      >
        {images.map((img, index) => (
          <a href={img} key={index}>
            <img alt="img1" src={img} />
          </a>
        ))}
      </LightGallery>
    </div>
  );
};

export default ReviewImageGallery;

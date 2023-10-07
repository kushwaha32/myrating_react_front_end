import { Link } from "react-router-dom";

const ImgWithSideCaption = ({ children, styImg, img, title, link }) => {
  return (
    <figure className="product-d-menu-aa">
      <div className="product-d-menu-aa-a">
        <img style={styImg && styImg} src={`${img}`} alt={title} />
      </div>

      <figcaption className="product-d-menu-aa-b">
        {link ? (
          <Link to={link && link} className="product-d-menu-aa-link text-capitalize">{title}</Link>
        ) : (
          <h3 className="product-d-menu-aa-ba text-capitalize">{title}</h3>
        )}

        {children}
      </figcaption>
    </figure>
  );
};

export default ImgWithSideCaption;

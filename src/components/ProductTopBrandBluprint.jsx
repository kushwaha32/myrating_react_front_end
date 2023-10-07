import { useState } from "react";
import { Link } from "react-router-dom";

const ProductTopBrandBluePrint = ({ brandImg, title, brandSlug }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  return (
    <figure className="top-brand item">
       <Link to={`/top-brand/${brandSlug}`} className="top-brand-a d-block">
        <img className="top-brand-aa" src={`${brandImg}`} alt="" />
      </Link>
      <figcaption
        className="top-brand-b"
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        {title.length > 17 ? (
          <>
            {`${title.slice(0, 17)} ...`}
            {tooltipVisible && <span class="tooltiptext">{title}</span>}
          </>
        ) : (
          title
        )}
      </figcaption>
    </figure>
  );
};

export default ProductTopBrandBluePrint;

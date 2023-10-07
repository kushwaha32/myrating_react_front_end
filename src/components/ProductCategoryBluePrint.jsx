import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";

const ProductCategoryBluePrint = ({ children, title, cls, url }) => {
  // owl carousel options
  const options = {
    loop: true,
    items: 3,
    margin: 0,
    autoplay: false,
    dots: false,
    autoplayTimeout: 8500,
    smartSpeed: 450,
    nav: true,
    responsive: {
      0: {
        items: 1.5,
      },
      400: {
        items: 2.5,
      },
      600: {
        items: 3.5,
      },
      800: {
        items: 4.5,
      },
      1000: {
        items: 5.5,
      },
      1400: {
        items: 7.5,
      }
    },
  };

  return (
    <section className={`category container mt-3 ${cls}`}>
      <article className="category-head">
        <h1 className="category-title">
          {title}
          {/* scrool arrow left and right */}
          {/* <span className="category-arrow">
            <button className="category-arrow-left category-arrow-a">
              <i className="fa fa-long-arrow-left"></i>
            </button>
            <button className="category-arrow-righ category-arrow-a">
              <i className="fa fa-long-arrow-right"></i>
            </button>
          </span> */}
        </h1>
        <Link to={url ? url : ""} className="category-all">
          View All
        </Link>
      </article>
      <OwlCarousel className="owl-theme" {...options}>
        {children}

        {/* old product */}

        {/* <div className="px-1">
            <Link to="/product/taj-mahal" className="category-product">
              <img src={heart} className="category-product-heart" alt="" />
              <img src={dot} className="category-product-dot" alt="" />
              <img src={mainImg} className="category-product-img" alt="" />
              <h2 className="category-product-title">Taj Mahal</h2>
              <p className="category-product-loc">
                <img src={location} alt="" />
                <span>Agra</span>
              </p>
              <p className="category-product-loc">
                <img src={star} alt="" />
                <span className="rating">(4.8)</span>
              </p>
            </Link>
          </div> */}
      </OwlCarousel>
    </section>
  );
};

export default ProductCategoryBluePrint;

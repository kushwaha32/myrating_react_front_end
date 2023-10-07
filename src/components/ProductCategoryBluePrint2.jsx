
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ArrowNext from "./arrowNext";
import ArrowPrew from "./arrowPrev";
import { Link } from "react-router-dom";

const ProductCategoryBluePrint2 = ({children, title}) => {
  var settings = {
    dots: false,
    infinite: true,
    autoPlay: true,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrew />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 321,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <section className="category container mt-3">
      <article className="category-head">
        <h1 className="category-title">
          {title}
          <span className="category-arrow">
            <button className="category-arrow-left">
              <i className="fa fa-long-arrow-left"></i>
            </button>
            <button className="category-arrow-righ">
              <i className="fa fa-long-arrow-right"></i>
            </button>
          </span>
        </h1>
        <Link href="#" className="category-all">
          View All
        </Link>
      </article>
      <Slider {...settings}>
      
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
      </Slider>
    </section>
  );
};

export default ProductCategoryBluePrint2;

// third party module import
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";

// user defined module import
import "../../assets/css/userbelow767.css";
import taj from "../../img/taj.jpg";
import star from "../../img/star.png";
import starUncolored from "../../img/star-uncolored.png";
import heart from "../../img/heart-star.png";
import ShadowLayout from "../ShadowLayout";
import ImgWithSideCaption from "../ImgWithSideCaption";
import { Link } from "react-router-dom";
import RatingAndReview from "../RatingAndReviewModel";
import { useState } from "react";
import ProductRatingProgress from "../ProductRatingProgress";
import starColored from "../../img/star-uncolored.png";
import ProductTitle from "../ProductTitle";
import filterImg from "../../img/rating-filter.png";
import userImg from "../../img/user-p.png";
import likeImg from "../../img/likes.png";
import dislikeImg from "../../img/dislike.png";
import Dropdown from "react-bootstrap/Dropdown";

const ProductAboutBelow767 = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <section className="product-sm-identity">
        <ShadowLayout>
          <ImgWithSideCaption img={taj} title="Taj Mahal">
            <Link className="product-d-menu-aa-bb" to="">
              Uttar Pradesh Tourism Department
            </Link>
            <div className="product-d-menu-aa-bc">
              <img src={star} alt="" />
              <img src={star} alt="" />
              <img src={star} alt="" />
              <img src={star} alt="" />
              <img src={starUncolored} alt="" />
              <span>(4.5)</span>
            </div>
            <div className="product-d-menu-aa-bd">
              <img src={heart} alt="" />
              <span>1.5k</span>
              <span>Likes</span>
            </div>
          </ImgWithSideCaption>
          <div className="product-d-menu-ab">
            {/* like button */}
            <button class="btn auth-btn lettersp-helf fw-bold">Like</button>
            {/* rate now */}
            <button
              class="btn auth-btn lettersp-helf fw-bold"
              onClick={handleShow}
            >
              Rate Now
            </button>
            {/* give a feedback */}
            <button class="btn auth-btn lettersp-helf fw-bold">
              Give Feedback
            </button>
            {/* rating and review model  */}
            <Modal show={show} onHide={handleClose}>
              <RatingAndReview handleClose={handleClose} />
            </Modal>
          </div>
        </ShadowLayout>
      </section>
      <section className="user-main-sm767 user-main-sm767-b product-main-sm767">
        <Accordion defaultActiveKey="personalInfo">
          <Accordion.Item eventKey="personalInfo">
            <Accordion.Header>Ratings</Accordion.Header>
            <Accordion.Body className="product-rr-sm-body">
              {/* rating */}
              <div className="rating-main-ab product-rr-sm">
                <div className="rating-main-ab-a">
                  {/* product avg rating */}
                  <div className="rating-main-ab-aa">
                    <h4 className="rating-main-ab-aa-a">4.5</h4>
                    <div className="rating-main-ab-aa-b">
                      <img src={star} alt="" />
                      <img src={star} alt="" />
                      <img src={star} alt="" />
                      <img src={star} alt="" />
                      <img src={starColored} alt="" />
                    </div>
                    <p>3.2k Reviews</p>
                  </div>
                  <span className="rating-main-border"></span>
                  {/* rating with progress bar */}
                  <div className="rating-main-ab-ab">
                    <ProductRatingProgress />
                    <ProductRatingProgress />
                    <ProductRatingProgress />
                    <ProductRatingProgress />
                    <ProductRatingProgress />
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="contactInfo">
            <Accordion.Header>Reviews</Accordion.Header>
            <Accordion.Body className="product-rr-sm-body-b">
              <section className="rating-main-b">
                {/* reviews section */}

                <div className="rating-main-ba">
                  <span className="rating-main-baa">Filter</span>
                  <Dropdown className="rating-main-bab">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <img
                        className="rating-main-baba"
                        src={filterImg}
                        alt=""
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <div className="rating-main-babb">Latest - Oldest</div>
                      <div className="rating-main-babb rating-main-babc">
                        All Categories
                      </div>
                      <div className="rating-main-babb rating-main-babd">
                        All Ratings
                      </div>
                      <div className="rating-main-babe">
                        <button className="btn btn-form">Apply</button>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                {/* user Reviews */}
                <div className="rating-main-bb">
                  <ShadowLayout styleLy={styleLay}>
                    <div className="rating-main-bbcMIs">
                      <ImgWithSideCaption
                        img={userImg}
                        styImg={styImg}
                        link="/user"
                        title="Bandhul Bharti"
                      >
                        <span className="rating-main-bba">Musician</span>
                      </ImgWithSideCaption>
                      {/* rating timing */}
                      <span className="rating-main-bbb">
                        <i>Visiter</i>
                        <span>15 min ago</span>
                      </span>
                    </div>
                    {/* rating */}
                    <div className="product-d-menu-aa-bbc">
                      <img src={star} alt="" />
                      <img src={star} alt="" />
                      <img src={star} alt="" />
                      <img src={star} alt="" />
                      <img src={starColored} alt="" />
                    </div>
                    <p className="product-d-menu-aa-bbd">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Accusamus aut a suscipit voluptates exercitationem saepe
                      vel dolorem asperiores, eligendi voluptatum eveniet
                      voluptatem Lorem ipsum, dolor sit amet consectetur
                      adipisicing elit.
                    </p>
                    {/* agree, disagree, edit and delete section */}

                    <div className="product-d-menu-aa-bbea">
                      {/* agree */}
                      <ul>
                        <li>
                          <img src={likeImg} alt="" />
                          <span>15 agree</span>
                        </li>
                        <li>
                          <img src={dislikeImg} alt="" />
                          <span>15 disagree</span>
                        </li>
                      </ul>
                    </div>
                    <div className="product-d-menu-aa-bbeb">
                      <button className="product-d-menu-aa-bbeba">Edit</button>
                      <button>Delete</button>
                    </div>
                  </ShadowLayout>
                </div>
              </section>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="about">
            <Accordion.Header>About</Accordion.Header>
            <Accordion.Body className="product-rr-sm-body-b">
              <section className="rating-main-b product-about-sm-a">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Assumenda aliquam saepe eos doloribus incidunt quae cumque
                nobis? Voluptate sunt magnam iste quisquam nulla sit similique
                impedit soluta, facere saepe sapiente quo, sequi ipsam animi, ea
                voluptatem perspiciatis dolor dolorum! Aperiam?
              </section>
              <div className="product-about-b product-about-sm-b">
                <h3 className="product-about-aa mt-1">Photos & Videos</h3>
                <div className="product-about-ba product-d-menu-a">
                  <div className="product-about-bab">
                    <img src={taj} alt="" />
                  </div>
                  <div className="product-about-bab">
                    <img src={taj} alt="" />
                  </div>
                  <div className="product-about-bab">
                    <img src={taj} alt="" />
                  </div>
                  <div className="product-about-bab">
                    <img src={taj} alt="" />
                  </div>
                  <div className="product-about-bab">
                    <img src={taj} alt="" />
                  </div>
                  <div className="product-about-bab">
                    <img src={taj} alt="" />
                  </div>
                  <div className="product-about-bab">
                    <img src={taj} alt="" />
                  </div>
                  <div className="product-about-bab">
                    <img src={taj} alt="" />
                  </div>
                  <div className="product-about-bab">
                    <img src={taj} alt="" />
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </section>
    </>
  );
};

const styImg = {
  width: "30px",
};
const styleLay = {
  padding: "12px 18px",
  minHeight: "195px",
  position: "relative",
};

export default ProductAboutBelow767;

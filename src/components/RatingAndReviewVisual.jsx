import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import ProductTitle from "./ProductTitle";
import filterImg from "../img/rating-filter.png";
import RatingAndReviewUpdate from "./RatingAndReviewModelUpdate";
import DropDownSelector from "./reviewFilter/latestOldest";
import AllCategoryOption from "./reviewFilter/allCategory";
import RatingFilter from "./reviewFilter/ratingFilter";
import ShadowLayout from "./ShadowLayout";
import ImgWithSideCaption from "./ImgWithSideCaption";
import StarRatingProductMain from "./StarRatingProductMain";
import ReviewAgreeAndDisagree from "./ReviewAgreeAndDisagree";
import useGetCurrentProduct from "../utils/ownHooks/useGetCurrentProduct";
import {
  useDeleteRatingMutation,
  useGetFilteredRatingMutation,
} from "../slices/ratingApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setRatings } from "../slices/ratingSlice";
import useGetRatingAndReview from "../utils/ownHooks/useGetRatingAndReview";
import useRemoveReview from "../utils/ownHooks/useRemoveReview";
import { Link, Outlet, useLocation } from "react-router-dom";
import useCurrentLocationSlug from "../utils/ownHooks/useCurrentLocationSlug";

const RatingAndReviewVisual = ({ location, avgRating }) => {
  const [currentRating, setCurrentRating] = useState();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  /////////////////////////////////////////////////////////////////////////
  ////----- Method which get ranting and review as component --- //////////
  ///// --- load of current product ---///////////////////////////////////
  //////////////////////////////////////////////////////////////////////

  useGetRatingAndReview(0, 10, location);

  //////////////////////////////////////////////////
  ////////----- get the current product ---////////
  ////////////////////////////////////////////////
  const currentProduct = useGetCurrentProduct(location);

  //////////////////////////////////////////////////
  /////////----- remove review method ---//////////
  ////////////////////////////////////////////////
  const deleteRating = useRemoveReview(location);

  //////////////////////////////////////////////////
  /////////----- remove review method ---//////////
  ////////////////////////////////////////////////
  const currentLocation = useCurrentLocationSlug();
  console.log(currentLocation);

  ///////////////////////////////////////////////////////
  /////////----- Filter review menagement ---//////////
  ////////////////////////////////////////////////////

  const [getFilteredRating, { isLoading: filteredLoading }] =
    useGetFilteredRatingMutation();
  const [selectedOption, setSelectedOption] = useState("latest - oldest");
  const [selectedCategoryOption, setSelectedCategoryOption] = useState("");
  const [ratingSelectedOption, setRatingSelectedOption] = useState("");

  const handleReviewFilter = async () => {
    try {
      let query = `page=0&&limit=10&&productSlug=${location}`;
      if (selectedOption === "oldest - latest") {
        query = `${query}&&sort=-createdAt`;
      }
      if (selectedCategoryOption) {
        query = `${query}&&ratingAs=${selectedCategoryOption}`;
      }
      if (ratingSelectedOption) {
        query = `${query}&&rating[lte]=${ratingSelectedOption}`;
      }

      const res = await getFilteredRating({ query }).unwrap();
      if (res.status === "success") {
        dispatch(setRatings(res.data.reviews));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //////////////////////////////////////////////////
  ///----- update model show and hide state ---////
  ////////////////////////////////////////////////

  const handleClose = () => setShow(false);
  const handleShow = (rat) => {
    setCurrentRating(rat);
    setShow(true);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <RatingAndReviewUpdate
          handleClose={handleClose}
          product={currentProduct}
          currentRating={currentRating}
          averageRating={avgRating}
        />
      </Modal>
      <section className="rating-main-b">
        {/* reviews section */}
        <div className="rating-main-aa color-yellow-dark ">
          <div className="row align-items-center">
            <h4 className="col-lg-6 col-md-6 col-sm-6 col-4 m-0 rating-mail-a">
              Reviews
            </h4>
            <div className="col-lg-6 col-md-6 col-sm-6 col-8">
              <ul className="row r-filter-link">
                <li className="col-lg-3 col-3">
                  <Link
                    to={`/product/${currentProduct?.productNameSlug}`}
                    className={`${
                      currentLocation === "oldest" ||
                      currentLocation === "positive" ||
                      currentLocation === "negative"
                        ? ""
                        : "active-filter"
                    }`}
                  >
                    Latest
                  </Link>
                </li>
                <li className="col-lg-3 col-3">
                  <Link
                    className={`${
                      currentLocation === "oldest" ? "active-filter" : ""
                    }`}
                    to={`/product/${currentProduct?.productNameSlug}/review/oldest`}
                  >
                    Oldest
                  </Link>
                </li>
                <li className="col-lg-3 col-3">
                  <Link
                    className={`${
                      currentLocation === "positive" ? "active-filter" : ""
                    }`}
                    to={`/product/${currentProduct?.productNameSlug}/review/positive`}
                  >
                    Positive
                  </Link>
                </li>
                <li className="col-lg-3 col-3">
                  <Link
                    className={`${
                      currentLocation === "negative" ? "active-filter" : ""
                    }`}
                    to={`/product/${currentProduct?.productNameSlug}/review/negative`}
                  >
                    Negative
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Outlet />
      </section>
    </>
  );
};

export default RatingAndReviewVisual;

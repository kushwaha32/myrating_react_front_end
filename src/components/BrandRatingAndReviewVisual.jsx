import useGetRatingAndReview from "../utils/ownHooks/useGetRatingAndReview";
import { Link, Outlet } from "react-router-dom";
import useCurrentLocationSlug from "../utils/ownHooks/useCurrentLocationSlug";

const BrandRatingAndReviewVisual = ({ location }) => {
  /////////////////////////////////////////////////////////////////////////
  ////----- Method which get ranting and review as component --- //////////
  ///// --- load of current product ---///////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  useGetRatingAndReview(0, 10, location);

  //////////////////////////////////////////////////
  /////////----- remove review method ---//////////
  ////////////////////////////////////////////////
  const currentLocation = useCurrentLocationSlug();

  return (
    <>
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
                    to={`/top-brand/${location}`}
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
                    to={`/top-brand/${location}/review/oldest`}
                  >
                    Oldest
                  </Link>
                </li>
                <li className="col-lg-3 col-3">
                  <Link
                    className={`${
                      currentLocation === "positive" ? "active-filter" : ""
                    }`}
                    to={`/top-brand/${location}/review/positive`}
                  >
                    Positive
                  </Link>
                </li>
                <li className="col-lg-3 col-3">
                  <Link
                    className={`${
                      currentLocation === "negative" ? "active-filter" : ""
                    }`}
                    to={`/top-brand/${location}/review/negative`}
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

export default BrandRatingAndReviewVisual;

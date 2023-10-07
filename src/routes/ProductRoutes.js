import { Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";

// Lazy load the route components
const ProductDetails = lazy(() => import("../screens/ProductDetails"));
const ProductMain = lazy(() => import("../components/ProductMain"));
const ProductRating = lazy(() => import("../components/ProductRating"));
const ProductAbout = lazy(() => import("../components/ProductAbout"));
const AllProductImages = lazy(() => import("../components/AllProductImages"));
const LatestRatingReviews = lazy(() =>
  import("../components/ratingReviewFilter/Latest")
);
const OldestReviewRating = lazy(() =>
  import("../components/ratingReviewFilter/Oldest")
);
const PositiveRatingReview = lazy(() =>
  import("../components/ratingReviewFilter/Positive")
);
const NegativeRatingReviews = lazy(() =>
  import("../components/ratingReviewFilter/Negative")
);

const ProductRoutes = () => {
  return (
    <Route
      path="/product/:productName"
      element={
        <Suspense
          fallback={
            <div
              style={{ width: "100%", height: "100vh", position: "relative" }}
            >
              <p
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                My Ratings
              </p>
            </div>
          }
        >
          <ProductDetails />
        </Suspense>
      }
    >
      <Route
        path=""
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ProductMain />
          </Suspense>
        }
      >
        <Route
          path=""
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProductRating />
            </Suspense>
          }
        >
          {/* /////////////////////////////////////////////////////////////////// */}
          {/* //////////////---- Latest filtered rating route ----/////////////// */}
          {/* /////////////////////////////////////////////////////////////////// */}
          <Route
            index
            element={
              <Suspense fallback={<div>loading..l</div>}>
                <LatestRatingReviews />
              </Suspense>
            }
          />

          {/* /////////////////////////////////////////////////////////////////// */}
          {/* ///////////////----  Oldest foltered rating route ----///////////// */}
          {/* /////////////////////////////////////////////////////////////////// */}
          <Route
            path="review/oldest"
            element={
              <Suspense fallback={<div>loading..l</div>}>
                <OldestReviewRating />
              </Suspense>
            }
          />

          {/* /////////////////////////////////////////////////////////////////// */}
          {/* //////////////---- Positive filtered rating route ----///////////// */}
          {/* /////////////////////////////////////////////////////////////////// */}
          <Route
            path="review/positive"
            element={
              <Suspense fallback={<div>loading..l</div>}>
                <PositiveRatingReview />
              </Suspense>
            }
          />

          {/* /////////////////////////////////////////////////////////////////// */}
          {/* //////////////---- Negative filtered rating route ----///////////// */}
          {/* /////////////////////////////////////////////////////////////////// */}
          <Route
            path="review/negative"
            element={
              <Suspense fallback={<div>loading..l</div>}>
                <NegativeRatingReviews />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="about"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProductAbout />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="images"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AllProductImages />
          </Suspense>
        }
      />
    </Route>
  );
};

export default ProductRoutes;

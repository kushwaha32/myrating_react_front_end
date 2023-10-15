import { Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import CommonPageLoader from "../components/commonPageLoader/commonPageLoader";

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
        <Suspense fallback={<CommonPageLoader />}>
          <ProductDetails />
        </Suspense>
      }
    >
      <Route
        path=""
        element={
          <Suspense fallback={<CommonPageLoader />}>
            <ProductMain />
          </Suspense>
        }
      >
        <Route
          path=""
          element={
            <Suspense fallback={<CommonPageLoader />}>
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
              <Suspense fallback={<CommonPageLoader />}>
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
              <Suspense fallback={<CommonPageLoader />}>
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
              <Suspense fallback={<CommonPageLoader />}>
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
              <Suspense fallback={<CommonPageLoader />}>
                <NegativeRatingReviews />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="about"
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <ProductAbout />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="images"
        element={
          <Suspense fallback={<CommonPageLoader />}>
            <AllProductImages />
          </Suspense>
        }
      />
    </Route>
  );
};

export default ProductRoutes;

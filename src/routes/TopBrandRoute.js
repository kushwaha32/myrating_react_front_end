import { Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const BrandLatestRatingReviews = lazy(() =>
  import("../components/BrandRatingReviewFilter/Latest")
);
const OldestReviewRating = lazy(() =>
  import("../components/BrandRatingReviewFilter/Oldest")
);
const NegativeRatingReviews = lazy(() =>
  import("../components/BrandRatingReviewFilter/Negative")
);
const PositiveRatingReview = lazy(() =>
  import("../components/BrandRatingReviewFilter/Positive")
);

const BrandRatingAndReviews = lazy(() =>
  import("../components/BrandRatingAndReviews")
);
const ProductDetails = lazy(() => import("../screens/ProductDetails"));
const TopBrands = lazy(() => import("../components/TopBrands"));
const BrandBasedProducts = lazy(() =>
  import("../components/BrandBasedProducts")
);
const BrandBasedAllProducts = lazy(() =>
  import("../components/BrandBasedAllProducts")
);

const TopBrandsRoute = () => {
  return (
    <Route
      path="/top-brand/:brandName"
      element={
        <Suspense fallback={<>loading..</>}>
          <ProductDetails />
        </Suspense>
      }
    >
      <Route
        path=""
        element={
          <Suspense fallback={<>loading...</>}>
            <TopBrands />
          </Suspense>
        }
      >
        <Route
          path=""
          element={
            <Suspense fallback={<>loading...</>}>
              <BrandRatingAndReviews />
            </Suspense>
          }
        >
          {/* /////////////////////////////////////////////////////// */}
          {/* /////////////---- Latest Reviews Route ----//////////// */}
          {/* /////////////////////////////////////////////////////// */}
          <Route
            path=""
            element={
              <Suspense fallback={<>loading...</>}>
                <BrandLatestRatingReviews />
              </Suspense>
            }
          />

          {/* /////////////////////////////////////////////////////// */}
          {/* /////////////---- Oldest Reviews Route ----//////////// */}
          {/* /////////////////////////////////////////////////////// */}
          <Route
            path="review/oldest"
            element={
              <Suspense fallback={<>loading...</>}>
                <OldestReviewRating />
              </Suspense>
            }
          />

          {/* /////////////////////////////////////////////////////// */}
          {/* /////////////---- Negative Reviews Route ----//////////// */}
          {/* /////////////////////////////////////////////////////// */}
          <Route
            path="review/negative"
            element={
              <Suspense fallback={<>loading...</>}>
                <NegativeRatingReviews />
              </Suspense>
            }
          />

          {/* /////////////////////////////////////////////////////// */}
          {/* /////////////---- Positive Reviews Route ----//////////// */}
          {/* /////////////////////////////////////////////////////// */}
          <Route
            path="review/positive"
            element={
              <Suspense fallback={<>loading...</>}>
                <PositiveRatingReview />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="products"
          element={
            <Suspense fallback={<>loading...</>}>
              <BrandBasedAllProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/north-indian-dish`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/south-indian-dish`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/sweet-dish`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/vegeterian-food`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/non-vegeterian-food`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/beverage`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/chineese-foods`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/north-indian-foods`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/sea-foods`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/room`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/tea`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/mineral-water`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/coffee`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/fast-foods`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/healthy-food`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/other`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/tour-packages`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/bus-service`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/car-service`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/taxi-service`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/tour-guide-service`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/city`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/historical-monuments`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/tourist-places`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/attractions`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/beaches`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
        <Route
          path={`products/religious-places`}
          element={
            <Suspense fallback={<>loading..</>}>
              <BrandBasedProducts />
            </Suspense>
          }
        />
      </Route>
    </Route>
  );
};

export default TopBrandsRoute;

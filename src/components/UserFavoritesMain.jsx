import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import UserAndProductNavigationBtn from "./UserAndProductNavigationBtn";
import "../assets/css/user.css";
import { useDispatch, useSelector } from "react-redux";
import { useGetFavouritesProductsMutation } from "../slices/productsApiSlice";
import { setProducts } from "../slices/productSlice";

const UserFavoritesMain = (props) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const [userSlug, setUserSlug] = useState(userInfo?.user?._id);
  const location = useLocation();
  const slugUrl = `/user/${userSlug}/favorites`;
  const locationArr = location.pathname.split("/");
  const brandId = locationArr[2];

  const dispatch = useDispatch();
  const [getFaouriteProducts, { isLoading }] =
    useGetFavouritesProductsMutation();

  useEffect(() => {
    getProduct();
  }, [location]);

  const getProduct = async () => {
    try {
      const res = await getFaouriteProducts({
        user: brandId,
      }).unwrap();

      if (res.status === "success") {
        dispatch(
          setProducts({
            ...products,
            favorites: res?.data?.favorites.map((el) => el.product),
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section className="product-d-menu text-capitalize user-favorites">
        <h3 className="user-favorites-a">Favourites</h3>
        <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}`}
          slugUrlT={`${slugUrl}/`}
          title="All Favourites"
        />
        {products?.favorites?.filter(
          (curEl) => curEl.categorySlug === "historical-monuments"
        ).length > 0 && (
          <UserAndProductNavigationBtn
            slugUrlO={`${slugUrl}/historical-monuments`}
            slugUrlT={`${slugUrl}/historical-monuments`}
            title="historical monuments"
          />
        )}

        {products?.favorites?.filter(
          (curEl) => curEl.categorySlug === "tourist-places"
        ).length > 0 && (
          <UserAndProductNavigationBtn
            slugUrlO={`${slugUrl}/tourist-places`}
            slugUrlT={`${slugUrl}/tourist-places/`}
            title="tourist places"
          />
        )}

        {products?.favorites?.filter(
          (curEl) => curEl.categorySlug === "attractions"
        ).length > 0 && (
          <UserAndProductNavigationBtn
            slugUrlO={`${slugUrl}/attractions`}
            slugUrlT={`${slugUrl}/attractions/`}
            title="attractions"
          />
        )}

        {products?.favorites?.filter((curEl) => curEl.categorySlug === "beaches")
          .length > 0 && (
          <UserAndProductNavigationBtn
            slugUrlO={`${slugUrl}/beaches`}
            slugUrlT={`${slugUrl}/beaches/`}
            title="beaches"
          />
        )}

        {products?.favorites?.filter(
          (curEl) => curEl.categorySlug === "religious-places"
        ).length > 0 && (
          <UserAndProductNavigationBtn
            slugUrlO={`${slugUrl}/religious-places`}
            slugUrlT={`${slugUrl}/religious-places/`}
            title="religious places"
          />
        )}

        {products?.favorites?.filter((curEl) => curEl.categorySlug === "other")
          .length > 0 && (
          <UserAndProductNavigationBtn
            slugUrlO={`${slugUrl}/other`}
            slugUrlT={`${slugUrl}/other/`}
            title="other"
          />
        )}
      </section>
      <section className="product-d-detail">
        <Outlet />
      </section>
    </>
  );
};

export default UserFavoritesMain;

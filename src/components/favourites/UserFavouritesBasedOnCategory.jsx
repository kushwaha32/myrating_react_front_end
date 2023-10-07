import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetFavouritesProductsMutation } from "../../slices/productsApiSlice";
import OwnerProductBluePrint from "../business/OwnerProductBluePrint";

const UserFavouritesBasedOnCategory = () => {
  const [favoritesProducts, setFavoritesProducts] = useState([]);
  const location = useLocation();
  const locationArr = location.pathname.split("/");
  let catSlug = locationArr[4];
  const {products} = useSelector(state => state.products);

  const [getFaouriteProducts, { isLoading }] =
    useGetFavouritesProductsMutation();

  useEffect(() => {
    if (!catSlug) {
      setFavoritesProducts(products?.favorites);
    } else {
      setFavoritesProducts(
        products?.favorites?.filter((el) => el?.categorySlug === catSlug)
      );
    }
  }, [location.pathname]);

 

  return (
    <div className="historical-monuments">
      <h1 className="historical-monuments-a text-capitalize">
        {!catSlug ? "All Favourites" : catSlug.split("-").join(" ")}
      </h1>
      {isLoading ? (
        <p className="no-products">loading...</p>
      ) : (
        <>
          {favoritesProducts?.length > 0 ? (
            <>
              {favoritesProducts?.map((pro) => (
                <OwnerProductBluePrint key={pro._id} product={pro} />
              ))}
            </>
          ) : (
            <p className="no-products">Sorry There is no Product</p>
          )}
        </>
      )}
    </div>
  );
};

export default UserFavouritesBasedOnCategory;

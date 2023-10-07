import { useNavigate } from "react-router-dom";
import brandImg from "../img/myrating2.png";
import searchIcon from "../img/search-icon.png";
import SearchSuper from "./searchSuper";
import "../assets/css/filterArea.css";
import { useState } from "react";
import ProductDistanceFrom from "./ProductDistanceFrom";
import ProductFilterWithCat from "./ProductFilterWithCat";
import {
  useGetFilteredProductsMutation,
  useGetFilteredProductsWithBrandMutation,
} from "../slices/productsApiSlice";
import { useDispatch } from "react-redux";
import { setFilterProducts } from "../slices/filterProductSlice";

const SearchArea = () => {
  const [selectedDistance, setSelectedDistance] = useState({});
  const [selectedCat, setSelectedCat] = useState();
  const [searchValue, setSearchVal] = useState();
  const [cityLoading, setCityLoading] = useState();

  // get location
  let [lat, lng] =  JSON.parse(localStorage.getItem("location"))?.coordinates || ["" , ""];
  const [getFilteredProductWithBrand, { isLoading }] =
    useGetFilteredProductsWithBrandMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle search
  const handleSearch = async () => {
    let query = { page: 1, limit: 6 };
    //  address
    if (selectedDistance?.cordinate) {
      query = {
        ...query,
        distance: selectedDistance?.cordinate,
        latlng: `${lat},${lng}`,
      };
    }
    if (selectedDistance?.city) {
      query = { ...query, city: selectedDistance?.city };
      delete query.cordinate;
      delete query.latlng;
    }
    if (selectedCat) {
      query = { ...query, subCategory: selectedCat.id };
    }
    if (searchValue) {
      query = { ...query, searchField: searchValue };
    }

    const res = await getFilteredProductWithBrand({
      ...query,
    }).unwrap();

    if (res.status === "success") {
      dispatch(setFilterProducts(res.products));
      localStorage.setItem("query", JSON.stringify({...query, subCategory: selectedCat}));
      navigate("/explore-product");
    }
  };

  // handle search through enter key
  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      if (selectedDistance || selectedCat || searchValue) {
        handleSearch();
      }
    }
  };
  // window.addEventListener("keydown", handleEnterPress);
  return (
    <>
      {(isLoading || cityLoading) && (
        <div className="loading_filter">
          <div
            className="spinner-border"
            style={{ position: "absolute", top: "50%", left: "50%" }}
          ></div>
        </div>
      )}

      <div className="brand text-center">
        <img src={brandImg} className="mt-3 brand-size" alt="" />
      </div>

      <div className="search-container d-flex align-items-center mt-4 justify-content-center">
        <div className="search-container-left d-flex justify-content-between align-items-center">
          <SearchSuper cclass="all-btn">
            <ProductFilterWithCat
              selectedCat={selectedCat}
              setSelectedCat={setSelectedCat}
            />
          </SearchSuper>
          <span className="mx-1"> </span>
          <SearchSuper cclass="near-btn">
            <ProductDistanceFrom
              selectedDistance={selectedDistance}
              setSelectedDistance={setSelectedDistance}
              selectedCat={selectedCat}
              setCityLoading={setCityLoading}
            />
          </SearchSuper>
        </div>
        <span className="mx-2"> </span>
        <SearchSuper cclass="search-width">
          <img
            src={searchIcon}
            className="search-img"
            alt=""
            onClick={handleSearch}
          />
          <input
            type="text"
            id="search"
            value={searchValue}
            onChange={(e) => setSearchVal(e.target.value)}
            className="search-input"
            placeholder="Search Places...."
            onKeyDown={handleEnterPress}
          />
        </SearchSuper>
      </div>
    </>
  );
};

export default SearchArea;

import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import searchIcon from "../img/search-icon.png";
import "../assets/css/filterLocation.css";
import ProductDistanceNumber from "./ProductDistanceNumber";
import telegram from "../img/telegram.png";
import { useGetCityMutation } from "../slices/searchCitySlice";
import { useGetFilteredProductsWithBrandMutation } from "../slices/productsApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilterProducts } from "../slices/filterProductSlice";

const ProductDistanceFrom = ({
  selectedDistance,
  setSelectedDistance,
  selectedCat,
  setCityLoading
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [cityHistory, setCityHistory] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [getCity, { isLoading: cityLoading }] = useGetCityMutation();
  // handle the whether the distance box is checked
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (isChecked) {
      delete selectedDistance?.cordinate;
    }
  };

  // handle city
  const handleCity = (e) => {
    if (!isChecked) {
      setSelectedDistance({ city: e.target.value });
      delete selectedDistance.cordinate;
    } else {
      setSelectedDistance({ city: "" });
    }
  };
  // get city history on component load
  useEffect(() => {
    handleGetCity();
  }, []);
  // get city
  const handleGetCity = async () => {
    try {
      const res = await getCity().unwrap();
      if (res.status === "success") {
        setCityHistory(res.data.searchCity);
      }
    } catch (error) {}
  };

  // handle city with enter preess
  const [getFilteredProductWithBrand, { isLoading }] =
    useGetFilteredProductsWithBrandMutation();

  const handleCityByEnter = async (e) => {
    try {
      if (e.key === "Enter") {
        setCityLoading(true)
        let newQuery = selectedCat ? { subCategory: selectedCat?.id } : {};
        const res = await getFilteredProductWithBrand({
          ...newQuery,
          city: e.target.value,
        }).unwrap();
        console.log(res);
        if (res.status === "success") {
          dispatch(setFilterProducts(res.products));
          localStorage.setItem(
            "query",
            JSON.stringify({ city: e.target.value, subCategory: selectedCat })
          );
          
          navigate("/explore-product");
          setCityLoading(false)
        }
      }
    } catch (error) { setCityLoading(false)}
  };
  const handleSWithButton = async () => {
    try {
      let newQuery = selectedCat ? { subCategory: selectedCat?.id } : {};
      setCityLoading(true)
      const res = await getFilteredProductWithBrand({
        ...newQuery,
        city: selectedDistance.city,
      }).unwrap();
      console.log(res);
      if (res.status === "success") {
        dispatch(setFilterProducts(res.products));
        localStorage.setItem(
          "query",
          JSON.stringify({ city: selectedDistance.city, subCategory: selectedCat })
        );
        navigate("/explore-product");
        setCityLoading(false)
      }
    } catch (error) {setCityLoading(false)}
  };
  return (
    <div style={{ position: "relative" }} className="near-f">
      <Dropdown
        autoClose={"outside"}
        show={isDropdownOpen}
        onToggle={handleToggleDropdown}
      >
        <Dropdown.Toggle
          className="rating-main-babb dropdown-toggle text-capitalize distance-style"
          variant="success"
          id="dropdown-basic"
          as="button"
        >
          {selectedDistance?.cordinate ? (
            `${selectedDistance?.cordinate} km`
          ) : selectedDistance?.city ? (
            <p style={{ margin: "0" }} title={selectedDistance?.city}>
              {selectedDistance?.city?.length > 12
                ? `${selectedDistance?.city.slice(0, 12)}...`
                : selectedDistance?.city}
            </p>
          ) : (
            "Nearby Location"
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu className="near-main">
          <div className="near-place">
            <div className="near-place-a">
              <button onClick={handleSWithButton}>
                <img src={searchIcon} alt="" />
              </button>
              <input
                type="text"
                placeholder="Search Location"
                value={selectedDistance.city}
                onChange={handleCity}
                onKeyDown={handleCityByEnter}
              />
            </div>
            <div className="near-place-b">
              <div className="near-place-check">
                <input
                  type="checkbox"
                  id="nearId"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="nearId">Nearby my location</label>
              </div>
              <ProductDistanceNumber
                selectedNumber={selectedDistance}
                setSelectedNumber={setSelectedDistance}
                isChecked={isChecked}
              />
            </div>
            <hr />
            <div className="recent-history">
              <h5>Recent Locations</h5>
              {cityHistory?.length > 0 &&
                cityHistory?.map((city) => (
                  <p className="text-capitalize">
                    <img src={telegram} alt="" />
                    {city?.city}
                  </p>
                ))}
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ProductDistanceFrom;

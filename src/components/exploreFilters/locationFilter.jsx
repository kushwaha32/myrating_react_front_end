import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import searchIcon from "../../img/search-icon.png";
import "../../assets/css/filterLocation.css";
import ProductDistanceNumber from "../ProductDistanceNumber";
import telegram from "../../img/telegram.png";
import { useDispatch } from "react-redux";
import { useGetFilteredProductsWithBrandMutation } from "../../slices/productsApiSlice";
import { setFilterProducts } from "../../slices/filterProductSlice";
import { useGetCityMutation } from "../../slices/searchCitySlice";

const LocationFilter = ({
  selectedDistance,
  setSelectedDistance,
  query,
  setQuery,
  setSearchLoading
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [cityHistory, setCityHistory] = useState([]);
  const [getCity, { isLoading: cityLoading }] = useGetCityMutation();

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const dispatch = useDispatch();
  const [getFilteredProductWithBrand, { isLoading }] =
    useGetFilteredProductsWithBrandMutation();

  // handle the whether the distance box is checked
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (!event.target.checked) {
      delete selectedDistance?.cordinate;
      delete query?.distance;
      delete query?.latlng;
    } else {
      delete selectedDistance?.city;
      delete query?.city;
    }
  };

  // handle city
  const handleCity = (e) => {
    if (!isChecked) {
      setSelectedDistance({ city: e.target.value });
      delete selectedDistance.cordinate;
      if (Object.keys(query).length > 0) {
        setQuery({ ...query, city: e.target.value });
        delete query?.distance;
        delete query?.latlng;
      } else {
        setQuery({ city: e.target.value });
      }
    } else {
      setSelectedDistance({ city: "" });
      delete query?.city;
    }
  };
  // city
  const handleEnterPress = async (e) => {
    try {
      if (e.key === "Enter") {
        setSearchLoading(true)
        const res = await getFilteredProductWithBrand({
          ...query,
        }).unwrap();

        if (res.status === "success") {

          dispatch(setFilterProducts(res.products));
          setSearchLoading(false)
        }
      }
    } catch (error) {}
  };
  const handleGetCity = async() => {
    try {
      setSearchLoading(true)
      const res = await getFilteredProductWithBrand({
        ...query,
      }).unwrap();

      if (res.status === "success") {
        dispatch(setFilterProducts(res.products));
        setSearchLoading(false)
      }
    } catch (error) {
      
    }
  }

   // get city history on component load
   useEffect(() => {
    handleGetCityHi();

  }, []);
  // get city
  const handleGetCityHi = async () => {

    try {
      const res = await getCity().unwrap();
      console.log(res);
      if (res.status === "success") {
        setCityHistory(res.data.searchCity);
      }
    } catch (error) {}
  };
  return (
    <div className="filter-left-b">
      <h4 className="filter-left-ba">Location</h4>

      <div style={{ position: "relative" }} className="near-f near-f-a">
        <Dropdown
          autoClose={"outside"}
          show={isDropdownOpen}
          onToggle={handleToggleDropdown}
        >
          <Dropdown.Toggle
            className="filter-left-bb dropdown-toggle btn btn-success"
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

          <Dropdown.Menu>
            <div className="near-place place-explore">
              <div className="near-place-a">
                <button onClick={handleGetCity}>
                  <img src={searchIcon} alt="" />
                </button>
                <input
                  type="text"
                  placeholder="Search Location"
                  value={selectedDistance.city}
                  onChange={handleCity}
                  onKeyDown={handleEnterPress}
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
                  query={query}
                  setQuery={setQuery}
                  setSearchLoading={setSearchLoading}
                
                />
              </div>
              <hr />
              <div className="recent-history">
                <h5 className="mb-3">Recent Locations</h5>
                {cityHistory?.length > 0 &&
                cityHistory?.map((city) => (
                  <p className="text-capitalize mb-2">
                    <img src={telegram} alt="" />
                    {city?.city}
                  </p>
                ))}
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default LocationFilter;

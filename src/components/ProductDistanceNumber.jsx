import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import searchIcon from "../img/search-icon.png";
import "../assets/css/filterLocation.css";
import { useGetFilteredProductsWithBrandMutation } from "../slices/productsApiSlice";
import { setFilterProducts } from "../slices/filterProductSlice";
import { useDispatch } from "react-redux";

const ProductDistanceNumber = ({
  selectedNumber,
  setSelectedNumber,
  isChecked,
  query,
  setQuery,
  setSearchLoading
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const [getFilteredProductWithBrand, { isLoading }] =
    useGetFilteredProductsWithBrandMutation();

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectOption = async (option) => {
    try {
      if (isChecked) {
        setSelectedNumber(option);
        delete selectedNumber.city;
        if (query && !isLoading) {
          // get the current user coordinate
          let [lat, lng] = JSON.parse(
            localStorage.getItem("location")
          ).coordinates;

          if (Object.keys(query).length > 0) {
            setQuery({
              ...query,
              distance: option.cordinate,
              latlng: `${lat},${lng}`,
            });
            delete query?.city;
            setSearchLoading(true)
            const res = await getFilteredProductWithBrand({
              ...query,
              distance: option.cordinate,
              latlng: `${lat},${lng}`,
            }).unwrap();

            if (res.status === "success") {
              dispatch(setFilterProducts(res.products));
              setSearchLoading(false)
            }
          } else {
            setQuery({ distance: option.cordinate, latlng: `${lat},${lng}` });
            delete query?.city;
            setSearchLoading(true)
            const res = await getFilteredProductWithBrand({
              distance: option.cordinate,
              latlng: `${lat},${lng}`,
            }).unwrap();

            if (res.status === "success") {
              dispatch(setFilterProducts(res.products));
              setSearchLoading(false)
            }
          }
        }
      }
      setIsDropdownOpen(false);
    } catch (error) {}
  };

  return (
    <div style={{ position: "relative" }} className="near-f">
      <Dropdown
        autoClose={"outside"}
        show={isDropdownOpen}
        onToggle={handleToggleDropdown}
      >
        <Dropdown.Toggle
          className="location-number-a"
          variant="success"
          id="dropdown-basic"
          as="button"
        >
          {selectedNumber?.cordinate ? (
            <span>{`${selectedNumber.cordinate} km`}</span>
          ) : (
            <span> km</span>
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu className="location-number-b">
          <Dropdown.Item
            className="text-capitalize"
            as="button"
            onClick={() => handleSelectOption({ cordinate: 1 })}
          >
            <span className="location-number-c">
              <input type="radio" name="number-d" id="km1" />
            </span>
            <label htmlFor="km1">
              <span className="location-number-c">1</span> <span>km</span>
            </label>
          </Dropdown.Item>
          <Dropdown.Item
            className="text-capitalize"
            as="button"
            onClick={() => handleSelectOption({ cordinate: 2 })}
          >
            <span className="location-number-c">
              <input type="radio" name="number-d" id="km2" />
            </span>
            <label htmlFor="km2">
              <span className="location-number-c">2</span> <span>km</span>
            </label>
          </Dropdown.Item>
          <Dropdown.Item
            className="text-capitalize"
            as="button"
            onClick={() => handleSelectOption({ cordinate: 3 })}
          >
            <span className="location-number-c">
              <input type="radio" name="number-d" id="km3" />
            </span>
            <label htmlFor="km3">
              <span className="location-number-c">3</span> <span>km</span>
            </label>
          </Dropdown.Item>
          <Dropdown.Item
            className="text-capitalize"
            as="button"
            onClick={() => handleSelectOption({ cordinate: 4 })}
          >
            <span className="location-number-c">
              <input type="radio" name="number-d" id="km4" />
            </span>
            <label htmlFor="km4">
              <span className="location-number-c">4</span> <span>km</span>
            </label>
          </Dropdown.Item>
          <Dropdown.Item
            className="text-capitalize"
            as="button"
            onClick={() => handleSelectOption({ cordinate: 5 })}
          >
            <span className="location-number-c">
              <input type="radio" name="number-d" id="km5" />
            </span>
            <label htmlFor="km5">
              <span className="location-number-c">5</span> <span>km</span>
            </label>
          </Dropdown.Item>
          <Dropdown.Item
            className="text-capitalize"
            as="button"
            onClick={() => handleSelectOption({ cordinate: 6 })}
          >
            <span className="location-number-c">
              <input type="radio" name="number-d" id="km6" />
            </span>
            <label htmlFor="km6">
              <span className="location-number-c">6</span> <span>km</span>
            </label>
          </Dropdown.Item>
          <Dropdown.Item
            className="text-capitalize"
            as="button"
            onClick={() => handleSelectOption({ cordinate: 7 })}
          >
            <span className="location-number-c">
              <input type="radio" name="number-d" id="km7" />
            </span>
            <label htmlFor="km7">
              {" "}
              <span className="location-number-c">7</span> <span>km</span>
            </label>
          </Dropdown.Item>
          <Dropdown.Item
            className="text-capitalize"
            as="button"
            onClick={() => handleSelectOption({ cordinate: 8 })}
          >
            <span className="location-number-c">
              <input type="radio" name="number-d" id="mk8" />
            </span>
            <label htmlFor="km8">
              {" "}
              <span className="location-number-c">8</span> <span>km</span>
            </label>
          </Dropdown.Item>
          <Dropdown.Item
            className="text-capitalize"
            as="button"
            onClick={() => handleSelectOption({ cordinate: 9 })}
          >
            <span className="location-number-c">
              <input type="radio" name="number-d" id="km9" />
            </span>
            <label htmlFor="km9">
              <span className="location-number-c">9</span> <span>km</span>
            </label>
          </Dropdown.Item>
          <Dropdown.Item
            className="text-capitalize"
            as="button"
            onClick={() => handleSelectOption({ cordinate: 10 })}
          >
            <span className="location-number-c">
              <input type="radio" name="number-d" id="km10" />
            </span>
            <label htmlFor="km10">
              <span className="location-number-c">10</span> <span>km</span>
            </label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ProductDistanceNumber;

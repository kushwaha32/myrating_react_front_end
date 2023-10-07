import Dropdown from "react-bootstrap/Dropdown";
import starGray from "../../img/star-gray.png";
import start from "../../img/star.png";
import searchIcon from "../../img/search-icon.png";
import telegram from "../../img/telegram.png";
import FilterRatingDropDown from "../FilterRatingDropDown";
import { useState } from "react";
import { useGetFilteredProductsWithBrandMutation } from "../../slices/productsApiSlice";
import { useDispatch } from "react-redux";
import { setFilterProducts } from "../../slices/filterProductSlice";

const RatingFilter = ({
  handleOptionValue,
  optionValue,
  query,
  setQuery,
  setSearchLoading,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const [getFilteredProductWithBrand, { isLoading }] =
    useGetFilteredProductsWithBrandMutation();
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectOption = async (el) => {
    try {
      handleOptionValue(el); // Handle option selection
      setIsDropdownOpen(false); // Close the Dropdown after selection

      // set the query
      setQuery({ ...query, "averageRating[lte]": el });

      setSearchLoading(true);
      const res = await getFilteredProductWithBrand({
        ...query,
        "averageRating[lte]": el,
      }).unwrap();

      if (res.status === "success") {
        dispatch(setFilterProducts(res.products));
        setSearchLoading(false);
      }
    } catch (error) {}
  };
  return (
    <div className="filter-left-b">
      <h4 className="filter-left-ba">Ratings</h4>
      <Dropdown
        autoClose={"outside"}
        show={isDropdownOpen}
        onToggle={handleToggleDropdown}
      >
        <Dropdown.Toggle
          className="filter-left-bb"
          variant="success"
          id="dropdown-basic"
        >
          {optionValue ? (
            `${optionValue} star`
          ) : (
            <>
              <img src={start} alt="rating img" className="star-drop-img" />{" "}
              <span>All Ratings</span>
            </>
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            className="text-capitalize"
            as="button"
            onClick={() => handleSelectOption(5)}
          >
            <FilterRatingDropDown starCount={5} />
          </Dropdown.Item>

          <Dropdown.Item
            className="text-capitalize"
            as="button"
            onClick={() => handleSelectOption(4)}
          >
            <FilterRatingDropDown starCount={4} />
          </Dropdown.Item>

          <Dropdown.Item
            className="text-capitalize"
            as="button"
            onClick={() => handleSelectOption(3)}
          >
            <FilterRatingDropDown starCount={3} />
          </Dropdown.Item>

          <Dropdown.Item
            className="text-capitalize"
            as="button"
            onClick={() => handleSelectOption(2)}
          >
            <FilterRatingDropDown starCount={2} />
          </Dropdown.Item>

          <Dropdown.Item
            className="text-capitalize"
            as="button"
            onClick={() => handleSelectOption(1)}
          >
            <FilterRatingDropDown starCount={1} />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default RatingFilter;

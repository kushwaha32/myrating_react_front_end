import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useGetFilteredProductsWithBrandMutation } from "../../slices/productsApiSlice";
import { useDispatch } from "react-redux";
import { setFilterProducts } from "../../slices/filterProductSlice";

const CategorySubCatDrop = ({
  handleOptionValue,
  optionValue,
  fields,
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
      setQuery({ ...query, subCategory: el._id });

      setSearchLoading(true);
      const res = await getFilteredProductWithBrand({
        ...query,
        subCategory: el._id,
      }).unwrap();

      if (res.status === "success") {
        dispatch(setFilterProducts(res.products));
        setSearchLoading(false);
      }
    } catch (error) {}
  };
  return (
    <div className="filter-left-b">
      <h4 className="filter-left-ba">Profiles</h4>
      <Dropdown
        autoClose={"outside"}
        show={isDropdownOpen}
        onToggle={handleToggleDropdown}
      >
        <Dropdown.Toggle
          className="filter-left-bb text-capitalize"
          variant="success"
          id="dropdown-basic"
        >
          {optionValue || "Select Profile"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {fields[0]?.subCategory?.map((el) => (
            <>
              <Dropdown.Item
                className="text-capitalize"
                as="button"
                key={el._id}
                onClick={() => handleSelectOption(el)}
              >
                {el.name}
              </Dropdown.Item>
            </>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default CategorySubCatDrop;

import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useGetFilteredProductsWithBrandMutation } from "../../slices/productsApiSlice";
import { useDispatch } from "react-redux";
import { setFilterProducts } from "../../slices/filterProductSlice";

const CategoryDropDown = ({
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
      setQuery({ ...query, category: el._id });

      setSearchLoading(true);
      const res = await getFilteredProductWithBrand({
        ...query,
        category: el._id,
      }).unwrap();

      if (res.status === "success") {
        dispatch(setFilterProducts(res.products));
        setSearchLoading(false);
      }
    } catch (error) {}
  };
  return (
    <div className="filter-left-b">
      <h4 className="filter-left-ba">Categories</h4>
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
          {optionValue || "Select Category"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {fields?.data?.industry?.length > 0 && (
            <>
              {" "}
              {fields?.data?.industry?.map((el) => (
                <>
                  <Dropdown.Item
                    className="text-capitalize"
                    as="button"
                    key={el?._id}
                    onClick={(e) => handleSelectOption(el)}
                  >
                    {el.name}
                  </Dropdown.Item>
                </>
              ))}
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default CategoryDropDown;

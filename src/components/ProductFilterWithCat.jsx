import React, { useState } from "react";
import { useGetBrandIndustryQuery } from "../slices/brandIndustryApiSlice";

const ProductFilterWithCat = ({ selectedCat, setSelectedCat }) => {
  const { data, isLoading, isError } = useGetBrandIndustryQuery();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectOption = (option) => {
    setSelectedCat(option);
    setIsDropdownOpen(false);
  };

  return (
    <div style={{ position: "relative" }} className="near-f all-search-btn">
      <button
        className="rating-main-babb dropdown-toggle text-capitalize distance-style"
        type="button"
        onClick={handleToggleDropdown}
      >
        {selectedCat ? (
          `${selectedCat.name}`
        ) : (
          <>
            <i className="fa fa-bars bar-search"></i>
            <span>All</span>
          </>
        )}
      </button>
      {isDropdownOpen && (

        <div className="dropdown-menu drop-menu-filter show">
          <div className="back-box" onClick={handleToggleDropdown}></div>
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              <ul className="all-search-cat">
                <li className="all-search-subCat" style={{ width: "80%" }}>
                  <span className="close-cat" onClick={handleToggleDropdown}>X</span>
                  {data?.data?.industry?.map((currCat) => (
                    <>
                      {(currCat?.name === "fast food restaurents" ||
                        currCat?.name === "food & beverages" ||
                        currCat?.name === "food plaza" ||
                        currCat?.name === "hotel" ||
                        currCat?.name === "motel" ||
                        currCat?.name === "restaurent") && (
                        <>
                          <h2 className="cu-h-cat"> {currCat?.name}</h2>{" "}
                          {currCat.name !== "restaurent" && (<br />)}
                          {currCat.name === "restaurent" && (
                            <>
                              <ul>
                                {currCat?.subCategory?.map((currSub) => (
                                  <li className="search-subCar-a">
                                    <button
                                      className="dropdown-item text-capitalize subCat-link"
                                      onClick={() =>
                                        handleSelectOption({name: currSub.name, id: currSub._id})
                                      }
                                    >
                                      {currSub.name}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                        </>
                      )}
                    </>
                  ))}
                </li>
                {data?.data?.industry?.map((currCat) => (
                  <>
                    {currCat?.name !== "fast food restaurents" &&
                      currCat?.name !== "food & beverages" &&
                      currCat?.name !== "food plaza" &&
                      currCat?.name !== "hotel" &&
                      currCat?.name !== "motel" &&
                      currCat?.name !== "restaurent" && (
                        <li
                          className="all-search-subCat"
                          style={{ cursor: "unset" }}
                        >
                          <h2>{currCat?.name}</h2>
                          {currCat?.subCategory?.length > 0 && (
                            <ul>
                              {currCat?.subCategory?.map((currSub) => (
                                <li className="search-subCar-a">
                                  <button
                                    className="dropdown-item text-capitalize subCat-link"
                                    onClick={() =>
                                      handleSelectOption({name: currSub.name, id: currSub._id})
                                    }
                                  >
                                    {currSub.name}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      )}
                  </>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductFilterWithCat;

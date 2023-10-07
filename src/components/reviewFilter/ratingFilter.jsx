import React, { useState } from "react";
import RatingFilterOptions from "./filterRatingOptions";

const RatingFilter = ({ ratingSelectedOption, setRatingSelectedOption }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectOption = (option) => {
    setRatingSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        className="rating-main-babb rating-main-babd dropdown-toggle text-capitalize"
        type="button"
        onClick={handleToggleDropdown}
      >
        {ratingSelectedOption ? `${ratingSelectedOption} star` : "all ratings"}
      </button>
      {isDropdownOpen && (
        <div className="dropdown-menu drop-menu-filter show">
          <button
            className="dropdown-item text-capitalize text-center"
            onClick={() => handleSelectOption(5)}
          >
            <RatingFilterOptions starCount={5} />
          </button>
          <button
            className="dropdown-item text-capitalize text-center"
            onClick={() => handleSelectOption(4)}
          >
            <RatingFilterOptions starCount={4} />
          </button>
          <button
            className="dropdown-item text-capitalize text-center"
            onClick={() => handleSelectOption(3)}
          >
            <RatingFilterOptions starCount={3} />
          </button>
          <button
            className="dropdown-item text-capitalize text-center"
            onClick={() => handleSelectOption(2)}
          >
            <RatingFilterOptions starCount={2} />
          </button>
          <button
            className="dropdown-item text-capitalize text-center"
            onClick={() => handleSelectOption(1)}
          >
            <RatingFilterOptions starCount={1} />
          </button>
        </div>
      )}
    </div>
  );
};

export default RatingFilter;

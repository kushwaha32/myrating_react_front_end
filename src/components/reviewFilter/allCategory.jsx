import React, { useState } from "react";

const AllCategoryOption = ({
  selectedCategoryOption,
  setSelectedCategoryOption
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectOption = (option) => {
    setSelectedCategoryOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        className="rating-main-babb rating-main-babc dropdown-toggle text-capitalize"
        type="button"
        onClick={handleToggleDropdown}
      >
        {selectedCategoryOption || "all categories"}
      </button>
      {isDropdownOpen && (
        <div className="dropdown-menu drop-menu-filter show">
          <button
            className="dropdown-item text-capitalize"
            onClick={() => handleSelectOption("customer")}
          >
           customer
          </button>
          <button
            className="dropdown-item text-capitalize"
            onClick={() => handleSelectOption("public")}
          >
           public
          </button>
          <button
            className="dropdown-item text-capitalize"
            onClick={() => handleSelectOption("visitor")}
          >
            visiter
          </button>
        </div>
      )}
    </div>
  );
};

export default AllCategoryOption;

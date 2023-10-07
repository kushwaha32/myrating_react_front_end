import React, { useState } from 'react';

const DropDownSelector = ({selectedOption, setSelectedOption}) => {
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        className="rating-main-babb dropdown-toggle text-capitalize"
        type="button"
        onClick={handleToggleDropdown}
      >
        {selectedOption }
      </button>
      {isDropdownOpen && (
        <div
          className="dropdown-menu drop-menu-filter show"
        
        >
          <button
            className="dropdown-item text-capitalize"
            onClick={() => handleSelectOption('latest - oldest')}
          >
           Latest - Oldest
          </button>
          <button
            className="dropdown-item text-capitalize"
            onClick={() => handleSelectOption('oldest - latest')}
          >
            Oldest - Latest
          </button>
         
        </div>
      )}
    </div>
  );
};

export default DropDownSelector;

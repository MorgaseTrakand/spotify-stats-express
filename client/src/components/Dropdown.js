import React, { useState } from 'react';

const Dropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };
  
  const handleOptionClick = (option) => {
    console.log(`Selected option: ${option}`);
    // You can perform further actions with the selected option here
    setIsOpen(false); // Close the dropdown after selecting an option
  };
  
  return (
    <div className="dropdown">
      <button className="dropdown-btn" onClick={handleDropdownClick}>
        Click
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {options.map(option => (
            <div>
              <div key={option} className="dropdown-option" onClick={() => handleOptionClick(option)}>
                {option}
              </div>
              <div key={option} className="dropdown-option" onClick={() => handleOptionClick(option)}>
                {option}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

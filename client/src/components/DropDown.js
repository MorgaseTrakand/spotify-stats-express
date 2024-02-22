import { useEffect, useState } from "react";
import { useDataContext } from "../DataContext";

function DropDown({ setTerm }) {
  const [dropdownOption, setDropDownOption] = useState(); 
  const { validationHandler, setValidationHandler } = useDataContext();


  useEffect(() => {
    setDropDownOption(localStorage.getItem('option'))
  })

  function handleDropDown(option, term) {
    setValidationHandler(validationHandler + 1)
    if (option == localStorage.getItem('option')) {
      console.log("same option")
      return;
    }

    localStorage.setItem("option", option)
    localStorage.setItem('savedOption', term)
    const spinner = document.querySelector(".lds-ring");
    const outlinedContainer = document.querySelector(".outlined-stats-container");
    spinner.classList.remove("display-none");
    outlinedContainer.classList.add("add-blur");

    setDropDownOption(option) 
    setTerm(term)
  }

  return (
    <div className="dropdown">
    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      {dropdownOption}
    </button>
    <ul className="dropdown-menu">
      <li onClick={() => handleDropDown("All Time", "long_term")}><a className="dropdown-item" href="">All Time</a></li>
      <li onClick={() => handleDropDown("6 Months", "medium_term")}><a className="dropdown-item" href="">6 Months</a></li>
      <li onClick={() => handleDropDown("4 Weeks", "short_term")}><a className="dropdown-item" href="">4 Weeks</a></li>
    </ul>
  </div>
  );
}

export default DropDown;
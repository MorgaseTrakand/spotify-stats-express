import { useEffect, useState } from "react";
import { useDataContext } from "../DataContext";

function DropDown({ setTerm }) {
  const [dropdownOption, setDropDownOption] = useState(localStorage.getItem("option")); 
  const { validationHandler, setValidationHandler } = useDataContext();


  useEffect(() => {
    setDropDownOption(localStorage.getItem('option'))
  })

  function handleDropDown(option, term) {
    setValidationHandler(validationHandler + 1)
    console.log(validationHandler)
    if (option == localStorage.getItem('option')) {
      console.log("same option")
      return;
    }
    const spinner = document.querySelector(".lds-ring");
    const outlinedContainer = document.querySelector(".outlined-stats-container");
    spinner.classList.remove("display-none");
    outlinedContainer.classList.add("add-blur");

    localStorage.setItem("option", option)
    setDropDownOption(option) 
    setTerm(term)
  }

  return (
    <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      {dropdownOption}
    </button>
    <ul class="dropdown-menu">
      <li onClick={() => handleDropDown("All Time", "long_term")}><a class="dropdown-item" href="#">All Time</a></li>
      <li onClick={() => handleDropDown("6 Months", "medium_term")}><a class="dropdown-item" href="#">6 Months</a></li>
      <li onClick={() => handleDropDown("4 Weeks", "short_term")}><a class="dropdown-item" href="#">4 Weeks</a></li>
    </ul>
  </div>
  );
}

export default DropDown;
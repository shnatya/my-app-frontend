import React from "react";

function Header({currentCategory, changeCategory}) {

    function handleChange(event) {
        changeCategory(event.target.value)
    }
    return (
        <div className="App">
          <button>Add a joke</button>
          <label>Show jokes</label>
          <select onChange={handleChange} value={currentCategory}>
            <option value="All">All</option>
            <option value="Animals">Animals</option>
            <option value="Things">Things</option>
            <option value="Food">Food</option>
          </select>
        </div>
      );
}

export default Header;
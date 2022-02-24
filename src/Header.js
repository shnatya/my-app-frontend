import React from "react";
import Jokes from './Jokes'


function Header({currentCategory, arrayOfCategories, changeCategory}) {

    function handleChange(event) {
        changeCategory(event.target.options.selectedIndex)
    }

    let categoryOptions = arrayOfCategories.map(c => {
        return (
            <option key={c.id} value={c.category_name}>{c.category_name}</option>
        )
    })
    
    return (
        <div className="App">
          <button>Add a joke</button>
          <label>Show jokes</label>
          <select onChange={handleChange} value={currentCategory}>
          <option value="All">All</option>
              {categoryOptions}
          </select>
        </div>
      );
}

export default Header;
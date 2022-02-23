import React from "react";

function Header() {

    return (
        <div className="App">
          <button>Add a joke</button>
          <label>Show jokes</label>
          <select>
            <option >All</option>
            <option>Animals</option>
            <option>Things</option>
            <option>Food</option>
          </select>
        </div>
      );
}

export default Header;
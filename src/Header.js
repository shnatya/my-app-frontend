import React from "react";
import { NavLink } from "react-router-dom"

const linkStyles = {
    display: "inline-block",
    background: "cadetblue",
    color: "black",
    width: "150px",
    padding: "12px",
    marginBottom: "50px",
    marginLeft: "15px",
    borderRadius: "10px",
}
function Header({currentCategory, arrayOfCategories, changeCategory}) {

    function handleChange(event) {
        changeCategory(event.target.value)
    }

    let categoryOptions = arrayOfCategories.map(c => {
        return (
            <option key={c.id} value={c.category_name}>{c.category_name}</option>
        )
    })
    
    return (
        <div className="App">
            <NavLink
                to="/addjoke"
                exact
                style={linkStyles}
                activeStyle={{ background: "palevioletred"}}>
                    Add a joke
            </NavLink>
            <label>Show jokes</label>
            <NavLink
                to="/jokes"
                exact
                style={linkStyles}
                activeStyle={{ background: "palevioletred"}}>

                <select onChange={handleChange} value={currentCategory}>
                <option value="All">All</option>
                    {categoryOptions}
                </select>

            </NavLink>
            
        </div>
      );
}

export default Header;

/* 

*/


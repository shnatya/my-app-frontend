import './App.css';
import React, { useEffect, useState } from 'react'
import { baseURL } from './Globals'
import Header from './Header';


//after refreshing the page - current category is All
//need to grab category_id.
//want to grab every time a user adds a new joke
function App() {
  const [jokes, setJokes] = useState([])
  const [arrayOfCategories, setArrayOfCategories] = useState([])
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const [currentCategory, setCurrentCategory] = useState("All")

  useEffect(() =>
    fetch(baseURL + '/categories')
    .then(res => res.json())
    .then(data => setArrayOfCategories(data))
  , [])

  useEffect(() => {
    if (currentCategoryIndex === 0) {
      fetch(baseURL + '/jokes')
      .then(res => res.json())
      .then(data => setJokes(data))
    }
    else {
      fetch(baseURL + `/jokes/${currentCategoryIndex}`)
      .then(res => res.json())
      .then(data => setJokes(data))
    }
  }
  , [currentCategoryIndex])

  function changeCategory(value, index) {
    setCurrentCategory(value)
    setCurrentCategoryIndex(index)
  }
  return (
    <div className="App">
      <Header currentCategoryIndex={currentCategoryIndex} 
              currentCategory={currentCategory}
              arrayOfCategories={arrayOfCategories}
              changeCategory={changeCategory}/>
      
    </div>
  );
}

export default App;

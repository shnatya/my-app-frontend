import './App.css';
import React, { useEffect, useState } from 'react'
import { baseURL } from './Globals'
import Header from './Header';


function App() {
  const [allJokes, setAllJokes] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [currentCategory, setCurrentCategory] = useState("All")

  useEffect(() =>
    fetch(baseURL + '/jokes')
    .then(res => res.json())
    .then(data => setAllJokes(data))
  , [])

  function changeCategory(newCategory) {
    setCurrentCategory(newCategory)
  }
  return (
    <div className="App">
      <Header currentCategory={currentCategory} changeCategory={changeCategory}/>
    </div>
  );
}

export default App;

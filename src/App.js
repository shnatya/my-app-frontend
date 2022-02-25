import './App.css';
import React, { useEffect, useState } from 'react'
import { baseURL } from './Globals'
import Header from './Header';
import Jokes from './Jokes';
import NewJokeForm from './NewJokeForm';
import { Route, Switch } from 'react-router-dom'

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

  function addNewJoke(joke) {
    fetch("http://localhost:9292/jokes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user : {
          username: joke.username},
        joke: {
          question: joke.question,
          answer: joke.answer},
      category: {
          category_name: joke.category_name
      }})
    })
    .then(res => res.json()
    .then(newJoke => {
      
    }))
  }
  return (
    <div className="App">
      <Header currentCategoryIndex={currentCategoryIndex} 
              currentCategory={currentCategory}
              arrayOfCategories={arrayOfCategories}
              changeCategory={changeCategory}/>
      <Switch>
        <Route exact path='/addjoke'>
            <NewJokeForm addNewJoke={addNewJoke}/>
        </Route>
        <Route exac path='/jokes'>
            <Jokes jokes={jokes}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

/*
*/
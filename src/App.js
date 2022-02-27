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
  const [isAdded, setAdded] = useState(false)
  const [update, setUpdate] = useState(true)

//do i need to add a new joke to my db jokes in react? i send request to get a new list of jokes from server
  useEffect(() => {
    if (update === true){
      fetch(baseURL + '/categories')
      .then(res => res.json())
      .then(data => {
        setArrayOfCategories(data)
        setUpdate(false)
        }  )}
  }, [update])
    
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

  function addNewJoke(joke) {
    fetch(baseURL + "/jokes", {
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
      setAdded(true)
    }))
  }

  function deleteJoke(id) {
    fetch(baseURL + `/jokes/${id}`,{
      method: "DELETE",
    })
    .then(res => res.json())
    .then(deletedJoke => {
      console.log(deletedJoke)
        const newArray = jokes.filter(joke => joke.id !== id)
        setJokes(newArray)
        setUpdate(true)
      })
  }

  function changeCategory(value, index) {
    setCurrentCategory(value)
    setCurrentCategoryIndex(index)
  }
//Add Done! message when a new joke added to the db, and then clean this message off the screen in 1 sec
  useEffect(() => {
    const timerId = setTimeout(() => setAdded(false), 1000)
    return function cleanUp() {
      clearTimeout(timerId)
    }
  }
  ,[isAdded])
  return (
    <div className="App">
      <Header currentCategoryIndex={currentCategoryIndex} 
              currentCategory={currentCategory}
              arrayOfCategories={arrayOfCategories}
              changeCategory={changeCategory}/>
      <Switch>
        <Route exact path='/addjoke'>
            <NewJokeForm addNewJoke={addNewJoke} isAdded={isAdded}/>
        </Route>
        <Route exac path='/jokes'>
            <Jokes jokes={jokes} deleteJoke={deleteJoke} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

/*
*/
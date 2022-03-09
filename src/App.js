import './App.css';
import React, { useEffect, useState } from 'react'
import { baseURL } from './Globals'
import Header from './Header';
import Jokes from './Jokes';
import NewJokeForm from './NewJokeForm';
import { Route, Switch } from 'react-router-dom'
//Add new category to the frontend arrayOfCategories

function App() {
  const [jokes, setJokes] = useState([])
  const [jokesToDisplay, setJokesToDisplay] = useState([])
  const [arrayOfCategories, setArrayOfCategories] = useState([])
  const [currentCategory, setCurrentCategory] = useState("All")
  const [isAdded, setAdded] = useState(false)
//collect array of categories from jokes
    
  useEffect(() => {
      fetch(baseURL + '/jokes')
      .then(res => res.json())
      .then(data => {
        //console.log(data)
        setJokes(data)
        collectCategories(data)
      })}
        ,[])

  function collectCategories(data) {
    let newArray = []

    data.forEach(jokeObj => {
      jokeObj.categories.map(categoryObj => {
        let result = newArray.find(el => el === categoryObj.category_name)
        if(result === undefined) {
          newArray = [...newArray, categoryObj.category_name]
      }
    })
    })
    setArrayOfCategories(newArray)
  }

  function isCategoryExist(obj) {
    
  }

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
    .then(data => {
      console.log("Add new joke:")
      console.log(data)
      setAdded(true)
      
      addNewCategory(data.categories)

      setJokes([...jokes, {
        question: data.question,
        answer: data.answer,
        categories: data.categories,
        user: data.user,
        id: data.id,
        user_id: data.user_id
      }])
    }))
  }

  function addNewCategory(categories) {
    let newArray = [...arrayOfCategories]
    categories.map(obj => {
      let result = arrayOfCategories.find(el => el === obj.category_name)
      if(result === undefined) {
        newArray = [...newArray, obj.category_name]
      }
    })
    setArrayOfCategories(newArray)
  }

  /* why i need to collect an array and pass it to set function????
  function addNewCategory(categories) {
    categories.map(obj => {
      let result = arrayOfCategories.find(el => el === obj.category_name)
      if(result === undefined) {
        setArrayOfCategories([...arrayOfCategories, obj.category_name])
      }
    })
  }*/

  function deleteJoke(id) {
    fetch(baseURL + `/jokes/${id}`,{
      method: "DELETE",
    })
    .then(res => res.json())
    .then(deletedJoke => {
      console.log("deletedJoke:")
      console.log(deletedJoke)
        const newArray = jokes.filter(joke => joke.id !== id) 
        setJokes(newArray)
        setJokesToDisplay(newArray)
        deleteCategories(deletedJoke)
      })
  }

  function deleteCategories(arrayOfDeletedObjects) {
    let newArray = [...arrayOfCategories]
    if(arrayOfDeletedObjects.length > 1) {
      for(let i=1; i < arrayOfDeletedObjects.length; i++) {
        newArray = newArray.filter(category => category !== arrayOfDeletedObjects[i])
      }}
    setArrayOfCategories(newArray)
  }

  function changeCategory(value) {
    setCurrentCategory(value)
    if (value === "All") {
      setJokesToDisplay(jokes)
    }else{
      let jokesOfCategory = []
      jokes.map(joke => {
        joke.categories.map(categoryObj => {
          if(value === categoryObj.category_name) {
            jokesOfCategory = [...jokesOfCategory, joke]
          }
        })
      })
      setJokesToDisplay(jokesOfCategory)
    }
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
      <Header currentCategory={currentCategory}
              arrayOfCategories={arrayOfCategories}
              changeCategory={changeCategory}/>
      <Switch>
        <Route exact path='/addjoke'>
            <NewJokeForm addNewJoke={addNewJoke} isAdded={isAdded}/>
        </Route>
        <Route exac path='/jokes'>
            <Jokes jokes={jokesToDisplay} deleteJoke={deleteJoke} />
        </Route>
      </Switch>
    </div>
  )}


export default App;
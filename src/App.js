import './App.css';
import React, { useEffect, useState } from 'react'
import { baseURL } from './Globals'
import Header from './Header';
import Jokes from './Jokes';
import NewJokeForm from './NewJokeForm';
import { Route, Switch, useHistory } from 'react-router-dom'
import ErrorList from './errors/ErrorList';

function App() {
  const [jokes, setJokes] = useState([])
  const [jokesToDisplay, setJokesToDisplay] = useState([])
  const [arrayOfCategories, setArrayOfCategories] = useState([])
  const [currentCategory, setCurrentCategory] = useState("All")
  const [isAdded, setAdded] = useState(false)
  const history = useHistory()
  const [errors, setErrors] = useState([])
    
  useEffect(() => {
      fetch(baseURL + '/jokes')
      .then(res => res.json())
      .then(data => {
        setJokes(data)
        setJokesToDisplay(data)
        //collectCategories(data) //have it seperately, didn't like it???

        let newArray = []

        data.forEach(jokeObj => {
          jokeObj.categories.forEach(categoryObj => newArray = addNewCategory(categoryObj, newArray))
        })
        setArrayOfCategories(newArray)
      })}
      ,[])

  function updateCategoriesArray(categories) {
    let newArray = [...arrayOfCategories]
    categories.map(obj => newArray = addNewCategory(obj, newArray))
    setArrayOfCategories(newArray)
  }

  function addNewCategory(obj, arr) {
    let result = arr.find(el => el === obj.category_name)
    if (result === undefined) {
      arr = [...arr, obj.category_name]
    }
    return arr
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
      if(data.errors) {
        console.log(data.errors)
        setErrors(data.errors)
      }else {
        setAdded(true)
        updateCategoriesArray(data.categories)      
        setJokes([...jokes, data])
      
        setCurrentCategory("All") 
        setJokesToDisplay([...jokes, data])
        history.push('/jokes')
      }
      
    }))
  }

  const clearErrors = () => {
    setErrors([])
  }

  function deleteJoke(id) {
    fetch(baseURL + `/jokes/${id}`,{
      method: "DELETE",
    })
    .then(res => res.json())
    .then(deletedJoke => {
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
       jokesOfCategory = jokes.filter(joke => {
           return joke.categories.find(categoryObj => value === categoryObj.category_name)
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
      <ErrorList errors={errors}/>
      <Switch>
        <Route exact path='/addjoke'>
            <NewJokeForm addNewJoke={addNewJoke} isAdded={isAdded} clearErrors={clearErrors}/>
        </Route>
        <Route exac path='/jokes'>
            <Jokes jokes={jokesToDisplay} deleteJoke={deleteJoke} />
        </Route>
      </Switch>
    </div>
  )}


export default App;


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
        //collect array of categories
        data.forEach(jokeObj => {
          isCategoryExist(jokeObj)
        })
      })}
        ,[])

  function isCategoryExist(obj) {
    console.log(arrayOfCategories)
    debugger
    obj.categories.forEach(categoryObj => {
      debugger
      let result = arrayOfCategories.find(el => el === categoryObj.category_name)
      debugger
      if(result === undefined) {
        debugger
        const newArray = [...arrayOfCategories, categoryObj.category_name]
        debugger
        setArrayOfCategories(newArray)
        //console.log(arrayOfCategories)
      }
    })
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

  function deleteJoke(id) {
    fetch(baseURL + `/jokes/${id}`,{
      method: "DELETE",
    })
    .then(res => res.json())
    .then(deletedJoke => {
      console.log(deletedJoke)
        const newArray = jokes.filter(joke => joke.id !== id) 
        setJokes(newArray)
        //setJokesToDisplay(newArray)??
      })
  }

  function changeCategory(value) {
    //console.log("value:" + value)
    setCurrentCategory(value)
    if (value === "All") {
      setJokesToDisplay(jokes)
    }else{
      let jokesOfCategory = []
      jokes.map(joke => {
        joke.categories.map(categoryObj => {
          if(value === categoryObj.category_name) {
            //console.log(categoryObj.category_name)
            jokesOfCategory = [...jokesOfCategory, joke]
            //console.log(jokesOfCategory)
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
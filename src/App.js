import './App.css';
import React, { useEffect, useState } from 'react'
import { baseURL } from './Globals'
import Header from './Header';
import Jokes from './Jokes';
import NewJokeForm from './NewJokeForm';
import { Route, Switch } from 'react-router-dom'
//Add new category to the frontend arrayOfCategories
s
function App() {
  const [jokes, setJokes] = useState([])
  const [jokesToDisplay, setJokesToDisplay] = useState([])
  const [arrayOfCategories, setArrayOfCategories] = useState([])
  //const [currentCategoryId, setCurrentCategoryId] = useState(0)
  const [currentCategory, setCurrentCategory] = useState("All")
  const [isAdded, setAdded] = useState(false)

  useEffect(() => {
      fetch(baseURL + '/categories')
      .then(res => res.json())
      .then(data => setArrayOfCategories(data))}
      ,[])
    
  useEffect(() => {
      fetch(baseURL + '/jokes')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setJokes(data)})}
        ,[])

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
//doesn't work joke.categories[0].id because we can have two categories for one joke
  function changeCategory(value) {
    console.log("value:" + value)
    setCurrentCategory(value)
    if (value === "All") {
      setJokesToDisplay(jokes)
    }else{
      const category = arrayOfCategories.find(category => category.category_name === value)
      let jokesOfCategory = []
      jokes.map(joke => {
        if(category.id === joke.categories[0].id) {
          jokesOfCategory = [...jokesOfCategory, joke]
          console.log(jokesOfCategory)
        }
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
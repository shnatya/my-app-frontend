import './App.css';
import React, { useEffect, useState } from 'react'
import { baseURL } from './Globals'
import Header from './Header';


function App() {
  const [allJokes, setAllJokes] = useState([])
  useEffect(() =>
    fetch(baseURL + '/jokes')
    .then(res => res.json())
    .then(data => setAllJokes(data))
  , [])

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;

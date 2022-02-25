import React from "react";
import Joke from './Joke'

function Jokes({jokes, deleteJoke, isAdded}) {
    
    return (
        <div>
            {jokes.map((joke, index) => <Joke key={index} joke={joke} index={index} deleteJoke={deleteJoke} isAdded={isAdded}/>)}
        </div>
    )
}

export default Jokes
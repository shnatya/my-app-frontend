import React from "react";
import Joke from './Joke'

function Jokes({jokes, deleteJoke}) {
    return (
        <div>
            {jokes.map((joke, index) => <Joke key={index} joke={joke} index={index} deleteJoke={deleteJoke} />)}
        </div>
    )
}

export default Jokes
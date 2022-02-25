import React from "react";
import Joke from './Joke'

function Jokes({jokes}) {
    
    return (
        <div>
            {jokes.map((joke, index) => <Joke key={index} joke={joke} index={index}/>)}
        </div>
    )
}

export default Jokes
import React from "react";

function Joke({ joke, index, deleteJoke }) {
    
    function handleClick() {
        deleteJoke(joke.id)
    }
//why button is deleted too?
    return (
        <div className="joke-div">
            <button onClick={handleClick} >Delete</button>  
            <h2>{index+1}. {joke.question}</h2>
            <h2>Answer: {joke.answer}</h2>
            <h2>User: {joke.user.username}</h2>
        </div>
    )
}

export default Joke
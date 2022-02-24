import React from "react";

function Joke({ joke, index }) {
    console.log(index)
    return (
        <div>
            <h2>{index+1}. {joke.question}</h2>
            <h2>Answer: {joke.answer}</h2>
            <h2>User: {joke.user.username}</h2>
        </div>
    )
}

export default Joke
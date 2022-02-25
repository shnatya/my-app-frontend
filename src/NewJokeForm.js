import React, { useState } from "react";

function NewJokeForm() {
    const [newJoke, setNewJoke] = useState({
        question: "",
        answer: "",
        username: ""
    })

    function handleSubmit() {

    }

    function handleChange(event) {
        setNewJoke({
            ...newJoke,
            [event.target.name]: event.target.value})
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} name="question" placeholder="Type in your question"
            type="text" value={newJoke.question} autoComplete="off" />
             <input onChange={handleChange} name="answer" placeholder="Type in your answer"
            type="text" value={newJoke.answer} autoComplete="off" />
             <input onChange={handleChange} name="username" placeholder="Type in your username"
            type="text" value={newJoke.username} />
        </form>
    )
}



export default NewJokeForm
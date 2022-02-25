import React, { useState } from "react";

function NewJokeForm({ addNewJoke }) {
    const [newJoke, setNewJoke] = useState({
        question: "",
        answer: "",
        user: {
            username: ""},
        category: {
            category_name: ""}
    })

    function handleSubmit(event) {
        event.preventDefault()
        addNewJoke(newJoke)

        setNewJoke({
            question: "",
            answer: "",
            user: {
                username: ""},
            category: {
                category_name: ""}
        })
    }

    function handleChange(event) {
        setNewJoke({
            ...newJoke,
            [event.target.name]: event.target.value})
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input className="margin input-joke" onChange={handleChange} name="question" placeholder="Type in your question"
            type="text" value={newJoke.question} autoComplete="off" />
             <input className="margin input-joke" onChange={handleChange} name="answer" placeholder="Type in your answer"
            type="text" value={newJoke.answer} autoComplete="off" />
             <input className="margin input-joke" onChange={handleChange} name="username" placeholder="Type in your username"
            type="text" value={newJoke.user.username} />
            <input className="margin input-joke" onChange={handleChange} name="username" placeholder="Type in category(-ies)"
            type="text" value={newJoke.category.category_name} />
            <button className="margin button-submit" style={{background: "pink"}} type="submit">Submit</button>
        </form>
    )
}



export default NewJokeForm
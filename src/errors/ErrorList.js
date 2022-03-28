import React from "react";
import Error from "./Error";

function ErrorList({errors}) {
    const errorList = errors.map((error, idx) => <Error key={idx} error={error}/>)
    return (
        <ul className="errors">
            {errorList}
        </ul>
    )
}

export default ErrorList;
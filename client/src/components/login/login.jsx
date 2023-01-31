import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <>
        <h1>Go to main Page</h1>
        <Link to={"/home"}>
        <button>Home</button>
        </Link>
        </>
    )
}

export default Login
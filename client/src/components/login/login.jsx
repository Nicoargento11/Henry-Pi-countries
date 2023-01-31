import React from 'react'
import { Link } from 'react-router-dom'
import Styles from "./login.module.css"

function Login() {
    return (
        <div>
        <h1 className={Styles.tittle}>Welcome to Mini-World</h1>
        <Link to={"/home"}>
        <button className={Styles.button}>Start</button>
        </Link>
        </div>
    )
}

export default Login
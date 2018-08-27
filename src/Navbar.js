import React from 'react'
import App from './App'
import './App.css'
import PropTypes from 'prop-types'

const Navbar = ({onNewGame}) => {
    return(
        <header>
            <h2><a>Memory Game</a></h2>
            <nav>
                <a onClick={onNewGame}>New Game</a>
            </nav>
        </header>
    )
}

Navbar.PropTypes = {
    onNewGame: PropTypes.func.isRequired
}

export default Navbar
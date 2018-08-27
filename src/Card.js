import React from 'react'
import App from './App'
import './App.css'
import PropTypes from 'prop-types'

const Cards = (props) => {
    let style={}
    if(props.showing){
        style.backgroundColor = props.backgroundColor
    }
    return(
        <div onClick={props.onClick} className="card-container" style={style}>

        </div>
    )
}

Cards.PropTypes = {
    showing : PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Cards
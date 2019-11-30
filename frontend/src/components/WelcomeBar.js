import React from 'react'

/* Functional component with a prop */

const WelcomeBar = (props) => {
    return (
        <div id='welcome-bar'>
            <h1>Welcome to { props.appName }.</h1>
            <h3>Enjoy your visit.</h3>
        </div>
    )
}

export default WelcomeBar;
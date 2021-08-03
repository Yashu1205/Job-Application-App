import React from 'react'
import './styles/navbar.css'
import NavBar from './component/NavBar'


const App = (props) => { 

    return (
        <div className="container">
            <h1 className="text-center mt-2 mb-3">Job Application App</h1>
            <NavBar />
        </div>
    )
}

export default App
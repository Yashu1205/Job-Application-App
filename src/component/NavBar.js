import React from 'react'
import { Route, withRouter, NavLink } from 'react-router-dom'


import Home from './Home'
import ApplicationForm from './ApplicationForm'
import AdminDashboard from './AdminDashboard'

const NavBar = (props) => {

    return (
        <div >

            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <ul className="nav nav-pills mr-auto">
                    <li>
                        <NavLink exact to="/" activeClassName="active">
                            Home
                        </NavLink>
                    </li>

                    <li >
                        <NavLink to="/application-form"  activeClassName="active">
                            Application Form
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/admin-dashboard" activeClassName="active">
                            Admin Dashboard
                        </NavLink>
                    </li>
                </ul>
            </nav>  

            <Route path="/" component={Home} exact={true} />
            <Route path="/application-form" component={ApplicationForm} />
            <Route path="/admin-dashboard" component={AdminDashboard} />
        </div>

    )
}

export default withRouter(NavBar)
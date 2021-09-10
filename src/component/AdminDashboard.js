import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Tabs, Tab } from 'react-bootstrap'

import UsersList from './UsersList'

const AdminDashboard = (props) => {
    const [ users, setUsers ] = useState([])
    const [appliedUsers, setAppliedUsers ] = useState([])
    const [key, setKey] = useState('');

    useEffect(() => {
        axios.get('https://dct-application-form.herokuapp.com/users/application-forms')
             .then((response) => {
                 const result = response.data
                 setUsers(result.reverse())
                 setAppliedUsers(result.reverse())
             })
            }, [])

    //Filter developers based on job title        
    const getFilteredUsers = (jobRole) => {
        const result = users.filter(user => {
            return user.jobTitle === jobRole
        })
        
        setKey(jobRole)
        setAppliedUsers(result)
    }

    //update application status in ui
    const updateStatus = (id, status) => {
        const result = appliedUsers.map(ele => {
            if(ele._id === id){
                return {...ele, status: status}
            }
            else{
                return {...ele}
            }
        })
        setAppliedUsers(result)
    }    

    return (
        <div>
            <h3>Admin Dashboard</h3>

            <Tabs  activeKey={key} onSelect={(k) => getFilteredUsers(k)}  className="mb-3 mt-3">
                
                <Tab eventKey="Front-End Developer" title="Front-End Developers">
                    <UsersList appliedUsers={appliedUsers} title={key} 
                               updateStatus={updateStatus}/> 
                </Tab>
                
                <Tab eventKey="Node.js Developer" title="Node.js Developers">
                    <UsersList appliedUsers={appliedUsers} title={key} 
                               updateStatus={updateStatus}/> 
                </Tab>

                <Tab eventKey="MEAN Stack Developer" title="MEAN Stack Developers">
                    <UsersList appliedUsers={appliedUsers} title={key} 
                               updateStatus={updateStatus}/> 
                </Tab>

                <Tab eventKey="FULL Stack Developer" title="Full Stack Developers">
                    <UsersList appliedUsers={appliedUsers} title={key} 
                               updateStatus={updateStatus}/> 
                </Tab>
            </Tabs>    
            
            {key === '' && <UsersList appliedUsers={appliedUsers} title={key} 
                               updateStatus={updateStatus}/>}         
        </div>        
    )
}

export default AdminDashboard
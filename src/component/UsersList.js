import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

import UserDetailModal from './UserDetailModal'

const UsersList = (props) => {
    const { appliedUsers, title, updateStatus } = props
    const [ showModal, setShowModal ] = useState(false)
    const [ userDetail, setUserDetail ] = useState({})

    const viewDetails = (id) => {
        axios.get(`http://dct-application-form.herokuapp.com/users/application-form/${id}`)
             .then((response) => {
                 const result = response.data
                 setUserDetail(result)
                 setShowModal(true)
             })
             .catch((error) => {
                Swal.fire('Oops..',error.message,'error')
             })
    }

    const handleModal = () => {
        setShowModal(!showModal)
    }

    const updateApplicationStatus = (id, status) => {
        axios.put('http://dct-application-form.herokuapp.com/users/application-form/update/'+id,
                 { "status": status})
             .then((response) => {
                 Swal.fire('Success',`Applicant is ${status}`,'success')
                 updateStatus(id,status)
             })
             .catch((error) => {
                 Swal.fire('Oops..',error.message,'error')
             })
    }

    return (
        <div width="1116px">
            <h4>{title ? `${title}s` : 'All Candidates'} - {appliedUsers.length} </h4>
            <h6>List of candidates applied for {title} job</h6>
            {
                appliedUsers.length > 0 &&             
                <table className=" table table-bordered mt-3" >
                    <thead>
                        <tr>
                            <th className="col-sm-1">Name</th>
                            <th className="col-sm-3">Technical Skills</th>
                            <th className="col-sm-2">Experience</th>
                            <th className="col-sm-2">Applied Date</th>
                            <th className="col-sm-1">ViewDetails</th>
                            <th className="col-sm-3">Update Application Status</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            appliedUsers.map(user => {
                                return (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.skills.substr(0,40)}</td>
                                        <td>{user.experience}</td>
                                        <td >{user.createdAt.slice(0,10)}</td>
                                        <td >
                                            <button className="btn btn-info btn-sm"
                                                    onClick={() => viewDetails(user._id)}>
                                                View</button>
                                        </td>
                                        
                                        <td >
                                            { user.status === 'shortlisted'  ? (
                                                <button className="btn btn-success btn-sm ">Shortlisted</button>
                                            ) : user.status === 'rejected' ? (
                                                <button className="btn btn-danger btn-sm">Rejected</button>
                                            ) : (
                                                <>
                                                <button className="btn btn-success btn-sm "
                                                        onClick={() => updateApplicationStatus(user._id,'shortlisted')}>
                                                    Shortlist</button> 
                                                <button className="btn btn-danger btn-sm ml-2" style={{marginLeft: '5px'}}
                                                        onClick={() => updateApplicationStatus(user._id, 'rejected')}>
                                                    Reject</button>
                                                </>
                                            )
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr></tr>
                    </tbody>
                </table>
            }

            { showModal && 
                    <UserDetailModal userDetail={userDetail} 
                                     showModal={showModal}
                                     handleModal={handleModal}/>}
        </div>
    )
}

export default UsersList
import React from 'react'
import { Modal} from 'react-bootstrap'

const UserDetailModal = (props) => {
    const { userDetail, showModal, handleModal } = props

    return (
        <Modal
            show={showModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {userDetail.name} Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="card">
                    <div className="card-body">
                        <table className="table table-borderless">
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td>Contact Number</td>
                                    <td>{userDetail.phone}</td>    
                                </tr> 
                                <tr>
                                    <td>Email</td>
                                    <td>{userDetail.email}</td>  
                                </tr>
                                <tr>
                                    <td>Skills</td>
                                    <td>{
                                        userDetail.skills.split(',').map((skill, index) => {
                                            return (
                                                <>
                                                    <span key={index} className="mb-1">{skill.trim()}<br/></span>
                                                </>
                                            )
                                        })}</td>

                                </tr>
                                <tr>
                                    <td>Experience</td> 
                                    <td>{userDetail.experience}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleModal}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default UserDetailModal
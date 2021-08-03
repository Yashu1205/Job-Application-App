import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import validator from 'validator'
import Select from 'react-select'

const ApplicationForm = (props) => {
    const [ fullName, setFullName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ mobile, setMobile ] = useState('')
    const [ jobTitle, setJobTitle ] = useState()
    const [ experience, setExperience ] = useState('')
    const [ techSkills, setTechSkills ] = useState('')
    const [ formErrors, setFormErrors ] = useState({})
    const [ isSaved, setIsSaved ] = useState(false)
    const errors = {}
    
    const options = [
        {value: 'Select---', label: ''},
        { value: 'Front-End Developer', label: 'Front-End Developer'},
        { value: 'Node.js Developer', label: 'Node.js Developer'},
        { value: 'MEAN Stack Developer', label: 'MEAN Stack Developer' },
        { value: 'FULL Stack Delveloper', label: 'FULL Stack Delveloper'}
    ]

    useEffect(() => {
        if(isSaved){
            setFullName('')
            setEmail('')
            setMobile('')
            setJobTitle('')
            setExperience('')
            setTechSkills('')
            setFormErrors({})
            handleToggle()
        }
    },[isSaved])
    
    const handleToggle = () => {
        setIsSaved(!isSaved)
    }

    const handleChange = (e) => {
        const inputName = e.target.name

        if(inputName === "fullname"){
            setFullName(e.target.value)
        }
        else if(inputName === 'email'){
            setEmail(e.target.value)
        } 
        else if(inputName === 'mobile'){
            setMobile(e.target.value)
        } 
        else if(inputName === 'jobTitle'){
            setJobTitle(e.target.value)
        } 
        else if(inputName === 'experience'){
            setExperience(e.target.value)
        } 
        else{
            setTechSkills(e.target.value)
        }
    }

    const handleSelectChange = (jobTitle) => {
        setJobTitle(jobTitle)
    }

    const runValidations = () => {
        if(fullName.trim().length === 0){
            errors.name = 'Name cannot be blank'
        }
        if(email.trim().length === 0){
            errors.email = 'Email cannot be blank'
        } else if(!validator.isEmail(email)){
            errors.email = 'Invalid email format'
        }

        if(mobile.trim().length === 0){
            errors.mobile = 'Contact number cannot be blank'
        } else if(mobile.length !== 10){
            errors.mobile = 'Invalid mobile number'
        }

        if(jobTitle.value.trim().length === 0){
            errors.jobTitle = 'Job title cannot be blank'
        }

        if(experience.trim().length === 0){
            errors.experience = 'Experience cannot be blank'
        }

        if(techSkills.trim().length === 0){
            errors.techSkills = 'Technical skills cannot be blank'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length > 0){
            setFormErrors(errors)
        }
        else{
            const formData = {
                'name': fullName,
                'email': email,
                'phone': mobile,
                'skills': techSkills,
                'jobTitle': jobTitle.value,
                'experience': experience
            }
            
            axios.post('http://dct-application-form.herokuapp.com/users/application-form', formData)
                 .then((response) => {
                        Swal.fire('Success','Application submitted successfully','success')
                        handleToggle()
                 })
                 .catch((error) => {
                     Swal.fire('Oops..',error.message,'error')
                 })
        }
    }

    return (
        <div style={{padding:'10px'}}>
            <form onSubmit={handleSubmit}>
                <table className="table" >
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>Full name</td>
                            <td>
                                <input type="text" className="form-control form-control-sm"
                                        name="fullname" 
                                        value={fullName} 
                                        onChange={handleChange}
                                        placeholder="Full Name" />
                                { formErrors.name && 
                                    <span className="text-danger">{ formErrors.name }</span>
                                } 
                            </td>
                        </tr>

                        <tr>
                            <td>Email</td>
                            <td>
                                <input type="text" className="form-control form-control-sm"
                                        name="email" 
                                        value={email} 
                                        onChange={handleChange} 
                                        placeholder="example@email.com" />
                                { formErrors.email && 
                                    <span className="text-danger">{ formErrors.email }</span>
                                } 
                            </td>
                        </tr>

                        <tr>
                            <td>Contact Number</td>
                            <td>
                                <input type="text" className="form-control form-control-sm"
                                        name="mobile" 
                                        value={mobile} 
                                        onChange={handleChange} 
                                        placeholder="+91 9988554433" />
                                { formErrors.mobile && 
                                    <span className="text-danger">{ formErrors.mobile }</span> 
                                } 
                            </td>
                        </tr>

                        <tr>
                            <td>Application For</td>
                            <td>
                                <Select  name="jobTitle" 
                                        value={jobTitle} 
                                        onChange={handleSelectChange}
                                        options={options} />
                                { formErrors.jobTitle && 
                                    <span className="text-danger">{ formErrors.jobTitle }</span> 
                                } 
                            </td>
                        </tr>

                        <tr>
                            <td>Experience</td>
                            <td>
                                <input type="text" className="form-control form-control-sm"
                                        name="experience" 
                                        value={experience} 
                                        onChange={handleChange} 
                                        placeholder="Experience (2 years, 3 months)"/>
                                    { formErrors.experience && 
                                        <span className="text-danger">{ formErrors.experience }</span>
                                    } 
                            </td>
                        </tr>

                        <tr>
                            <td>Technical Skills</td>
                            <td>
                                <textarea className="form-control form-control-sm"
                                        name="techSkills" 
                                        value={techSkills} 
                                        onChange={handleChange} 
                                        placeholder="Technical Skills"></textarea>
                                { formErrors.techSkills && 
                                    <span className="text-danger">{ formErrors.techSkills }</span>
                                }  
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" className="btn btn-primary" value="Send Application" />
            </form>
        </div>
    )
}

export default ApplicationForm
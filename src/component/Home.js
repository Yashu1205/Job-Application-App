import React from 'react' 

const Home = (props) => {

    return (
        <div>
            <h3 className="mb-3">Welcome</h3>
            <div className="row mb-4">
                <img src="Job.PNG" width="100%" alt="we are hiring"/>
            </div>
            <div className="flex-container d-flex">
                <div style={{margin:'20px',width:'50%', textAlign:'center'}}>
                    <p>
                        This is a Job Application App developed using React in the front-end. In this app, we are accepting the job application for various posts in our company. In order to apply for the job, the user has to click on the application-form tab that is presented on the menu. A form will be opened. You have to fill all the fields with appropriate data. All the fields are required that means you should not leave any field blank. For the email field, you should provide valid email address. For the contact information field, you should provide your 10 digits mobile number. 
                    </p>
                </div>
                <div style={{ margin:'20px',width:'50%', textAlign:'center', justify:'content'}}>
                    <p>
                     For the job role you are applying for, you should select one from the dropdown menu. In the experience field, put your experience in years and months format. Incase if you are fresher, you can put 0. And the final field should contain all your technical skills. You have to put it in a single sentence with comma separated. Once everything is done, hit the submit button and you are done. After we go through your application, you will hear from us in two days. 
                    </p>
                </div>
            </div>

        </div>  
    )
}

export default Home
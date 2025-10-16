import React from 'react';
import './sign-in-and-sign-up.styles.scss';

import SignIn from '../../components/sign-in/sign-in.component';
import Register from '../../components/register/register.component';

const RegisterAndSignIn = (props) => {
    return (
        <div className='sign-in-and-sign-up-page-container'>
            <h1>Register or Sign In</h1>
            <div className='sign-in-and-sign-up-container'>
                <SignIn onAuthChange={props.onAuthChange} />
                <Register onAuthChange={props.onAuthChange} />
            </div>
        </div>
    )
}

export default RegisterAndSignIn;
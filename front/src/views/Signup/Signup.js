import React from 'react';
import Hero from '../../components/Hero/Hero';
import SignupForm from '../../components/SignupForm/SignupForm'
import './Signup.scss';

// Signup view : display the hero component and the Signup form component

const Signup = () => {
    return (
        <div className='Signup'>
            <Hero />
            <SignupForm />
        </div>
    );
}

export default Signup;

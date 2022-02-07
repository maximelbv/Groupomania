import React from 'react';
import Hero from '../../components/Hero/Hero';
import SignupForm from '../../components/SignupForm/SignupForm'
import './Signup.scss';

const Signup = () => {
    return (
        <div className='Signup'>
            <Hero />
            <SignupForm />
        </div>
    );
}

export default Signup;

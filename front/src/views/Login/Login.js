import React from 'react';
import Hero from '../../components/Hero/Hero';
import LoginForm from '../../components/LoginForm/LoginForm';
import './Login.scss'

const Login = () => {
    return (
        <div className='Login'>
            <Hero />
            <LoginForm />
        </div>
    );
}

export default Login;

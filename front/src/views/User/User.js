import React from 'react';
import Header from '../../components/Header/Header';
import { NavLink } from 'react-router-dom';
import './User.scss'

const User = () => {
    return (
        <div className='User'>
            <Header />
            
            <div className='content'>
                <div className='userHeader'>
                    <div className='profilePic'></div>
                    <h2 className='name'>John Doe</h2>
                    <p className='nickname'>@JohnDoe</p>
                    <a href='mailto:johnDoe@mail.com' className='email'>johnDoe@mail.com</a>
                    <div className='position'>
                        <p className='work'>Poste</p>
                        <p className='workDesc'>Consultant</p>
                    </div>
                    <NavLink to='/edit' className='editProfile'>Editer</NavLink>
                </div>
            </div>

        </div>
    );
}

export default User;

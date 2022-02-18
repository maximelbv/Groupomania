import React from 'react';
import Header from '../../components/Header/Header';
import { NavLink } from 'react-router-dom';
import user from '../../utils/currentUser';
import './User.scss'

const User = () => {
    return (
        <div className='User'>
            <Header />
            
            <div className='content'>
                <div className='userHeader'>
                    <div className='profilePic'></div>
                    <h2 className='name'>{user.firstName} {user.lastName}</h2>
                    <a href='#' className='email'>{user.email}</a>
                    <NavLink to='/edit' className='editProfile'>Editer le profil</NavLink>
                </div>
            </div>

        </div>
    );
}

export default User;

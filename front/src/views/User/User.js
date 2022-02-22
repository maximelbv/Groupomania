import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import { NavLink } from 'react-router-dom';
import user from '../../utils/currentUser';
import Post from '../../components/Post/Post.js';
import axios from 'axios';
import './User.scss'

const User = () => {

    const token = localStorage.getItem('userToken');
    const [posts, setPosts] = useState();


    useEffect(() => {
        axios.get(`http://localhost:8080/api/post/${user.userId}`, {
            headers: {'Authorization' : `Bearer ${token}`}
        })
            .then((res) => {
                setPosts(res.data); 
            })
    }, [])

    return (
        <div className='User'>
            <Header />
            
            <div className='content'>
                <div className='userHeader'>
                    <div className='profilePic'>{user.firstName.substring(0, 1)}</div>
                    <h2 className='name'>{user.firstName} {user.lastName}</h2>
                    <a href='#' className='email'>{user.email}</a>
                    <NavLink to='/edit' className='editProfile'>Editer le profil</NavLink>
                </div>
            </div>

            <div className='postsContainer'>

                <h3>Mes Posts</h3>
                
                {posts !== undefined ? posts.map((p, i) => {
                    return <Post p={p} key={i} />
                }) : null}

            </div>

        </div>
    );
}

export default User;

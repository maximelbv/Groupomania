import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Header from '../../components/Header/Header';
import user from '../../utils/currentUser';
import Post from '../../components/Post/Post.js';
import axios from 'axios';
import './User.scss'

const User = () => {

    const token = localStorage.getItem('userToken');
    const [posts, setPosts] = useState();

    let firstName = user.firstName;
    let lastName = user.lastName;

    const modifyAccount = () => {

        const sendModification = () => {
        
            let id = user.userId;
            let data = {
                firstName: firstName,
                lastName: lastName,
            }
            axios.put(`http://localhost:8080/api/auth/modify/${id}`, data)
                .then((res) => {
                    window.location.reload(false);
                    localStorage.setItem('user', JSON.stringify(res.data));
                })
                .catch(e => console.log(e))  
        }

        let firstNameInput = React.createElement('input', { type: 'textarea', defaultValue: user.firstName, className: 'inputMessage', onChange: e => firstName = e.target.value })
        let lastNameInput = React.createElement('input', { type: 'textarea', defaultValue: user.lastName, className: 'inputMessage', onChange: e => lastName = e.target.value })
        let modify = React.createElement('input', { onClick: sendModification, type: 'button', className: 'confirmModifBtn', value: 'Confirmer' })
        ReactDOM.render(
            [firstNameInput, lastNameInput, modify],
            document.getElementById(`userHeader`)
            )
        
    }


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
                <div className='userHeader' id='userHeader'>
                    <div className='profilePic'>{user.firstName.substring(0, 1)}</div>
                    <div id='name'>
                        <p id='firstName'>{user.firstName}</p>
                        <p id='lastName'>{user.lastName}</p>
                        </div>
                    <a href='#' className='email'>{user.email}</a>
                    <input type='button' onClick={modifyAccount} className='editProfile' value='Editer le profil'></input>
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

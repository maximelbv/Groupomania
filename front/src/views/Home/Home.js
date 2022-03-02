import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header/Header';
import Post from '../../components/Post/Post.js';
import axios from 'axios';
import user from '../../utils/currentUser';
import { Form } from 'react-bootstrap';
import './Home.scss';

const Home = () => {

    useEffect(() => {
        if (!token) {navigate('./login')}
    }, []);

    let image = '';
    let message = ''; 

    const token = localStorage.getItem('userToken');
    const navigate = useNavigate();
    const [posts, setPosts] = useState();
    var bodyFormData = new FormData();
    
    console.log(bodyFormData)
    
    
    let sendPost = () => {

        bodyFormData.set('userId', user.userId); 
        bodyFormData.set('author', `${user.firstName} ${user.lastName}`); 
        bodyFormData.set('message', message); 
        bodyFormData.set('picture', image); 

        console.log('image', image)

        return axios.post('http://localhost:8080/api/post/post', bodyFormData, {
            headers: {'Authorization' : `Bearer ${token}`, 'Content-Type': 'multipart/form-data'}
        })
        .then ((req) => {
            window.location.reload()
        })
        .catch(err => console.log(err))
    }
        
    useEffect(() => {
        axios.get('http://localhost:8080/api/post/getAll', {
            headers: {'Authorization' : `Bearer ${token}`}
        })
            .then((res) => {
                setPosts(res.data); 
            })
    }, [])

    return ( 
        <div className='Home'>
            <Header />

            <form className='setPostContainer'>
                <input className='message' type='longtext' rows='250' cols='50' defaultValue={bodyFormData.message} onChange={e =>  message = e.target.value}></input>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label></Form.Label>
                    <Form.Control type="file" accept='.jpg, .jpeg, .png, .gif' defaultValue={bodyFormData.picture} onChange={e => image = e.target.files[0]} />
                </Form.Group>
                
                <input onClick={sendPost} className='submit' type='button' value='Poster'></input>
            </form>

            <div className='postsContainer'>
                
                {posts !== undefined ? posts.map((p, i) => {
                    return <Post p={p} key={i} />
                }) : null}

            </div>
        </div>
    );
}

export default Home;

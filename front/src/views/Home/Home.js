import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header/Header';
import Post from '../../components/Post/Post.js';
import axios from 'axios';
import user from '../../utils/currentUser';
import { Form } from 'react-bootstrap';
import './Home.scss';

const Home = () => {

    const token = localStorage.getItem('userToken');
    const navigate = useNavigate();
    const [posts, setPosts] = useState();

    useEffect(() => {
        if (!token) {navigate('./login')}
    }, []);

    let info = {
        userId : user.userId,
        author : `${user.firstName} ${user.lastName}`,
        message : '',
        picture : '',
        video : '',
    }

    let sendPost = () => {
        return axios.post('http://localhost:8080/api/post/post', info, {
            headers: {'Authorization' : `Bearer ${token}`}
        })
        .then (() => {
            console.log('ok')
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

            <form className='setPostContainer'   onSubmit={sendPost}>
                <input className='message' type='longtext' rows='250' cols='50' defaultValue={info.message} onChange={e => info.message = e.target.value}></input>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label></Form.Label>
                    <Form.Control type="file" accept='.jpg, .jpeg, .png' defaultValue={info.picture} onChange={e => info.picture = e.target.files[0].name} />
                </Form.Group>
                <input className='submit' type='submit' value='Poster'></input>
            </form>

            {/* <form action='/images' method='POST' encType='multipart/form-data'>
                <input type='file' name='image' />
                <button type='submit'>Submit</button>
            </form> */}

            <div className='postsContainer'>
                
                {posts !== undefined ? posts.map((p, i) => {
                    return <Post p={p} key={i} />
                }) : null}

            </div>
        </div>
    );
}

export default Home;

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Post from '../../components/Post/Post.js';
import axios from 'axios';
import user from '../../utils/currentUser';
import './Home.scss';

const Home = () => {

    const [posts, setPosts] = useState();

    
    let info = {
        userId : user.userId,
        commentsId : '',
        author : `${user.firstName} ${user.lastName}`,
        message : '',
        picture : '',
        video : '',
    }

    let sendPost = () => {
        return axios.post('http://localhost:8080/api/post/post', info)
            .then (() => {
                console.log('ok')
            })
            .catch(err => console.log(err))
        }
        
    useEffect(() => {
        axios.get('http://localhost:8080/api/post/getAll')
            .then((res) => {
                setPosts(res.data); 
            })
    }, [])

    return (
        <div className='Home'>
            <Header />

            <form className='setPostContainer' onSubmit={sendPost}>
                <input className='message' type='longtext' rows='250' cols='50' defaultValue={info.message} onChange={e => info.message = e.target.value}></input>
                <input className='submit' type='submit' value='Poster'></input>
            </form>

            <div className='postsContainer'>
                
                {posts !== undefined ? posts.map((p, key) => {
                    return <Post p={p} />
                }) : null}

            </div>
        </div>
    );
}

export default Home;

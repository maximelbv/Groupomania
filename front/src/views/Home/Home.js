import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header'
import axios from 'axios';
import './Home.scss';

const Home = () => {

    const [posts, setPosts] = useState();

    useEffect(() => {
        axios.get('http://localhost:8080/api/post/getAll')
            .then((res) => {
                setPosts(res.data); 
            })
    }, [])
    

    console.log(posts) 

    return (
        <div className='Home'>
            <Header />
            <div className='postsContainer'>
                {/* <p>{posts && posts[0].userId}</p> */}
                {posts !== undefined ? posts.map((p, key) => {
                    return  <div className='post' key={key}>

                                <div className='userInfos'>

                                    <div className='profilePic'>
                                        <p>{p.userId.substring(0, 1)}</p>
                                    </div>

                                    <div>
                                        <p className='name'>{p.userId}</p>
                                        <p className='date'>{p.date}</p>
                                    </div>

                                </div>

                                <p>{p.message}</p>

                            </div>
                }) : null}
            </div>
        </div>
    );
}

export default Home;

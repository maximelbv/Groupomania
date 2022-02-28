import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Comment from '../Comment/Comment.js';
import ReactDOM from 'react-dom';
import './Post.scss';

const Post = ({p, i}) => {

  const [comments, setComments] = useState();

  const token = localStorage.getItem('userToken');

  function padTo2Digits(num) {return num.toString().padStart(2, '0');}

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  const modifyPost = () => {
    
    const sendPost = () => {
  
      let id = p.postId;
      let data = {
        message: message,
      }
      axios.put(`http://localhost:8080/api/post/${id}`, data)
        .then(() => window.location.reload(false))
        .catch(e => console.log(e))  
    }

    let message = React.createElement('input', { defaultValue: p.message,type: 'textarea', className: 'inputMessage', onChange: e => message = e.target.value })
    let sendMessage = React.createElement('input', { onClick: sendPost, type: 'button', className: 'confirmModifBtn', value: 'Confirmer' })
    ReactDOM.render(
      [message, sendMessage],
      document.getElementById(`message${p.postId}`)
    )
    
  }
  

  const deletePost = () => {
    let id = p.postId;
    axios.delete(`http://localhost:8080/api/post/${id}`, {
      headers: {'Authorization' : `Bearer ${token}`}
    })
      .then(() => window.location.reload(false))
      .catch(e => console.log(e))

  }
  
  // display edit / delete buttons if you are the owner of the post
  useEffect(() => {

    if (p.userId === JSON.parse(localStorage.getItem('user')).userId) { 
      let modifyBtn = React.createElement('button', { onClick: modifyPost, className: 'modifyBtn' }, '');
      let deleteBtn = React.createElement('button', { onClick: deletePost, className: 'deleteBtn' }, '');
      ReactDOM.render(
        [modifyBtn, deleteBtn],
        document.getElementById(p.postId)
      );
    }

  }, [])

  useEffect(() => {
        axios.get(`http://localhost:8080/api/comment/getAll/${p.postId}`, {
            headers: {'Authorization' : `Bearer ${token}`}
        })
            .then((res) => {
                setComments(res.data); 
            })
    }, [])

  console.log(comments)


  return (
    <div id={'postCtn' + p.postId} className='Post' key={i}>

        <div className='userInfos'>

            <div className='profilePic'>
                <p>{p.author.substring(0, 1)}</p>
            </div>

            <div>
                <p className='name'>{p.author}</p>
                <p className='date'>{formatDate(new Date(p.date))}</p>
            </div>

        </div>

        <p id={'message' + p.postId}>{p.message}</p>
        {p.picture !== '' && <img width='100%' height='auto' src={p.picture}></img>}

        <div id={p.postId} className='deleteModifyCtn'></div>

        <div className='commentsContainer'>
                
          {comments !== undefined ? comments.map((c, i) => {
              return <Comment c={c} key={i} />
          }) : null}

        </div>

    </div>
  )
}

export default Post;
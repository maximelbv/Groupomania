import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './Post.scss';

const Post = ({p, i}) => {

  let message = '';

  const token = localStorage.getItem('userToken');

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

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
        .then(() => console.log('modifié'))
        .catch(e => console.log(e))
  
    }

    let message = React.createElement('input', { type: 'textarea', className: 'inputMessage', onChange: e => message = e.target.value })
    let sendMessage = React.createElement('input', { onClick: sendPost, type: 'button', className: 'inputMessage', value: 'Modifier' })
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
      .then(() => console.log('supprimé'))
      .catch(e => console.log(e))

  }
  
  useEffect(() => {

    if (p.userId === JSON.parse(localStorage.getItem('user')).userId) { 
      let modifyBtn = React.createElement('button', { onClick: modifyPost, className: 'modifyBtn' }, 'm');
      let deleteBtn = React.createElement('button', { onClick: deletePost, className: 'deleteBtn' }, 'x');
      ReactDOM.render(
        [modifyBtn, deleteBtn],
        document.getElementById(p.postId)
      );
    }

  }, [])


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

        {/* <div id={'modifyCtn' + p.postId} className='modifyCtn'></div>
        <div id={'deleteCtn' + p.postId} className='deleteCtn'></div> */}
        <div id={p.postId} className='deleteModifyCtn'></div>

    </div>
  )
}

export default Post;
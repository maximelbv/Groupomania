import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './Comment.scss';

export default function Comment({c, i}) {

    const token = localStorage.getItem('userToken');

    // used of formatDate function
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    // modify the date format
    function formatDate(date) {
        return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
        ].join('/');
    }

    const modifyPost = () => {
    
        const sendPost = () => {
    
        let id = c.commentId;
        let data = {
            message: message,
        }
        axios.put(`http://localhost:8080/api/comment/${id}`, data)
            .then(() => window.location.reload(false))
            .catch(e => console.log(e))
        }

        let message = React.createElement('input', { defaultValue: c.message, type: 'textarea', className: 'inputMessage', onChange: e => message = e.target.value })
        let sendMessage = React.createElement('input', { onClick: sendPost, type: 'button', className: 'confirmModifBtn', value: 'Confirmer' })
        ReactDOM.render(
        [message, sendMessage],
        document.getElementById(`message${c.commentId}`)
        )
    
    }
  
    const deletePost = () => {
        let id = c.commentId;
        axios.delete(`http://localhost:8080/api/comment/${id}`, {
        headers: {'Authorization' : `Bearer ${token}`}
        })
        .then(() => window.location.reload(false))
        .catch(e => console.log(e))

    }

    useEffect(() => {

        if (c.userId === JSON.parse(localStorage.getItem('user')).userId) { 
        let modifyBtn = React.createElement('button', { onClick: modifyPost, className: 'modifyBtn' }, '');
        let deleteBtn = React.createElement('button', { onClick: deletePost, className: 'deleteBtn' }, '');
        ReactDOM.render(
            [modifyBtn, deleteBtn],
            document.getElementById(c.commentId)
        );
        }

    }, [])

  return (
    <div id={'commentCtn' + c.commentId} className='Comment' key={i}>

        <div className='userInfos'>

            <div className='profilePic'>
                <p>{c.author.substring(0, 1)}</p>
            </div>

            <div>
                <p className='name'>{c.author}</p>
                <p className='date'>{formatDate(new Date(c.date))}</p>
            </div>

        </div>

        <p id={'message' + c.commentId}>{c.message}</p>

        <div id={c.commentId} className='deleteModifyCtn'></div>

    </div>
  )
}

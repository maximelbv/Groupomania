import axios from 'axios';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Comment.scss';

// The comment component is used to display comments with Post.js component props (c)

export default function Comment({c, k}) {

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

    // modify comment function : triggered on click of the modify button (see the useEffect function)
    const modifyPost = () => {
    
        // on click of the send button the sendPost function will be triggered
        const sendPost = () => {
    
            let id = c.commentId;
            let data = {
                message: message,
            }
            // request the API to modify the comment with the message took from the text input
            axios.put(`http://localhost:8080/api/comment/${id}`, data, {
                headers: {'Authorization' : `Bearer ${token}`}
            })
                .then(() => window.location.reload(false))
                .catch(e => console.log(e))
            }

            // when the user clicked the button, it will display the text input and the send button
            let message = React.createElement('input', { defaultValue: c.message, type: 'textarea', className: 'inputMessage', onChange: e => message = e.target.value })
            let sendMessage = React.createElement('input', { onClick: sendPost, type: 'button', className: 'confirmModifBtn', value: 'Confirmer' })
            ReactDOM.render(
            [message, sendMessage],
            document.getElementById(`message${c.commentId}`)
            )
    
    }
    // delete comment function : triggered on click of the delete button (see the useEffect function)
    const deletePost = () => {
        let id = c.commentId;
        // Request the API to delete the comment
        // add authorization headers to verify the authentification of the user
        axios.delete(`http://localhost:8080/api/comment/${id}`, {
        headers: {'Authorization' : `Bearer ${token}`}
        })
        .then(() => window.location.reload(false))
        .catch(e => console.log(e))

    }

    // Check if the ID of the user connected correspond to the comment userId
    // if it correspond, create the modify and delete buttons, assign them modify & delete functions that are just above
    useEffect(() => {

        if (c.userId === JSON.parse(localStorage.getItem('user')).userId) { 
        let modifyBtn = React.createElement('button', { onClick: modifyPost, className: 'modifyBtn', name: 'modifyBtn' }, '');
        let deleteBtn = React.createElement('button', { onClick: deletePost, className: 'deleteBtn', name: 'deleteBtn' }, '');
        ReactDOM.render(
            [modifyBtn, deleteBtn],
            document.getElementById(c.commentId)
        );
        }

    }, [])

  return (
    <div id={'commentCtn' + c.commentId} className='Comment' key={`comment${k}`}>

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

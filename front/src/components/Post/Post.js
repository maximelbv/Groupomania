import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Comment from '../Comment/Comment.js';
import ReactDOM from 'react-dom';
import user from '../../utils/currentUser';
import './Post.scss';

// Post component : used to display the posts with the Home component props (p)

const Post = ({p, i}) => {

  let comment = '';
  // create the formData that will be used as data for the post function
  // form data is used to handle images upload
  var bodyFormData = new FormData();

  const [comments, setComments] = useState();

  const token = localStorage.getItem('userToken');

  // used on formatDate function
  function padTo2Digits(num) {return num.toString().padStart(2, '0');}

  // used to modify the date format
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  // triggered on click of the 'send comment' button 
  const sendComment = () => {

    // define the data of the comment
      let data = {
        postId: p.postId,
        userId: user.userId,
        author: `${user.firstName} ${user.lastName}`,
        message: comment,
      }

      // request the API to post the comment with the the data just above
      axios.post(`http://localhost:8080/api/comment/post`, data, {
        headers: {'Authorization' : `Bearer ${token}`}
      })
      .then(() => window.location.reload(false))
      .catch(e => console.log(e))
  }

  // modify post function : triggered on click of the modify button (see the useEffect function)
  const modifyPost = () => {
    let msg = p.message;
    let img = p.picture;
    const sendPost = () => {

      // set the message and image from input values in the bodyFormData
      bodyFormData.set('message', msg);
      bodyFormData.set('picture', img);
  
      let id = p.postId;

      // request the API to modify the post with the data of bodyFormData
      axios.put(`http://localhost:8080/api/post/${id}`, bodyFormData, {
        headers: {'Authorization' : `Bearer ${token}`}
      })
        .then(() => window.location.reload(false))
        .catch(e => console.log(e))  
    }

    // when the user clicked the button, it will display the text input, the file input and the send button
    let message = React.createElement('input', { defaultValue: p.message,type: 'textarea', className: 'inputMessage', onChange: e => msg = e.target.value })
    let image = React.createElement('input', { type: 'file', accept: '.jpg, .jpeg, .png, .gif', className: 'inputFile', onChange: e => img = e.target.files[0] })
    let send = React.createElement('input', { onClick: sendPost, type: 'button', className: 'confirmModifBtn', value: 'Confirmer' })
    ReactDOM.render(
      [message, image, send],
      document.getElementById(`message${p.postId}`)
    )
    
  }
  
  // delete post function : triggered on click of the delete button (see the useEffect function)
  const deletePost = () => {
    let id = p.postId; 
    axios.delete(`http://localhost:8080/api/post/${id}`, {
      headers: {'Authorization' : `Bearer ${token}`,'Content-Type': 'multipart/form-data'}
    })
      .then(() => window.location.reload(false))
      .catch(e => console.log(e))

  }
  
  // Check if the ID of the user connected correspond to the post userId
  // if it correspond, create the modify and delete buttons, assign them modify & delete functions that are just above
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

  // get the comments 
  useEffect(() => {
        axios.get(`http://localhost:8080/api/comment/getAll/${p.postId}`, {
            headers: {'Authorization' : `Bearer ${token}`}
        })
            .then((res) => {
                setComments(res.data); 
            })
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

        <div id={p.postId} className='deleteModifyCtn'></div>

        <div className='commentsContainer'>

          <h4 className='commentsTitle'>Commentaires</h4>

          <form className='postComment'>
            <textarea onChange={e => comment = e.target.value} className='postCommentTxt' placeholder='Écrire un commentaire ...'></textarea>
            <input   className='postCommentBtn' type='button' value='Poster' onClick={sendComment}></input>
          </form>
                
          {comments !== undefined ? comments.map((c, i) => {
              return <Comment c={c} key={i} />
          }) : null}

        </div>

    </div>
  )
}

export default Post;
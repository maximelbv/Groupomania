import axios from 'axios';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Post.scss';

const Post = ({p, i}) => {

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

  const deletePost = () => {
    console.log('ok');
    let id = p.postId;
    axios.delete(`http://localhost:8080/api/post/${id}`)
      .then(() => console.log('supprimé'))
      .catch(e => console.log(e))

  }

  useEffect(() => {

    if (p.userId === JSON.parse(localStorage.getItem('user')).userId) { 
      let deleteBtn = React.createElement('button', { onClick: deletePost, className: 'deleteBtn' }, 'x');
      ReactDOM.render(
        deleteBtn,
        document.getElementById(p.postId)
      );
    }

  }, [])


  return (
    <div  className='Post' key={i}>

        <div className='userInfos'>

            <div className='profilePic'>
                <p>{p.author.substring(0, 1)}</p>
            </div>

            <div>
                <p className='name'>{p.author}</p>
                <p className='date'>{formatDate(new Date(p.date))}</p>
            </div>

        </div>

        <p>{p.message}</p>
        {p.picture !== '' && <img width='100%' height='auto' src={p.picture}></img>}
        {/* {p.video !== '' && <iframe controls width='560' height='315' title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen src={p.video}></iframe>} */}
        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/g-0B_Vfc9qM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}

        <div id={p.postId} className='deleteCtn'></div>

    </div>
  )
}

export default Post;
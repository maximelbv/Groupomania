import React from 'react';
import './Post.scss';

const Post = ({p, key}) => {

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

  return (
    <div className='Post' key={key}>

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

    </div>
  )
}

export default Post;
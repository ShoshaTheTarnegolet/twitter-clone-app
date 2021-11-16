import React from 'react';
import './Post.css';

function Post({ username, text, date, id, link }) {
  return (
    <div key={id} id={id} className="tweet-container">
      <div className="tweet">
        <div>
          <img className="tweet-avatar" src={link} alt="" />
        </div>

        <div className="tweet-content">
          <div className="tweet-header">
            <div>
              {' '}
              <p className="tweet-user">{username}</p>
            </div>
            <div>
              <p className="tweet-created-on">{date}</p>
            </div>
          </div>
          <div className="tweet-text">
            <p>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;

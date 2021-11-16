import React, { useContext } from 'react';
import { auth, db } from './firebase';
import Spinner from './Spinner';
import { useAuthState } from 'react-firebase-hooks/auth';
import './TweetBox.css';
import { nanoid } from 'nanoid';
import { Context } from './context.jsx';

function TweetBox() {
  const [user] = useAuthState(auth);
  const appContext = useContext(Context);

  const sendTweet = (e) => {
    e.preventDefault();
    console.log(user, appContext.tweetMessage.length);
    appContext.setLoading(false);
    appContext.setTweetMessage('');
    setTimeout(() => {
      db.collection('tweets').add({
        username: appContext.name,
        text: appContext.tweetMessage,
        id: nanoid(3),
        date: new Date().toLocaleString(),
      });
      appContext.setLoading(true);
    }, [2000]);
  };

  return (
    <>
      <form className="tweet-form">
        <div className="tweet-form-container">
          <textarea className="tweet-form-textarea" value={appContext.tweetMessage} onChange={(e) => appContext.setTweetMessage(e.target.value)} placeholder="What you have in mind..." rows="5" cols="45" />
          <input type="text" className="tweet-length" value={appContext.tweetMessage.length} disabled />
        </div>
        {appContext.tweetMessage.length > 140 ? <p className="error">The tweet can't contain more then 140 chars.</p> : null}
        <button disabled={appContext.tweetMessage.length > 140} onClick={sendTweet} type="submit" className="tweet-form-submit">
          Tweet
        </button>
      </form>
      <div style={{ display: !appContext.isLoading ? 'block' : 'none' }}>
        <Spinner />
      </div>
    </>
  );
}

export default TweetBox;

import React, { useEffect, useContext } from 'react';
import './Tweets.css';
import Post from './Post';
import TweetBox from './TweetBox';
import { Context } from './context.jsx';
import { db, auth, storage } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Tweets() {
  const appContext = useContext(Context);
  const [user] = useAuthState(auth);

  const postfirst = async function () {
    try {
      db.collection('tweets')
        .orderBy('date', 'desc')
        .limit(10)
        .onSnapshot((snapshot) => {
          let posts = [];
          let lastKey = '';
          snapshot.docs.forEach((doc) => {
            console.log(doc.data());
            posts.push({
              postUserName: doc.data().username,
              postId: doc.data().id,
              postContent: doc.data().text,
              postDate: doc.data().date,
            });
            lastKey = doc.data().date;
          });
          console.log(appContext.name);
          appContext.setPosts(posts);
          appContext.setLastKey(lastKey);
          return { posts, lastKey };
        });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchImage = async () => {
    try {
      storage
        .ref(`/images/${user.uid}`)
        .getDownloadURL()
        .then((link) => {
          console.log(link);
          appContext.setAvatar(link);
        });
    } catch (err) {
      console.error(err);
      alert('An error occured while fetching image data');
    }
  };

  useEffect(() => {
    appContext.setLoading(false);
    setTimeout(() => {
      postfirst();
      fetchImage();
      appContext.setLoading(true);
    }, [1000]);
  }, []);

  const postsNextBatch = async function () {
    try {
      await db
        .collection('tweets')
        .orderBy('date', 'desc')
        .startAfter(appContext.lastKey)
        .limit(10)
        .onSnapshot((snapshot) => {
          let lastKey = '';
          snapshot.docs.forEach((doc) => {
            appContext.posts.push({
              postUserName: doc.data().username,
              postId: doc.id,
              postContent: doc.data().text,
              postDate: doc.data().date,
            });
            lastKey = doc.data().date;
          });
          console.log(lastKey, appContext.posts);
          appContext.setLastKey(lastKey);
          return { lastKey };
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <div>
        <h2>Hey {appContext.name}</h2>
      </div>
      <TweetBox />
      <div className="posts-box">
        {appContext.posts.map((post) => (
          <Post link={appContext.avatar} key={post.postId} id={post.postId} username={post.postUserName} text={post.postContent} date={post.postDate} />
        ))}
      </div>
      <div className="containerBtn">
        <button className="postsBtn" onClick={postsNextBatch}>
          More Posts
        </button>
      </div>
    </div>
  );
}

export default Tweets;

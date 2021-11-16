import React, { useEffect, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
import './Profile.css';
import Spinner from './Spinner';
import { auth, db, logout, storage } from './firebase';
import { Context } from './context.jsx';

function Profile() {
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  const appContext = useContext(Context);

  const fetchUserName = async () => {
    try {
      const query = await db.collection('users').where('uid', '==', user?.uid).get();
      const data = query.docs[0].data();
      appContext.setName(data.displayName);
    } catch (err) {
      console.error(err);
      alert('An error occured while fetching user data');
    }
  };

  const fetchImage = async () => {
    try {
      storage
        .ref(`/images/${user.uid}`)
        .getDownloadURL()
        .then((link) => {
          appContext.setImage(null);
          appContext.setImageURL(link);
          appContext.imageURL = link;
        });
    } catch (err) {
      console.error(err);
      alert('An error occured while fetching image data');
    }
  };

  useEffect(() => {
    if (user) {
      fetchImage();
      fetchUserName();
      console.log(user);
    } else if (loading) {
      appContext.setLoading(false);
      setTimeout(() => {
        appContext.setLoading(true);
      }, [1000]);
    } else {
      const newLocal = '/login';
      return history.replace(newLocal);
    }
  }, [user, loading]);

  const upload = (e) => {
    e.preventDefault();
    appContext.setLoading(false);
    setTimeout(() => {
      const uploadTask = storage.ref(`/images/${user.uid}`).put(appContext.image);
      uploadTask
        .then((uploadTaskSnapshot) => {
          return uploadTaskSnapshot.ref.getDownloadURL();
        })
        .then((link) => {
          appContext.setImage(null);
          appContext.setImageURL(link);
        });
      appContext.setLoading(true);
    }, [4000]);
  };

  return (
    <>
      <div className="profile-container">
        <div style={{ display: !appContext.isLoading ? 'block' : 'none' }}>
          <Spinner />
        </div>
        <figure className="profile-card">
          <img src="https://images.unsplash.com/photo-1636333329210-0006f2cb24cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="headerIMG" />
          <figcaption>
            <img src={appContext.imageURL} alt="profile" className="profileImg" />
            <h2>{appContext.name}</h2>
            <h2>{user?.email}</h2>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt incidunt quas quaerat molestiae assumenda consequatur necessitatibus dolor deleniti mollitia quod, sapiente, laudantium omnis magnam voluptatum! Cum minima quae veritatis optio. </p>
            <input placeholder="Optional: Enter image URL" onChange={(e) => appContext.setImage(e.target.files[0])} type="file" className="imageInput" />
            <div className="btnBlock">
              <button className="uploadBtn" disabled={!appContext.image} onClick={upload}>
                Upload
              </button>
              <button className="logoutBtn" onClick={logout}>
                Logout
              </button>
            </div>
          </figcaption>
        </figure>
      </div>
    </>
  );
}

export default Profile;

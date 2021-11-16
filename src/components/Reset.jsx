import React, { useEffect, useState, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { auth, sendPasswordResetEmail } from './firebase';
import './Reset.css';
import { Context } from './context.jsx';

function Reset() {
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  const appContext = useContext(Context);

  useEffect(() => {
    if (loading) return;
    if (user) history.replace('/profile');
  }, [user, loading]);

  return (
    <div className="container">
      <h1 className="header">Profile</h1>
      <div className="reset-form">
        <input type="text" className="reset-input" value={appContext.email} onChange={(e) => appContext.setEmail(e.target.value)} placeholder="E-mail Address" />
        <div className="loginBtns">
          <button className="login" onClick={() => sendPasswordResetEmail(appContext.email)}>
            Send password reset email
          </button>
        </div>
        <div className="question">
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Reset;

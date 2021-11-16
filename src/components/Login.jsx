import React, { useEffect, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, signInWithGoogle } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from './context.jsx';
import './Login.css';

function Login() {
  const [user] = useAuthState(auth);
  const history = useHistory();
  const location = useLocation();

  const appContext = useContext(Context);

  useEffect(() => {
    if (user) {
      history.replace('/profile/');
    }
  }, [user]);

  return (
    <div className="container">
      <h1 className="header">Profile</h1>
      <div className="login-form">
        <label htmlFor="email">User Name</label>
        <input type="text" name="email" className="login-input" value={appContext.email} onChange={(e) => appContext.setEmail(e.target.value)} placeholder="E-mail Address" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" className="login-input" value={appContext.password} onChange={(e) => appContext.setPassword(e.target.value)} placeholder="Password" />
        <div className="loginBtns">
          <button className="login" onClick={() => signInWithEmailAndPassword(appContext.email, appContext.password)}>
            Login
          </button>
          <button className="login__google" onClick={signInWithGoogle}>
            Login with Google
          </button>
        </div>
        <div className="question">
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div className="question">
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useEffect, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useHistory } from 'react-router-dom';
import { auth, registerWithEmailAndPassword, signInWithGoogle } from './firebase';
import './Register.css';
import { Context } from './context.jsx';

function Register() {
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  const appContext = useContext(Context);

  const register = () => {
    if (!appContext.name) alert('Please enter name');
    registerWithEmailAndPassword(appContext.name, appContext.email, appContext.password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) {
      history.replace('/profile');
    }
  }, [user, loading]);

  return (
    <div className="container">
      <h1 className="header">Register</h1>
      <div className="reg-form">
        <input type="text" className="reg-input" value={appContext.name} onChange={(e) => appContext.setName(e.target.value)} placeholder="Full Name" />
        <input type="text" className="reg-input" value={appContext.email} onChange={(e) => appContext.setEmail(e.target.value)} placeholder="E-mail Address" />
        <input type="password" className="reg-input" value={appContext.password} onChange={(e) => appContext.setPassword(e.target.value)} placeholder="Password" />
        <div className="loginBtns">
          <button className="login" onClick={register}>
            Login
          </button>
          <button className="login__google" onClick={signInWithGoogle}>
            Register with Google
          </button>
        </div>
        <div className="question">
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Register;

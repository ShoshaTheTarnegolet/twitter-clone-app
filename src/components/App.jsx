import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Nav from './Nav';
import Login from './Login';
import { Context } from './context.jsx';
import Register from './Register';
import Profile from './Profile';
import Reset from './Reset';
import { auth } from './firebase';
import PrivateRoute from './PrivateRoute';
import Tweets from './Tweets';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [posts, setPosts] = useState([]);
  const [tweetMessage, setTweetMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const [nextPosts_loading, setNextPostsLoading] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [lastKey, setLastKey] = useState('');
  const [isLoading, setLoading] = useState(true);

  return (
    <Context.Provider value={{ posts, setPosts, email, setEmail, password, setPassword, name, setName, image, setImage, imageURL, setImageURL, tweetMessage, setTweetMessage, nextPosts_loading, setNextPostsLoading, lastKey, setLastKey, isLoading, setLoading, avatar, setAvatar }}>
      <Router>
        <Nav />
        <div className="app">
          <Switch>
            <Redirect exact from="/" to="/profile" />
            <Route path="/profile" component={Profile} />
            {user ? <Route path="/tweets" component={Tweets} /> : <Route path="/login" component={Login} />}
            {/*            <PrivateRoute  path="/tweets" component={Tweets} /> */}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/reset" component={Reset} />
          </Switch>
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;

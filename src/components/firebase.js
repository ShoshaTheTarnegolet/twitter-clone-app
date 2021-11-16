import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBa04qzg4V139KaO2AWoEO9kyc6EeC3tc4',
  authDomain: 'twitter-clone-app-cc25b.firebaseapp.com',
  projectId: 'twitter-clone-app-cc25b',
  storageBucket: 'twitter-clone-app-cc25b.appspot.com',
  messagingSenderId: '876225310598',
  appId: '1:876225310598:web:32ec70dcfbafb18a73c607',
  measurementId: 'G-40D3K50Y97',
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
let storage = firebase.storage();

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db.collection('users').where('uid', '==', user.uid).get();
    if (query.docs.length === 0) {
      await db.collection('users').add({
        uid: user.uid,
        displayName: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password).then((res) => {
      console.log(res.user);
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection('users').add({
      uid: user.uid,
      displayName: name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

// export default db;
// eslint-disable-next-line import/no-anonymous-default-export
export { storage, auth, db, signInWithGoogle, signInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordResetEmail, logout, firebaseConfig };

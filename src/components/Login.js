import './styles/login.css';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../App';
const url = process.env.REACT_APP_SERVER_URL;

export default function Login() {
  const { setAuthToken, authToken, userID, setUserID } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get('email');
    const password = data.get('password');

    axios
      .post(`${url}/login`, { email, password })
      .then((res) => {
        console.log(res);
        setAuthToken(res.data.token);
        setUserID(res.data.userID);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignUp = () => {
    console.log('signup');
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form className="loginForm" action="" method="post" onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="Email Address" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

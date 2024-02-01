import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../App';
import { Link, Navigate } from 'react-router-dom';
const url = process.env.REACT_APP_SERVER_URL;

export default function Logout() {
  const { setAuthToken, authToken, setUserID, clearAuthCookies } = useContext(AuthContext);

  setAuthToken('');
  setUserID('');
  clearAuthCookies();

  return <Navigate to="/" />;
}

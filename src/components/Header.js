import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/header.css';

export default function Header({ LoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <div className="header">
      <Link to={'/'}>
        <h1> ✏️ Bloggy Admin</h1>
      </Link>

      <div>
        {LoggedIn && (
          <button onClick={handleLogout} className="minor">
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  LoggedIn: PropTypes.bool.isRequired,
};

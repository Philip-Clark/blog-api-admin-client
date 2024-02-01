import './styles/articleListItem.css';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../App';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
const url = process.env.REACT_APP_API_URL;

export default function ArticleListItem({ article, articlesUpdated, setArticlesUpdated }) {
  const { authToken } = useContext(AuthContext);
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${url}/articles/${article._id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        setArticlesUpdated(articlesUpdated + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dateFormatted = moment(article.date).format('MMM Do YY');
  const navigate = useNavigate();
  const handlePublish = (e) => {
    const newArticle = article;
    newArticle.status = article.status === 'published' ? 'unpublished' : 'published';
    newArticle.author = article.author._id;
    e.preventDefault();
    axios
      .put(
        `${url}/articles/${article._id}`,
        { ...newArticle },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((res) => {
        setArticlesUpdated(articlesUpdated + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = () => {
    navigate(`/article/${article._id}/edit`);
  };
  return (
    <div className="articleListItem" key={article._id}>
      <div className="details">
        <h2>{article.title}</h2>
        <p>
          {article.author.userName}, {dateFormatted}, ({article.status})
        </p>
      </div>
      <div className="actions">
        <button onClick={handlePublish}>
          {article.status === 'published' ? 'Unpublish' : 'Publish'}
        </button>
        <button onClick={handleDelete} className="minor">
          Delete
        </button>
        <button onClick={handleEdit} className="minor">
          Edit
        </button>
      </div>
    </div>
  );
}

ArticleListItem.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
      userName: PropTypes.string.isRequired,
    }).isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  articlesUpdated: PropTypes.number.isRequired,
  setArticlesUpdated: PropTypes.func.isRequired,
};

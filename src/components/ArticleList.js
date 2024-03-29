import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';
import ArticleListItem from './ArticleListItem';
import { useNavigate } from 'react-router-dom';
import './styles/articleList.css';

const url = process.env.REACT_APP_API_URL;

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [articlesUpdated, setArticlesUpdated] = useState(0);
  const { userID, userRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const renderArticles = () => {
    if (articles.length === 0) return <p>No articles</p>;
    return (
      <div>
        <h2>My articles</h2>
        {articles
          .filter((article) => article.author._id === userID)
          .map((article) => {
            return (
              <ArticleListItem
                key={article._id}
                article={article}
                setArticlesUpdated={setArticlesUpdated}
                articlesUpdated={articlesUpdated}
              />
            );
          })}
        {userID === '65b430d68ed776359a8a2883' && <h2> Other's articles</h2>}
        {userID === '65b430d68ed776359a8a2883' &&
          articles
            .filter((article) => article.author._id !== userID)
            .map((article) => {
              return (
                <ArticleListItem
                  key={article._id}
                  article={article}
                  setArticlesUpdated={setArticlesUpdated}
                  articlesUpdated={articlesUpdated}
                />
              );
            })}
      </div>
    );
  };

  const handleNew = () => {
    navigate('/new');
  };

  useEffect(() => {
    console.log('EFFECT');
    axios
      .get(`${url}/articles`)
      .then((res) => {
        setArticles(res.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [articlesUpdated]);

  return (
    <div className="articleList">
      <button onClick={handleNew} className="newArticleButton">
        New Article
      </button>
      {renderArticles()}
    </div>
  );
};

export default ArticleList;

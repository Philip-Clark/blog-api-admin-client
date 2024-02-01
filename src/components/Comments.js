import axios from 'axios';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../App';
const url = process.env.REACT_APP_API_URL;
const moment = require('moment');
export default function Comments() {
  const [comments, setComments] = React.useState([]);
  const { authToken } = useContext(AuthContext);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`${url}/articles/${id}/comments`)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const deleteComment = (id) => {
    axios
      .delete(`${url}/comments/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        console.log(res.message);
        setComments(comments.filter((comment) => comment._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Comments</h2>
      {comments.length === 0 && <p>No comments yet</p>}
      {comments.map((comment) => {
        return (
          <div key={comment._id}>
            <p>{comment.author.userName}</p>
            <p>{moment(comment.date).format('MMM Do YYYY, hh:mm A')}</p>
            <p>{comment.content}</p>
            <button onClick={() => deleteComment(comment._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

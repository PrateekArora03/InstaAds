import React from "react";
import axios from "axios";
import { message, Icon } from "antd";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import "./PostItem.scss";

function PostItem({ data, user, fetchPosts }) {
  // Destructur the variables from data object
  const { author, media, description, like, location, views, _id } = data;
  const { name, picture } = author;

  const handleLike = async id => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    try {
      // Make the request to like or unlike the post depending on condition
      const likeOrUnlike = !like.includes(user._id) ? "like" : "unlike";
      await axios.patch(`http://localhost:3000/api/post/${id}/${likeOrUnlike}`, null, {
        headers: {
          Authorization: token
        }
      });
      // Fetch the posts after the request
      fetchPosts(token)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <article className="post-container">
      <header className="post-header-section">
        <div className="post-profile">
          <div className="post-profile-img" title="name profile picture">
            <img
              src={picture ? picture : "https://tinyurl.com/utjf6jw"}
              alt={`${name} profile`}
            />
          </div>
          <div className="post-profile-name">
            <h2 title="User Profile name">{name}</h2>
          </div>
        </div>
        <div className="more-btn-section">
          <button className="more-btn">...</button>
        </div>
      </header>
      <div className="post-img-section">
        <img src={media} alt="business ad" />
      </div>
      <footer className="post-footer-section">
        <div className="activity-section">
          <span className="like-section">
            <button className="like-btn" onClick={() => handleLike(_id)}>
              {like.includes(user._id) ? <FaHeart /> : <FaRegHeart />}
            </button>
            <span className="like-count">{like.length}</span>
          </span>
          <span className="share-section">
            <svg viewBox="0 0 24 24" className="share-svg">
              <g>
                <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path>
                <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path>
              </g>
            </svg>
          </span>
        </div>
        <div className="description-section">
          <span className="description-author">{name}</span>
          <span className="description-data">{description}</span>
        </div>
      </footer>
    </article>
  );
}

export default PostItem;

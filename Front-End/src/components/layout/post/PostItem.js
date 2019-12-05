import React from "react";
import axios from "axios";
import { message } from "antd";
import "./PostItem.scss";

function PostItem({ data }) {
  // Destructur the variables from data object
  const { author, media, description, like, location, views, _id } = data;
  const { name, picture } = author;

  const handleLike = async id => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    try {
      await axios.patch(`http://localhost:3000/api/post/${id}/like`, null, {
        headers: {
          Authorization: token
        }
      });
      message.success("Post like");
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
              <svg viewBox="0 0 24 24" className="like-svg">
                <g>
                  <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                </g>
              </svg>
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

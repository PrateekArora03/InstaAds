import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Popover, Button, Avatar, Icon } from "antd";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./PostItem.scss";

function PostItem({ data, user, fetchPosts, view }) {
  // State
  const [visible, toggleVisible] = useState(false);

  // Destructur the variables from data object
  const {
    author,
    media,
    description,
    like,
    _id,
    expireDate,
    isImage,
    views
  } = data;
  const { name, picture } = author;

  const handleLike = async (id, e) => {
    const currentClass = e.currentTarget.className;
    e.currentTarget.setAttribute(
      "class",
      `${currentClass === "like-btn-liked" ? "like-btn" : "like-btn-liked"}`
    );
    const token = JSON.parse(localStorage.getItem("authToken"));
    try {
      // Make the request to like or unlike the post depending on condition
      const likeOrUnlike = !like.includes(user._id) ? "like" : "unlike";
      const postType = !expireDate ? "post" : "adpost";
      await axios.patch(`/api/${postType}/${id}/${likeOrUnlike}`, null, {
        headers: {
          Authorization: token
        }
      });
      // Fetch the posts after the request
      fetchPosts(token);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Delete
  const handleDelete = async id => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    try {
      await axios.delete(`/api/post/${id}`, {
        headers: {
          Authorization: token
        }
      });
      // Fetch the posts after the request
      fetchPosts(token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <article className="post-container">
      <header className="post-header-section">
        <div className="post-profile">
          <div className="post-profile-img" title="name profile picture">
            {picture ? (
              <img alt="profile" className="user-profile-img" src={picture} />
            ) : (
              <Avatar
                style={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf"
                }}
              >
                {name.split(" ")[0]}
              </Avatar>
            )}
          </div>
          <div className="post-profile-name">
            <h2 title="User Profile name">{name}</h2>
          </div>
        </div>
        {user && (
          <div className="more-btn-section">
            {!expireDate ? (
              <Popover
                content={
                  <ul className="more-option-list">
                    {/* Provide the delete option if only user owns the post */}
                    {author._id === user._id ? (
                      <>
                        <li className="more-list-item">
                          <button
                            className="more-list-btn"
                            onClick={() => handleDelete(_id)}
                          >
                            Delete
                          </button>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                  </ul>
                }
                title=""
                trigger="click"
                visible={visible}
                onVisibleChange={() => toggleVisible(!visible)}
              >
                <Button type="primary">...</Button>
              </Popover>
            ) : (
              "sponsored"
            )}
          </div>
        )}
      </header>
      <div className="post-img-section">
        {isImage ? (
          <img
            className={view === "profile" ? "post-profile-image" : ""}
            src={media}
            alt="business ad"
          />
        ) : (
          <iframe
            className={view === "profile" ? "" : "youtube"}
            src={`https://www.youtube.com/embed/${media}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="youtube"
          ></iframe>
        )}
      </div>
      <footer className="post-footer-section">
        {user && (
          <div className="activity-section">
            <span className="like-section">
              <button
                className={
                  like.includes(user._id) ? "like-btn-liked" : "like-btn"
                }
                onClick={e => handleLike(_id, e)}
              >
                {like.includes(user._id) ? <FaHeart /> : <FaRegHeart />}
              </button>
              <span className="like-count">{like.length}</span>
            </span>
          </div>
        )}
        <div className="description-section">
          <span className="description-author">{name}</span>
          <span className="description-data">{description}</span>
          {view === "profile" && (
            <span style={{ float: "right" }}>
              <span>
                <Icon type="eye" />
                {views}
              </span>
              <span style={{ marginLeft: "5px" }}>
                <Icon type="like" />
                {like.length}
              </span>
            </span>
          )}
        </div>
      </footer>
    </article>
  );
}

export default withRouter(PostItem);

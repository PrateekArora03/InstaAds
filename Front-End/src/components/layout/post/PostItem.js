import React from "react";
import "./PostItem.scss";
function PostItem() {
  return (
    <article className="post-container">
      <header className="post-header-section">
        <div className="post-profile">
          <div className="post-profile-img" title="name profile picture">
            <img
              src="https://scontent-bom1-2.cdninstagram.com/vp/00f369deb2874e6b37b238a0d55ef41d/5E59BE63/t51.2885-19/s150x150/72638235_401535480723773_681441164745768960_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com"
              alt="name profile picture"
            />
          </div>
          <div className="post-profile-name">
            <h2 title="User Profile name">Prateek</h2>
          </div>
        </div>
        <div className="more-btn-section">
          <button className="more-btn">...</button>
        </div>
      </header>
    </article>
  );
}

export default PostItem;

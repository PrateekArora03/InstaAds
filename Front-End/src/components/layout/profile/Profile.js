import React from "react";
import { Link } from "react-router-dom";
import "./Profile.scss";

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile container center">
        <div className="profile-img-section">
          {/* TODO: replace the link of the image with dynamic one */}
          <img
            alt="profile"
            className="user-profile-img"
            src="https://scontent-del1-1.cdninstagram.com/vp/00bfc7b9f7519e644ec0c6e064ffbbd4/5E55977A/t51.2885-19/s150x150/65578934_692329671194784_1804334869359099904_n.jpg?_nc_ht=scontent-del1-1.cdninstagram.com"
          />
        </div>
        <div className="profile-details">
          <div className="profile-main">
            {/* TODO: Replace the user name */}
            <h3 className="user-name">Prateek Arora</h3>
            {/* TODO: Show the button on condition */}
            <Link className="user-edit-link" to="accounts/edit">
              Edit Profile
            </Link>
          </div>
          <div className="description-container">
            <p className="user-description">
              {/* TODO: Add dynamic data */}
              ▪️ Self Taught Developer 💻 ▪️ Learn In Public 🔥 ▪️Share My Daily
              Code Life 👨‍💻 ▪️ Now a Day:- #React 🚀 📍 India 🇮🇳 ▪️ make my
              parents 🥰 proud
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

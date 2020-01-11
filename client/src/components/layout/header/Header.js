import React from "react";
import { Link } from "react-router-dom";
import { Button, Menu, Dropdown, Icon } from "antd";
import "./Header.scss";

function Header(props) {
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/new">New Post</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/newBoost">Boost Post</Link>
      </Menu.Item>
    </Menu>
  );

  //TODO: Add logOut
  return (
    <header className="header">
      <div className="container center">
        <h1 className="header-h1">
          <Link aria-label="y4ia Services title" title="y4ia Services" to="/">
            <img src="/y4ia.png" />
          </Link>
        </h1>
        {props.user !== null && !props.user.isAdmin ? (
          <nav className="header-nav">
            <ul>
              <li>
                <Dropdown overlay={menu}>
                  <Button type="primary">
                    Action <Icon type="down" />
                  </Button>
                </Dropdown>
              </li>
              <li className="home-profile">
                <Link title="Home" to="/">
                  <svg
                    aria-label="Home"
                    viewBox="0 0 512 512"
                    fill="#262626"
                    height="24"
                    width="24"
                  >
                    <path d="M506.555 208.064L263.859 30.367a13.3 13.3 0 00-15.716 0L5.445 208.064c-5.928 4.341-7.216 12.665-2.875 18.593s12.666 7.214 18.593 2.875L256 57.588l234.837 171.943a13.236 13.236 0 007.848 2.57c4.096 0 8.138-1.885 10.744-5.445 4.342-5.927 3.054-14.251-2.874-18.592z" />
                    <path d="M442.246 232.543c-7.346 0-13.303 5.956-13.303 13.303v211.749H322.521V342.009c0-36.68-29.842-66.52-66.52-66.52s-66.52 29.842-66.52 66.52v115.587H83.058V245.847c0-7.347-5.957-13.303-13.303-13.303s-13.303 5.956-13.303 13.303V470.9c0 7.347 5.957 13.303 13.303 13.303h133.029c6.996 0 12.721-5.405 13.251-12.267.032-.311.052-.651.052-1.036V342.01c0-22.009 17.905-39.914 39.914-39.914s39.914 17.906 39.914 39.914V470.9c0 .383.02.717.052 1.024.524 6.867 6.251 12.279 13.251 12.279h133.029c7.347 0 13.303-5.956 13.303-13.303V245.847c-.001-7.348-5.957-13.304-13.304-13.304z" />
                  </svg>
                </Link>
                <Link title="Profile" to="/profile">
                  <svg
                    aria-label="Profile"
                    className="_8-yf5 "
                    fill="#262626"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <g>
                      <path d="M24 27c-7.1 0-12.9-5.8-12.9-12.9s5.8-13 12.9-13c7.1 0 12.9 5.8 12.9 12.9S31.1 27 24 27zm0-22.9c-5.5 0-9.9 4.5-9.9 9.9s4.4 10 9.9 10 9.9-4.5 9.9-9.9-4.4-10-9.9-10zM44 46.9c-.8 0-1.5-.7-1.5-1.5V42c0-5-4-9-9-9h-19c-5 0-9 4-9 9v3.4c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V42c0-6.6 5.4-12 12-12h19c6.6 0 12 5.4 12 12v3.4c0 .8-.7 1.5-1.5 1.5z"></path>
                    </g>
                  </svg>
                </Link>
              </li>
              <li>
                <Icon
                  style={{ cursor: "pointer" }}
                  title="Logout"
                  onClick={() => props.logOutUser()}
                  type="logout"
                />
              </li>
            </ul>
          </nav>
        ) : !props.user ? (
          <div>
            <Link style={{ marginRight: "10px" }} to="/login">
              <Button type="primary">Login</Button>
            </Link>
            <Link to="/register">
              <Button type="ghost">Sign up</Button>
            </Link>
          </div>
        ) : (
          <Icon
            style={{ cursor: "pointer" }}
            title="Logout"
            onClick={() => props.logOutUser()}
            type="logout"
          />
        )}
      </div>
    </header>
  );
}

export default Header;

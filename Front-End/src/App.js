import React from "react";
import Header from "./components/layout/header/Header";
import Post from "./components/layout/post/PostItem";
import Profile from "./components/layout/profile/Profile";
import PostItem from "./components/layout/post/PostItem";
import axios from "axios";

class App extends React.Component {
  state = {
    user: null
  };

  componentDidMount() {
    if (localStorage.authToken) {
      this.fetchUser(JSON.parse(localStorage.authToken));
    }
  }

  fetchUser = async token => {
    try {
      const req = await axios.get("http://localhost:3000/api/user", {
        headers: {
          // TODO: Add dynamic token
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZGNmZjRmNTFhOTFlOTAwMjQ5MzIzYzciLCJpYXQiOjE1NzQzMjczOTAsImV4cCI6MTU3NTUzNjk5MH0.Q-95CB7otdxXXL2i8XGseuajKCxtMX6J5GSGVrw44JA"
        }
      });

      localStorage.setItem("authToken", JSON.stringify(token));
      // Update the state
      this.setState({ user: req.data.user });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="App">
        {
          <>
            {/* <Header /> */}
            {/* <PostItem /> */}
            {/* <Profile /> */}
            {/* <Home /> */}
          </>
        }
      </div>
    );
  }
}

export default App;

import React from "react";
import Header from "./components/layout/header/Header";
import Post from "./components/layout/post/PostItem";
import Profile from "./components/layout/profile/Profile";
import PostItem from "./components/layout/post/PostItem";
function App() {
  return (
    <div className="App">
      {
        <>
          <Header />
          {/* <PostItem /> */}
        </>
      }
    </div>
  );
}

export default App;

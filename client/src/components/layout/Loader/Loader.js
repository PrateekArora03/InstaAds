import React from "react";
import "./Loader.scss";

function Loader() {
  return (
    <div className="loader-container">
      <img className="loader-image" src="/loader.png" alt="loader" />
    </div>
  );
}

export default Loader;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "antd";

const SharePost = ({
  match: {
    params: { postId }
  },
  history
}) => {
  const [post, setPost] = useState({});
  useEffect(() => {
    (async () => {
      const res = await axios.get(`/api/post/${postId}`, {
        headers: {
          Authorization: JSON.parse(localStorage.authToken)
        }
      });
      setPost(res.data.post);
    })();
  }, []);

  const { author, media, description, isImage } = post;
  return (
    <Modal
      visible={postId ? true : false}
      onOk={() => history.push("/")}
      onCancel={() => history.push("/")}
    >
      {isImage ? (
        <img style={{ width: "100%" }} src={`/${media}`} alt="business ad" />
      ) : (
        <iframe
          className="youtube"
          src={`https://www.youtube.com/embed/${media}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="youtube"
        ></iframe>
      )}
      <div style={{ marginTop: "8px" }} className="description-section">
        <span className="description-data" style={{ fontSize: "16px" }}>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            {author && author.name}
          </span>{" "}
          {description}
        </span>
      </div>
    </Modal>
  );
};

export default SharePost;

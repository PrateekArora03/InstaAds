import React from "react";
import { Tabs } from "antd";

import Post from "./Dashboard/Post";
import AdPost from "./Dashboard/AdPost";
import Carousel from "./Dashboard/Carousel";

const { TabPane } = Tabs;

function dashboard() {
  return (
    <div
      style={{
        width: "80vw",
        margin: "0 auto"
      }}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Post approval" key="1">
          <Post />
        </TabPane>
        <TabPane tab="Ads approval" key="2">
          <AdPost />
        </TabPane>
        <TabPane tab="Carousel" key="3">
          <Carousel />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default dashboard;

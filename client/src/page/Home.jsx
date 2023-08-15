import React from "react";
import CreatePost from "../component/CreatePost";
import { Box } from "@mui/material";
import Post from "../component/Post";

const Home = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <CreatePost />
      <Post />
    </Box>
  );
};

export default Home;

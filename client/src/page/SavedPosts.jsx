import { Box, Typography } from "@mui/material";
import React from "react";
import Post from "../component/Post";

const SavedPosts = () => {
  const posts = [{ name: "hello" }, { name: "hello2" }];
  return (
    <Box>
      <Typography
        sx={{ color: "var(--grayTitle)", fontSize: "4rem", opacity: "0.3" }}
      >
        Saved Posts
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* <Post />
        <Post /> */}
        {posts.map((item) => {
          return <Post key={item.name} />;
        })}
      </Box>
    </Box>
  );
};

export default SavedPosts;

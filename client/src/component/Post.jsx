import React from "react";
import {
  Avatar,
  Box,
  Card,
  Grid,
  ImageList,
  ImageListItem,
  TextField,
  Typography,
} from "@mui/material";
import pic1 from "../assets/image/pic1.jpeg";
import { config } from "../config";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";

const Post = () => {
  const content =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, cum cupiditate deleniti ducimus et eveniet ex excepturi fuga magnam, maiores nam pariatur quibusdam, recusandae reprehenderit sapiente sed sint veniam? Beatae.";

  const itemData = [
    { img: "hello" },
    { img: "hello1" },
    { img: "hell2" },
    { img: "hello3" },
    { img: "hell4" },
    { img: "hello5" },
    { img: "hello6" },
  ];
  // css
  const dots = [];
  for (let i = 0; i < 3; i++) {
    dots.push(
      <Box
        key={i}
        sx={{
          height: "0.2rem",
          width: "0.2rem",
          borderRadius: "0.2rem",
          backgroundColor: "var(--grayTitle)",
        }}
      ></Box>
    );
  }
  return (
    <Card sx={{ padding: "1.3rem" }}>
      {/* Title  */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Avatar sx={{ width: 45, height: 45 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography>
              <b>John Does </b>shared an album
            </Typography>
            <Typography>2 hours ago</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 0.3 }}>{dots}</Box>
      </Box>
      {/* Content */}
      <Typography
        variant="body1"
        sx={{ mt: "1.5rem", mb: "1.5rem", fontWeight: 400, fontSize: "1rem" }}
      >
        {content}
      </Typography>

      {/* images */}
      <ImageList sx={{ height: 500 }} cols={2} rowHeight={300}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img src={pic1} loading="lazy" style={{ borderRadius: "0.4rem" }} />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Link, Comment, Share */}
      <Box sx={{ display: "flex", gap: 5 }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <FavoriteBorderIcon />
          <Typography>10</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <ChatBubbleOutlineIcon />
          <Typography>10</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <ShareIcon />
          <Typography>10</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: "2rem" }}>
        <Avatar sx={{ width: 45, height: 45 }} />

        <TextField
          placeholder="Leave a Comment"
          variant="outlined"
          fullWidth
          InputProps={{
            style: {
              borderRadius: "2rem",
            },
          }}
        />
      </Box>
    </Card>
  );
};

export default Post;

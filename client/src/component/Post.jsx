import React, { useState } from "react";
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
import PostOptions from "./PostOptions";

const Post = ({
  content,
  name,
  imageData,
  time,
  postId,
  saved,
  owner,
  hide,
  pageName,
}) => {
  const [option, setOption] = useState(false);
  // no of colums
  // const col = imageData.length > 1 ? 2 : 1;
  // const row = imageData.length

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
    <Box sx={{ position: "relative" }}>
      {option && (
        <Box
          sx={{
            position: "absolute",
            top: 60,
            right: -14,
            // width: "60%",
            zIndex: 200,
          }}
        >
          <PostOptions
            postId={postId}
            saved={saved}
            owner={owner}
            hide={hide}
            pageName={pageName}
            setOption={setOption}
          />
        </Box>
      )}

      <Card sx={{ padding: "1.3rem" }} onClick={() => setOption(false)}>
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
                <b>{`${name}`} </b>shared an album
              </Typography>
              <Typography>{`${time}`} ago</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 0.3,
              cursor: "pointer",
              padding: "0.5rem",
            }}
            onClick={(e) => {
              setOption(!option);
              e.stopPropagation();
            }}
          >
            {dots}
          </Box>
        </Box>
        {/* Content */}
        <Typography
          variant="body1"
          sx={{ mt: "1.5rem", mb: "1.5rem", fontWeight: 400, fontSize: "1rem" }}
        >
          {content}
        </Typography>

        {/* images */}
        {imageData.length > 0 && (
          <ImageList sx={{ height: 400 }} cols={2} rowHeight={300}>
            {imageData.map((item) => {
              const blob = new Blob([Int8Array.from(item.data.data)], {
                type: item.contentType,
              });

              const image = window.URL.createObjectURL(blob);
              return (
                <ImageListItem key={item._id}>
                  <img
                    src={image}
                    loading="lazy"
                    style={{ borderRadius: "0.4rem" }}
                  />
                </ImageListItem>
              );
            })}
          </ImageList>
        )}

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
    </Box>
  );
};

export default Post;

import {
  Avatar,
  Box,
  Button,
  Card,
  TextField,
  TextareaAutosize,
  makeStyles,
} from "@mui/material";
import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { config } from "../config";
import { useSelector } from "react-redux";
import axios from "axios";
import { getAccessToken } from "../util";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const auth = useSelector((state) => state.auth.user);

  const createPostRequest = async (body) => {
    const res = await axios.post(config.urls.post.createPost(), body, {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
        "Content-Type": "multipart/formdata",
      },
    });
    console.log("res", res);
  };

  //onClick
  const onShare = () => {
    console.log("content", content);
    console.log("image", image);
    var formData = new FormData();

    image.map((item) => {
      formData.append("images", item);
    });

    formData.append("email", auth.email);
    formData.append("content", content);
    // const post = {
    //   email: auth.email,
    //   content,
    //   image: formData,
    // };
    const post = formData;

    createPostRequest(post);
  };

  // styled component
  //   const useStyles = makeStyles((theme) => ({
  //     root: {
  //       "& .MuiTextField-root": {
  //         margin: theme.spacing(1),
  //       },
  //     },
  //     textarea: {
  //       resize: "both",
  //     },
  //   }));
  //   const classes = useStyles();
  return (
    <Card sx={{ padding: "1rem", fontWeight: 300 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Avatar sx={{ width: 45, height: 45 }} />
        {/* <TextareaAutosize
          minRows={3}
          maxRows={10}
          fullWidth
          sx={{ outerWidth: "100rem" }}
        /> */}
        <TextField
          value={content}
          placeholder="What's on your mind,Kishan ?"
          multiline
          variant="outlined"
          fullWidth
          minRows={2}
          resize="both"
          maxRows={10}
          autoFocus={false}
          inputProps={{
            className: {
              textarea: {
                resize: "both",
              },
            },
          }}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </Box>

      {/* selected Image */}

      {/* {image &&
        image.map((item) => {
          return (
            <div>
              <img
                alt="not found"
                width={"50px"}
                src={URL.createObjectURL(item)}
              />
              <br />
              <button onClick={() => setImage(null)}>Remove</button>
            </div>
          );
        })} */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: "1rem",
          alignItems: "center",
        }}
      >
        {/* 3 icons */}
        <Box
          sx={{
            display: "flex",

            justifyContent: "space-evenly",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <input
              type="file"
              name="myImage"
              accept="image/*"
              multiple
              // value={image}
              onChange={(event) => {
                console.log("file", event.target.files);
                // setImage(event.target.files[0]);
                setImage(Object.values(event.target.files));
              }}
            />

            {/* <AddPhotoAlternateIcon sx={{ fontSize: "1.7rem" }} />
            Photos */}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <PersonOutlineIcon sx={{ fontSize: "1.7rem" }} />
            People
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <LocationOnOutlinedIcon sx={{ fontSize: "1.7rem" }} />
            Checked In
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <SentimentSatisfiedAltIcon sx={{ fontSize: "1.7rem" }} />
            Mood
          </Box>
        </Box>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "var(--blue)",
            fontSize: "0.95rem",
            paddingX: "1.5rem",
          }}
          onClick={onShare}
        >
          Share
        </Button>
      </Box>
    </Card>
  );
};

export default CreatePost;

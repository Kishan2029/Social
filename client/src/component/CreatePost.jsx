import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  TextField,
  TextareaAutosize,
  makeStyles,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CancelIcon from "@mui/icons-material/Cancel";
import { config } from "../config";
import { useSelector } from "react-redux";
import axios from "axios";
import { getAccessToken, stringToColor } from "../util/helper";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import Loading from "./Loading";
import UserAvatar from "./UserAvatar";
import { notify } from "../util/notify";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const auth = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  const createPostRequest = async (body) => {
    const res = await axios.post(config.urls.post.createPost(), body, {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
        "Content-Type": "multipart/formdata",
      },
    });
  };

  const mutation = useMutation({
    mutationFn: (body) => createPostRequest(body),
    onSuccess: async (data) => {
      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries(["userPost"]);
      queryClient.invalidateQueries(["savedPosts"]);

      // queryClient.setQueriesData(["posts"], (oldData) => {
      //   const newData = [
      //     {
      //       _id: body.postId,
      //       postId: body.postId,
      //       name: body.other.name,
      //       postTime: body.other.time,
      //       content: body.other.content,
      //       images: body.other.imageData,
      //       saved: true,
      //       owner: body.other.owner,
      //       hide: body.other.hide,
      //       pageName: "savePost",
      //     },
      //     ...oldData,
      //   ];

      //   return newData;
      // });
    },
  });

  //onClick
  const onShare = () => {
    if (image === null && content === "") {
      notify("error", "Write something or attach a photo");
      return;
    }
    var formData = new FormData();

    image?.map((item) => {
      formData.append("images", item);
    });

    formData.append("email", auth.email);
    formData.append("content", content);
    const post = formData;
    mutation.mutate(post);
    setContent("");
    setImage(null);
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

  // if (mutation.isLoading) return <Loading />;
  // else if (mutation.isSuccess) return "Success";

  return (
    <Card sx={{ padding: "1rem", fontWeight: 300 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <UserAvatar name={auth.name} avatar={auth.avatar} />
        {/* {auth.avatar !== null ? (
          <Avatar
            src={auth.avatar}
            sx={{
              width: 45,
              height: 45,
            }}
          />
        ) : (
          <Avatar
            sx={{
              width: 45,
              height: 45,
              fontSize: "5rem",
              backgroundColor: stringToColor(auth.name),
            }}
          >
            K{auth.name[0]}
          </Avatar>
        )} */}

        {/* <TextareaAutosize
          minRows={3}
          maxRows={10}
          fullWidth
          sx={{ outerWidth: "100rem" }}
        /> */}
        <TextField
          value={content}
          placeholder={`What's on your mind, ${auth.name} ?`}
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
      <Box
        sx={{
          display: "flex",
          mt: "1rem",
          rowGap: 4,
          columnGap: 4,
          flexWrap: "wrap",
        }}
      >
        {image &&
          image.map((item) => {
            return (
              <Box sx={{ display: "flex" }} key={item.name}>
                <img
                  style={{ borderRadius: "1rem" }}
                  alt="not found"
                  width={"160px"}
                  // height={"80px"}
                  src={URL.createObjectURL(item)}
                />
                <br />

                <CancelIcon
                  sx={{ alignSelf: "start" }}
                  onClick={() => {
                    setImage((prevState) => {
                      return prevState.filter(
                        (image) => image.name !== item.name
                      );
                    });
                  }}
                />
              </Box>
            );
          })}
      </Box>
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
            <label
              htmlFor="image-upload"
              style={{ display: "flex", alignItems: "center" }}
            >
              <AddPhotoAlternateIcon sx={{ fontSize: "1.7rem" }} />
              <span>Photos</span>
            </label>
            <input
              id="image-upload"
              style={{ display: "none" }}
              type="file"
              name="myImage"
              accept="image/*"
              multiple
              // value={image}
              onChange={(event) => {
                // setImage(event.target.files[0]);
                setImage(Object.values(event.target.files));
              }}
            />
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

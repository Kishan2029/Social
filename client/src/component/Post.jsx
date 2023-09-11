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
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import PostOptions from "./PostOptions";
import { generateImageUrl } from "../util/helper";
import { likePost, addComment, addNotification } from "../reactQuery/mutation";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import Comment from "./Comment";

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
  likeBoolean,
  likeCount,
  commentMessageCount = 0,
}) => {
  const [option, setOption] = useState(false);
  const [like, setLike] = useState(likeBoolean);
  const [count, setCount] = useState(likeCount);
  const [commentCount, setCommentCount] = useState(commentMessageCount);
  const [openComment, setOpenComment] = useState(false);
  const [commentMessage, setCommentMessage] = useState("");
  const auth = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  // mutations
  const notificationMutation = useMutation({
    mutationFn: (body) => addNotification(body),
  });

  const likeMutation = useMutation({
    mutationFn: (body) => likePost(body),
    onSuccess: async (queryKey, body) => {
      console.log("success like");
      if (!owner && body.changeState) {
        notificationMutation.mutate({
          type: "like",
          postId: body.postId,
          email: auth.email,
        });
      }

      // queryClient.setQueriesData(["posts"], (oldData) => {
      //   const newData = oldData.map((item) => {
      //     if (item._id === body.postId) {
      //       return {
      //         ...item,
      //         like: body.like,
      //         likeCount: body.like ? item.likeCount + 1 : item.likeCount - 1,
      //       };
      //     } else {
      //       return item;
      //     }
      //   });
      //   console.log("new", newData);
      //   return newData;
      // });
      // queryClient.setQueriesData(["userPosts"], (oldData) => {
      //   const newData = oldData.map((item) => {
      //     if (item._id === body.postId) {
      //       return {
      //         ...item,
      //         likeBoolean: body.like,
      //         likeCount: body.like ? item.likeCount + 1 : item.likeCount - 1,
      //       };
      //     } else {
      //       return item;
      //     }
      //   });
      //   return newData;
      // });
      // queryClient.setQueriesData(["savedPosts"], (oldData) => {
      //   const newData = oldData.map((item) => {
      //     if (item._id === body.postId) {
      //       return {
      //         ...item,
      //         likeBoolean: body.like,
      //         likeCount: body.like ? item.likeCount + 1 : item.likeCount - 1,
      //       };
      //     } else {
      //       return item;
      //     }
      //   });
      //   return newData;
      // });

      await queryClient.invalidateQueries({
        queryKey: ["userPosts"],
        exact: true,
        refetchType: "inactive",
      });
      // queryClient.invalidateQueries(["userPosts"]);
      // queryClient.invalidateQueries(["savedPosts"]);
      // queryClient.invalidateQueries({
      //   queryKey: ["userPosts"],
      //   refetchType: "all",
      // });
    },
  });

  const commentMutation = useMutation({
    mutationFn: (body) => addComment(body),
    onMutate: async (body) => {
      console.log(body);
      console.log("onMutate");
      setCommentCount((old) => Number(old) + 1);
      queryClient.setQueriesData(["comments", postId], (oldData) => {
        const newData = [
          {
            name: auth.name,
            time: "0 second ago",
            message: body.message,
          },
          ...oldData,
        ];

        return newData;
      });
    },
    onSuccess: async (queryKey, body) => {
      // set data
      console.log("comment success");
      queryClient.invalidateQueries(["comments", postId]);
      if (!owner) {
        notificationMutation.mutate({
          type: "like",
          postId: body.postId,
          email: auth.email,
        });
      }
      // queryClient.setQueriesData(["comments", postId], (oldData) => {
      //   const newData = [
      //     ...oldData,
      //     {
      //       name: auth.name,
      //       time: "few seconds ago",
      //       message: body.message,
      //     },
      //   ];

      //   return newData;
      // });
    },
  });

  const clickLike = (changeState) => {
    likeMutation.mutate({
      email: auth.email,
      postId: postId,
      like: changeState,
    });
    setLike(changeState);
    changeState
      ? setCount((count) => count + 1)
      : setCount((count) => count - 1);
  };
  // console.log("commentMessageCount", commentMessageCount);
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
            width: "31%",
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
            otherData={{
              content,
              name,
              imageData,
              time,
              postId,
              saved,
              owner,
              hide,
              pageName,
            }}
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
              return (
                <ImageListItem key={item._id}>
                  <img
                    src={generateImageUrl(item)}
                    loading="lazy"
                    style={{ borderRadius: "0.4rem" }}
                  />
                </ImageListItem>
              );
            })}
          </ImageList>
        )}

        {/* Like, Comment, Share */}
        <Box sx={{ display: "flex", gap: 5 }}>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {like ? (
              <>
                <FavoriteIcon
                  sx={{ color: "red", borderColor: "black" }}
                  onClick={() => clickLike(false)}
                />
                <Typography>{count}</Typography>
              </>
            ) : (
              <>
                <FavoriteBorderIcon sx={{}} onClick={() => clickLike(true)} />
                <Typography>{count}</Typography>
              </>
            )}
          </Box>
          {/* Comment */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <ChatBubbleOutlineIcon
              onClick={() => setOpenComment((old) => !old)}
            />
            <Typography>{commentCount}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <ShareIcon />
            <Typography>10</Typography>
          </Box>
        </Box>

        {/* Comment text */}
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
            value={commentMessage}
            onChange={(e) => setCommentMessage(e.target.value)}
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                ev.preventDefault();
                // console.log("comment", commentMessage);
                commentMutation.mutate({
                  email: auth.email,
                  postId,
                  message: commentMessage,
                });
                setCommentMessage("");
                setOpenComment(true);
              }
            }}
          />
        </Box>

        {/* Comment List */}
        {openComment && (
          <Box sx={{ mt: "2rem" }}>
            <Comment postId={postId} />
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default Post;

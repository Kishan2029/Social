import React, { useEffect, useState } from "react";
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
import { generateImageUrl, stringToColor } from "../util/helper";
import {
  likePost,
  addComment,
  addNotification,
  addFriend,
} from "../reactQuery/mutation";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import UserAvatar from "./UserAvatar";
import { fetchComments } from "../reactQuery/query";

const Post = ({
  content,
  name,
  imageData,
  avatar,
  time,
  postId,
  saved,
  owner,
  hide,
  pageName,
  likeBoolean,
  likeCount,
  commentMessageCount = 0,
  friend,
  createdBy,
}) => {
  const [option, setOption] = useState(false);
  const [like, setLike] = useState(likeBoolean);
  const [count, setCount] = useState(likeCount);
  const [commentCount, setCommentCount] = useState(commentMessageCount);
  const [openComment, setOpenComment] = useState(false);
  const [commentMessage, setCommentMessage] = useState("");
  const [friendStatus, setFriendStatus] = useState(friend);
  const auth = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  // mutations
  const notificationMutation = useMutation({
    mutationFn: (body) => addNotification(body),
    onSuccess: () => {
      console.log("notification mutation success");
    },
  });

  const likeMutation = useMutation({
    mutationFn: (body) => likePost(body),
    onSuccess: async (queryKey, body) => {
      console.log("success like");

      if (!owner) {
        notificationMutation.mutate({
          type: "like",
          postId: body.postId,
          email: auth.email,
          value: body.like,
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
      setCommentCount((old) => Number(old) + 1);
      queryClient.setQueriesData(["comments", postId], (oldData) => {
        const newData = [
          {
            name: auth.name,
            time: "0 second ago",
            message: body.message,
            avatar: auth.avatar,
            id: Math.floor(Math.random() * 90000) + 10000,
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
          type: "comment",
          postId: body.postId,
          email: auth.email,
          value: true,
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

  const friendMutation = useMutation({
    mutationFn: (body) => addFriend(body),
    onMutate: async (body) => {},
    onSuccess: async (queryKey, body) => {
      // set data
      console.log("friend success");
      if (!owner) {
        notificationMutation.mutate({
          type: "follow",
          postId: body.postId,
          email: auth.email,
          value: body.add,
        });
      }

      queryClient.setQueriesData(["posts"], (oldData) => {
        const newData = oldData.map((item) => {
          if (body.friendId === item.createdBy) {
            // console.log("body");
            item.friend = body.add;
            item.new = "new";
          }
          return item;
        });
        return newData;
      });
      queryClient.setQueriesData(["savedPosts"], (oldData) => {
        const newData = oldData.map((item) => {
          if (body.friendId === item.createdBy) {
            // console.log("body");
            item.friend = body.add;
            item.new = "new";
          }
          return item;
        });
        return newData;
      });
    },
  });

  // const { data, error, isError, isLoading } = useQuery({
  //   queryFn: () => fetchComments({ postId }),
  //   queryKey: ["comments", postId],
  // });

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

  const clickFollow = (changeState) => {
    friendMutation.mutate({
      email: auth.email,
      friendId: createdBy,
      add: changeState,
      postId,
    });

    setFriendStatus(changeState);
  };

  // whenever friend changes update friendStatus
  useEffect(() => {
    setFriendStatus(friend);
  }, [friend]);
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
              // alignItems: "center",
            }}
          >
            <UserAvatar avatar={avatar} name={name} />
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
            {!owner && (
              <Typography
                sx={{
                  ml: "2rem",
                  color: friendStatus ? "var(--grayTitle)" : "var(--blue)",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
                onClick={() => clickFollow(!friendStatus)}
              >
                {friendStatus ? "Following" : "Follow"}
              </Typography>
            )}
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
          <ImageList variant="masonry" cols={2} rowHeight={300} gap={5}>
            {imageData.map((item, index) => {
              return (
                <ImageListItem key={index}>
                  <img
                    src={item}
                    loading="lazy"
                    style={{
                      borderRadius: "0.4rem",
                    }}
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
          {/* <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <ShareIcon />
            <Typography>10</Typography>
          </Box> */}
        </Box>
        {/* Comment text */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: "2rem" }}>
          <UserAvatar avatar={auth.avatar} name={auth.name} />

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
                console.log("Enter Pressed");
                ev.preventDefault();

                // console.log("comment", commentMessage);
                if (commentMessage !== "") {
                  setOpenComment(true);
                  setCommentMessage("");
                  commentMutation.mutate({
                    email: auth.email,
                    postId,
                    message: commentMessage,
                  });
                }
              }
            }}
          />
        </Box>
        {/* Comment List */}
        {/* {openComment && (
          <Box sx={{ mt: "2rem" }}>
            <Comment postId={postId} />
          </Box>
        )} */}
        <Box sx={{ mt: "2rem", display: openComment ? "block" : "none" }}>
          <Comment postId={postId} />
        </Box>
        {/* {openComment ? (
          <Box sx={{ mt: "2rem" }}>
            <Comment postId={postId} />
          </Box>
        ) : (
          <Box sx={{ mt: "2rem", visibility: "hidden" }}>
            <Comment postId={postId} sx={{visibility: "hidden" }}/>
          </Box>
        )} */}
      </Card>
    </Box>
  );
};

export default Post;

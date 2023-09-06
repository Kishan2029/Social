import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { config } from "../config";
import { useMutation, useQueryClient } from "react-query";
import { savePost, deletePost, hidePost } from "../reactQuery/mutation";
import { useSelector } from "react-redux";

const PostOptions = ({
  postId,
  saved,
  owner,
  hide,
  pageName,
  setOption,
  otherData,
}) => {
  const auth = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  // mutations
  const savePostMutation = useMutation({
    mutationFn: (body) => savePost(body),
    onSuccess: async (queryKey, body) => {
      // set data
      queryClient.setQueriesData(["posts"], (oldData) => {
        const newData = oldData.map((item) => {
          if (item._id === body.postId) {
            return {
              ...item,
              saved: body.saved,
            };
          } else {
            return item;
          }
        });
        return newData;
      });
      queryClient.setQueriesData(["userPosts"], (oldData) => {
        const newData = oldData.map((item) => {
          if (item._id === body.postId) {
            return {
              ...item,
              saved: body.saved,
            };
          } else {
            return item;
          }
        });
        return newData;
      });
      queryClient.setQueriesData(["savedPosts"], (oldData) => {
        if (body.saved) {
          const newData = [
            ...oldData,
            {
              _id: body.postId,
              postId: body.postId,
              name: body.other.name,
              postTime: body.other.time,
              content: body.other.content,
              images: body.other.imageData,
              saved: true,
              owner: body.other.owner,
              hide: body.other.hide,
              pageName: "savePost",
            },
          ];

          return newData;
        } else {
          const newData = oldData.filter((item) => item._id !== body.postId);
          // console.log("newData", newData);
          return newData;
        }
      });
      // queryClient.invalidateQueries(["savedPosts", "posts", "userPosts"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (body) => deletePost(body),
    onSuccess: async (queryKey, body) => {
      console.log("body", body);
      console.log("delete Success");
      // set data
      queryClient.setQueriesData(["posts"], (oldData) => {
        const newData = oldData.filter((item) => item._id !== body.postId);
        return newData;
      });

      queryClient.setQueriesData(["userPosts"], (oldData) => {
        const newData = oldData.filter((item) => item._id !== body.postId);
        return newData;
      });

      // await queryClient.invalidateQueries(["posts", "userPhotos", "userPosts"]);
    },
  });

  const hideMutation = useMutation({
    mutationFn: (body) => hidePost(body),
    onSuccess: async (queryKey, body) => {
      queryClient.setQueriesData(["posts"], (oldData) => {
        if (body.hide) {
          const newData = oldData.filter((item) => item._id !== body.postId);
          return newData;
        } else {
          console.log("hide success");
          const newData = [
            ...oldData,
            {
              _id: body.postId,
              postId: body.postId,
              name: body.other.name,
              postTime: body.other.time,
              content: body.other.content,
              images: body.other.imageData,
              saved: body.other.saved,
              owner: body.other.owner,
              hide: false,
              pageName: "savePost",
            },
          ];
          return newData;
        }
      });
      queryClient.setQueriesData(["userPosts"], (oldData) => {
        const newData = oldData.map((item) => {
          if (item._id === body.postId) {
            return {
              ...item,
              hide: body.hide,
            };
          } else {
            return item;
          }
        });

        return newData;
      });

      // queryClient.invalidateQueries(["posts", "userPosts"]);
    },
  });

  const onHover = {
    backgroundColor: "#218DFA",
    fontSize: "1rem",
    color: "white",
    zIndex: 2000,
  };
  return (
    <Card
      sx={{
        padding: "1rem 0.5rem",
        borderRadius: "0.3rem",
      }}
      raised
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          //   mt: "1rem",
          gap: "0.4rem",
          width: "100%",
        }}
      >
        {config.postOptions.map((item) => {
          if (saved) {
            if (item.name === "savePost") return;
          } else {
            if (item.name === "unsavePost") return;
          }

          if (pageName === "savePost") {
            if (
              item.name === "hidePost" ||
              item.name === "seePost" ||
              item.name === "delete"
            )
              return;
          }

          if (!owner) {
            if (
              item.name === "hidePost" ||
              item.name === "seePost" ||
              item.name === "delete"
            )
              return;
          } else {
            if (hide) {
              if (item.name === "hidePost") return;
            } else {
              if (item.name === "seePost") return;
            }
          }
          return (
            <Box
              component="a"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.6rem 1rem",
                // width: "20rem",
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                "&:hover": onHover,
              }}
              key={item.title}
              onClick={() => {
                if (item.name === "savePost" || item.name === "unsavePost") {
                  savePostMutation.mutate({
                    email: auth.email,
                    postId: postId,
                    saved: saved ? false : true,
                    other: otherData,
                  });
                } else if (
                  item.name === "hidePost" ||
                  item.name === "seePost"
                ) {
                  hideMutation.mutate({
                    email: auth.email,
                    postId: postId,
                    hide: hide ? false : true,
                    other: otherData,
                  });
                } else if (item.name === "delete") {
                  deleteMutation.mutate({
                    email: auth.email,
                    postId: postId,
                  });
                }
                setOption(false);
              }}
            >
              {item.icon}
              <Typography
                sx={{
                  fontWeight: 300,
                  font: "inherit",
                }}
              >
                {item.title}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Card>
  );
};

export default PostOptions;

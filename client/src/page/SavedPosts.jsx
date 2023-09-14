import { Box, Typography } from "@mui/material";
import React from "react";
import Post from "../component/Post";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { fetchSavedPosts } from "../reactQuery/query";
import Loading from "../component/Loading";

const SavedPosts = () => {
  const auth = useSelector((state) => state.auth.user);

  const { data, error, isError, isLoading } = useQuery({
    queryFn: () => fetchSavedPosts({ email: auth.email }),
    queryKey: ["savedPosts"],
  });

  if (isLoading) {
    return <Loading />;
  }

  console.log("savedPostData", data);

  return (
    <Box>
      <Typography
        sx={{ color: "var(--grayTitle)", fontSize: "4rem", opacity: "0.3" }}
      >
        Saved Posts
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {data.map((post) => {
          return (
            <Post
              key={post._id}
              postId={post._id}
              name={post.name}
              time={post.postTime}
              content={post.content}
              imageData={post.images}
              saved={post.saved}
              owner={post.owner}
              hide={post.hide}
              likeBoolean={post.like}
              likeCount={post.likeCount}
              commentMessageCount={post.commentCount}
              avatar={post.avatar}
              friend={post.friend}
              createdBy={post.createdBy}
              pageName={"savePost"}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default SavedPosts;

import { Box, Card } from "@mui/material";
import React from "react";
import Post from "../component/Post";
import { useSelector } from "react-redux";
import { config } from "../config";
import { useQuery } from "react-query";
import Loading from "./Loading";
import axios from "axios";
import { getAccessToken } from "../util/helper";

const UserPosts = () => {
  const auth = useSelector((state) => state.auth.user);

  // fetch user posts
  async function fetchUserPosts(body) {
    const { data } = await axios.post(config.urls.post.getUserPosts(), body, {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
      },
    });

    // dispatch(setLoader(false));
    return data.data;
  }

  const { data, error, isError, isLoading } = useQuery({
    queryFn: () => fetchUserPosts({ email: auth.email }),
    queryKey: ["userPosts"],
  });
  console.log("userPosts", data);
  // console.log("data", data);
  if (isLoading) {
    return <Loading />;
  }
  return (
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
            pageName={"userPost"}
          />
        );
      })}
    </Box>
  );
};

export default UserPosts;

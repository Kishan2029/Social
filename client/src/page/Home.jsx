import React from "react";
import CreatePost from "../component/CreatePost";
import { Box } from "@mui/material";
import Post from "../component/Post";
import axios from "axios";
import { config } from "../config";
import { useQuery } from "react-query";
import Loading from "../component/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../util/helper";
import { setLoader } from "../store/slices/loaderSlice";

const Home = () => {
  const auth = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // fetch posts
  async function fetchPosts(body) {
    const { data } = await axios.get(config.urls.post.getAllPosts(), {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
      },
    });

    dispatch(setLoader(false));
    return data;
  }

  const { data, error, isError, isLoading } = useQuery("posts", () =>
    fetchPosts({ email: auth.email })
  );
  console.log("data", data);
  if (isLoading) {
    return <Loading />;
    // dispatch(setLoader(true));
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <CreatePost />
      {data.map((post) => {
        return (
          <Post
            key={post._id}
            name={post.name}
            time={post.postTime}
            content={post.content}
            imageData={post.images}
          />
        );
      })}
    </Box>
  );
};

export default Home;

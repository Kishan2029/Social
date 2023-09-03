import { Box, Card, ImageList, ImageListItem } from "@mui/material";
import pic1 from "../assets/image/pic1.jpeg";
import React from "react";
import { config } from "../config";
import { getAccessToken } from "../util/helper";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "./Loading";

const Photos = () => {
  const auth = useSelector((state) => state.auth.user);
  // fetch friends
  async function fetchPhots(email) {
    console.log("url", config.urls.user.getPhotos(email));
    const { data } = await axios.get(config.urls.user.getPhotos(email), {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
      },
    });
    return data.data;
  }

  const { data, error, isError, isLoading } = useQuery({
    queryFn: () => fetchPhots(auth.email),
    queryKey: ["userPhotos"],
  });

  if (isLoading) return <Loading />;

  return (
    <Card sx={{ padding: "1rem", pt: "0" }}>
      {/* images */}
      <ImageList
        // sx={{ width: 500, height: 450 }}
        variant="masonry"
        cols={2}
        rowHeight={200}
        gap={12}
      >
        {data.map((item, index) => {
          const blob = new Blob([Int8Array.from(item.data.data)], {
            type: item.contentType,
          });
          const image = window.URL.createObjectURL(blob);
          return (
            <ImageListItem key={index}>
              <img
                src={image}
                loading="lazy"
                style={{ borderRadius: "0.4rem" }}
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </Card>
  );
};

export default Photos;

import { Box, Card, ImageList, ImageListItem } from "@mui/material";
import pic1 from "../assets/image/pic1.jpeg";
import React from "react";

const Photos = () => {
  const itemData = [
    { img: "hello" },
    { img: "hello1" },
    { img: "hell2" },
    { img: "hello3" },
    { img: "hell4" },
    { img: "hello5" },
    { img: "hello6" },
  ];
  return (
    <Card sx={{ padding: "1rem", pt: "0" }}>
      {/* images */}
      <ImageList
        // sx={{ width: 500, height: 450 }}
        variant="masonry"
        cols={2}
        // rowHeight={200}
        gap={12}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img src={pic1} loading="lazy" style={{ borderRadius: "0.4rem" }} />
          </ImageListItem>
        ))}
      </ImageList>
    </Card>
  );
};

export default Photos;

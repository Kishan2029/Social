import { Card, Typography } from "@mui/material";
import React from "react";
import { stringSplit } from "../util/helper";

const AboutMe = ({ description }) => {
  return (
    <Card sx={{ padding: "1rem" }}>
      <Typography sx={{ fontSize: "2rem", fontWeight: 500 }}>
        About me
      </Typography>

      {stringSplit(description).map((item, index) => {
        return (
          <Typography
            key={index}
            sx={{ fontSize: "0.9rem", color: "var(--grayTitle)", mb: "0.5rem" }}
          >
            {item}
          </Typography>
        );
      })}
    </Card>
  );
};

export default AboutMe;

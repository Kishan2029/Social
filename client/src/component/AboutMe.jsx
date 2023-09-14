import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { stringSplit } from "../util/helper";
import EditIcon from "@mui/icons-material/Edit";

const AboutMe = ({ description }) => {
  return (
    <Card sx={{ padding: "1rem" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ fontSize: "2rem", fontWeight: 500 }}>
          About me
        </Typography>
        <EditIcon sx={{ fontSize: "1.5rem", ml: "2rem" }} />
      </Box>

      {description ? (
        stringSplit(description).map((item, index) => {
          return (
            <Typography
              key={index}
              sx={{
                fontSize: "0.9rem",
                color: "var(--grayTitle)",
                mb: "0.5rem",
              }}
            >
              {item}
            </Typography>
          );
        })
      ) : (
        <Typography sx={{ mt: "1rem" }}>Please edit the description</Typography>
      )}
    </Card>
  );
};

export default AboutMe;

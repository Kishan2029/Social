import { Card, Typography } from "@mui/material";
import React from "react";
import { stringSplit } from "../util/helper";

const AboutMe = () => {
  const content =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut doloremque harum maxime mollitia perferendis praesentium quaerat. Adipisci, delectus eum fugiat incidunt iusto molestiae nesciunt odio porro quae quaerat, reprehenderit, sed.\n Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet assumenda error necessitatibus nesciunt quas quidem quisquam reiciendis, similique. Amet consequuntur facilis iste iure minima nisi non praesentium ratione voluptas voluptatem?";
  console.log("content", stringSplit(content));
  return (
    <Card sx={{ padding: "1rem" }}>
      <Typography sx={{ fontSize: "2rem", fontWeight: 500 }}>
        About me
      </Typography>

      {stringSplit(content).map((item) => {
        return (
          <Typography
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

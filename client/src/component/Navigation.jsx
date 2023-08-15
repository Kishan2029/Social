import { Box, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import { config } from "../config";
import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
import { redirect, useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [page, setPage] = useState("home"); // home,friends, savedPosts, notification,login
  const navigate = useNavigate();

  const onHover = {
    backgroundColor: "rgb(33, 141, 250, 0.2)",
    fontSize: "1.1rem",
  };
  return (
    <Card sx={{ padding: "1rem 1rem", borderRadius: "0.5rem" }} raised>
      <Typography sx={{ color: "#696969", fontSize: "1.2rem" }}>
        Navigation
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "1rem",
          gap: "0.4rem",
        }}
      >
        {config.navBar.map((item) => {
          return (
            <Box
              component="a"
              sx={{
                display: "flex",
                alignContent: "center",
                gap: "0.6rem",
                padding: "0.6rem 1rem",
                width: "100%",
                backgroundColor: page === item.name && "#218DFA",
                color: page === item.name && "white",
                // fontSize: page === item.name && "1.2rem",
                borderRadius: "0.5rem",

                zIndex: 1000,
                "&:hover": page !== item.name && onHover,
              }}
              key={item.title}
              onClick={() => {
                setPage(item.name);
                console.log("clicked", item.name);
                navigate(`/${item.name}`);
                // return redirect(`/${item.name}`);
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

export default Navigation;

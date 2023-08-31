import { Box, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import { config } from "../config";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";
import { removeAccessToken } from "../util/helper";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
// import { auth } from "../firebaseConfig";

const Navigation = () => {
  const [selected, setSelected] = useState("home"); // home,friends, savedPosts, notification,login
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    signOut(auth)
      .then(() => {
        removeAccessToken();
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log("Sign out firebase error", error);
      });
  };

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
                backgroundColor: selected === item.name && "#218DFA",
                color: selected === item.name && "white",
                // fontSize: selected === item.name && "1.2rem",
                borderRadius: "0.5rem",

                zIndex: 1000,
                "&:hover": selected !== item.name && onHover,
              }}
              key={item.title}
              onClick={() => {
                console.log("clicked", item.name);
                if (item.name === "logout") {
                  logout();
                } else {
                  setSelected(item.name);
                  navigate(`/${item.name}`);
                }
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

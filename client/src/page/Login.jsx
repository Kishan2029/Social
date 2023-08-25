import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { config } from "../config";
import axios from "axios";

import {
  getRedirectResult,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       console.log("UID", user);
  //     } else {
  //     }
  //   });
  // }, []);

  const loginRequest = async (body, token) => {
    console.log("body", body);
    const res = await axios.post(config.urls.auth.logIn(), body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("res", res.data);
    dispatch(setUser(body));
  };

  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    console.log("clicked");

    signInWithPopup(auth, provider)
      .then((result) => {
        // // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);

        // const token = credential.accessToken;
        // console.log("token", token);

        const user = result.user;
        console.log("user", user);
        const body = {
          name: user.displayName,
          email: user.email,
        };
        loginRequest(body, user.accessToken);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", error);
        // ...
      });
  };
  // css
  const onOutHover = {
    backgroundColor: "var(--blue)",
    borderRadius: "0.5rem",
  };
  const onInsideHover = {
    backgroundColor: "var(--blue)",
    color: "white",
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{ color: "var(--grayTitle)", fontSize: "3rem", opacity: "0.3" }}
      >
        Login
      </Typography>
      <Stack direction={"column"} spacing={0} sx={{ mt: "2rem" }}>
        {config.loginItems.map((item) => {
          return (
            <div
              key={item.name}
              style={{ cursor: "pointer" }}
              onClick={handleLogin}
            >
              <Box
                sx={{
                  paddingX: "1rem",
                  "&:hover": onOutHover,
                  transition: "background  0.5s",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "0.3rem",
                    padding: "1rem 3.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": onInsideHover,
                    transition: "background  0.5s",
                  }}
                  gap={1}
                  key={item.name}
                >
                  <Box sx={{}}> {item.icon}</Box>

                  <Typography
                    sx={{ fontWeight: 400 }}
                  >{`Login With ${item.name}`}</Typography>
                </Box>
                <Divider />
              </Box>
            </div>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Login;

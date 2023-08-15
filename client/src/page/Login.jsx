import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { config } from "../config";

const Login = () => {
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
            <>
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
            </>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Login;

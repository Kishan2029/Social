import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Card,
} from "@mui/material";

const Notifications = () => {
  const friends = [
    { name: "John Doe", friends: 6 },
    { name: "John Doe", friends: 6 },
    { name: "John Doe", friends: 6 },
    { name: "John Doe", friends: 6 },
    { name: "John Doe", friends: 6 },
  ];
  return (
    <Box>
      <Typography
        sx={{ color: "var(--grayTitle)", fontSize: "4rem", opacity: "0.3" }}
      >
        Notificaitons
      </Typography>

      <Card sx={{ padding: "1rem" }}>
        {/* List of friends */}
        {friends.map((item) => {
          return (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar sx={{ height: 45, width: 45 }} />
                <Typography>
                  <b>John liked </b>your photo
                </Typography>
              </Box>
              <Divider sx={{ mb: "1rem", mt: "1rem" }} />
            </>
          );
        })}
      </Card>
    </Box>
  );
};

export default Notifications;

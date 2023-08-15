import { Card, Divider, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

import React from "react";

const FriendsTab = () => {
  const friends = [
    { name: "John Doe", friends: 6 },
    { name: "John Doe", friends: 6 },
    { name: "John Doe", friends: 6 },
    { name: "John Doe", friends: 6 },
    { name: "John Doe", friends: 6 },
  ];
  return (
    <Card sx={{ padding: "1rem" }}>
      <Typography sx={{ fontSize: "2rem", fontWeight: 500 }}>
        Friends
      </Typography>

      {/* List of friends */}
      {friends.map((item) => {
        return (
          <List sx={{ width: "100%", padding: 0 }}>
            <ListItem sx={{ padding: 0 }}>
              <ListItemAvatar sx={{ fontSize: "1rem" }}>
                <Avatar sx={{ height: "2.8rem", width: "2.8rem" }} />
              </ListItemAvatar>
              <ListItemText
                primary="John Does"
                primaryTypographyProps={{
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  mb: 0,
                }}
                secondaryTypographyProps={{ mt: 0 }}
                secondary="5 Mutual Friends"
              />
            </ListItem>
            <Divider light sx={{ mb: "0.5rem", mt: "0.5rem" }} />
          </List>
        );
      })}
    </Card>
  );
};

export default FriendsTab;

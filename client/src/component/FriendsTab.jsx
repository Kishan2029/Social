import { Card, Divider, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useQuery } from "react-query";
import React from "react";
import { config } from "../config";
import { getAccessToken } from "../util/helper";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loading from "./Loading";

const FriendsTab = () => {
  const auth = useSelector((state) => state.auth.user);
  // fetch friends
  async function fetchFriends(email) {
    console.log("url", config.urls.user.getFriends(email));
    const { data } = await axios.get(config.urls.user.getFriends(email), {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
      },
    });
    return data.data;
  }

  const { data, error, isError, isLoading } = useQuery({
    queryFn: () => fetchFriends(auth.email),
    queryKey: ["userFriends"],
  });

  if (isLoading) return <Loading />;

  return (
    <Card sx={{ padding: "1rem" }}>
      <Typography sx={{ fontSize: "2rem", fontWeight: 500 }}>
        Friends
      </Typography>

      {/* List of friends */}
      {data.map((item, index) => {
        return (
          <List key={index} sx={{ width: "100%", padding: 0 }}>
            <ListItem sx={{ padding: 0 }}>
              <ListItemAvatar sx={{ fontSize: "1rem" }}>
                <Avatar sx={{ height: "2.8rem", width: "2.8rem" }} />
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
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

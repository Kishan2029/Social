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
  CircularProgress,
} from "@mui/material";
import { useQuery } from "react-query";
import { fetchNotifications } from "../reactQuery/query";
import { useSelector } from "react-redux";

const Notifications = () => {
  const auth = useSelector((state) => state.auth.user);
  const { data, error, isError, isLoading } = useQuery({
    queryFn: () => fetchNotifications({ email: auth.email }),
    queryKey: ["notifications"],
  });
  if (isLoading) {
    return <CircularProgress />;
  }
  console.log("data", data);

  return (
    <Box>
      <Typography
        sx={{ color: "var(--grayTitle)", fontSize: "4rem", opacity: "0.3" }}
      >
        Notificaitons
      </Typography>

      <Card sx={{ padding: "1rem" }}>
        {/* List of friends */}
        {data.length === 0 ? (
          <Box sx={{ height: "4rem", display: "flex", alignItems: "center" }}>
            <Typography sx={{ textAlign: "left" }}>
              You have no notification
            </Typography>
          </Box>
        ) : (
          data.map((item) => {
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
                    <b>{item.name} </b>{" "}
                    {item.type === like
                      ? "liked your Post"
                      : "commented on Your post"}
                  </Typography>
                </Box>
                <Divider sx={{ mb: "1rem", mt: "1rem" }} />
              </>
            );
          })
        )}
      </Card>
    </Box>
  );
};

export default Notifications;

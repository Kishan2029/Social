import { Avatar, Box, Card, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import sky from "../assets/image/sky.jpeg";
import avatar from "../assets/image/avatar.jpeg";
import TabList from "@mui/lab/TabList";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import FriendsPic from "../assets/image/friends.png";

const MyProfile = ({ value, setValue }) => {
  //   const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card sx={{ height: "40vh", position: "relative" }}>
      <Box sx={{ height: "50%" }}>
        <img
          src={sky}
          height="100%"
          width="100%"
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Avatar
        alt="Remy Sharp"
        src={avatar}
        sx={{
          height: "9rem",
          width: "9rem",
          position: "absolute",
          top: "7rem",
          left: "1rem",
        }}
      />

      <Box sx={{ ml: "11rem", mt: "0.8rem" }}>
        <Typography sx={{ fontSize: "1.6rem", fontWeight: 800 }}>
          John Doe
        </Typography>
        <Typography sx={{ color: "var(--grayTitle)" }}>
          Stockholm, Sweden
        </Typography>
      </Box>

      <Box sx={{ mt: "1rem", paddingX: "1rem" }}>
        {/* <TabContext value={value}> */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              icon={<MailOutlineIcon />}
              iconPosition="start"
              label="Posts"
              value="1"
            />
            <Tab
              icon={<InfoIcon />}
              iconPosition="start"
              label="About"
              value="2"
            />
            <Tab
              icon={<PeopleIcon />}
              iconPosition="start"
              label="Friends"
              value="3"
            />
            <Tab
              icon={<PhotoSizeSelectActualIcon />}
              iconPosition="start"
              label="Photos"
              value="4"
            />
          </TabList>
        </Box>
        {/* <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel> */}
        {/* </TabContext> */}
      </Box>
    </Card>
  );
};

export default MyProfile;

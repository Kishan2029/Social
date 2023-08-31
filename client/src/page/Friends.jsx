import React, { useState } from "react";
import MyProfile from "../component/MyProfile";
import { Box } from "@mui/material";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import UserPosts from "../component/UserPosts";
import AboutMe from "../component/AboutMe";
import FriendsTab from "../component/FriendsTab";
import Photos from "../component/Photos";

const Friends = () => {
  console.log("friends page");
  const [value, setValue] = useState("1");
  return (
    <TabContext value={value}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <MyProfile value={value} setValue={setValue} />
        <TabPanel value="1" sx={{ padding: 0 }}>
          <UserPosts />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0 }}>
          <AboutMe />
        </TabPanel>
        <TabPanel value="3" sx={{ padding: 0 }}>
          <FriendsTab />
        </TabPanel>
        <TabPanel value="4" sx={{ padding: 0 }}>
          <Photos />
        </TabPanel>
      </Box>
    </TabContext>
  );
};

export default Friends;

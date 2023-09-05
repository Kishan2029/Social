import React, { useState } from "react";
import MyProfile from "../component/MyProfile";
import { Box } from "@mui/material";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import UserPosts from "../component/UserPosts";
import AboutMe from "../component/AboutMe";
import FriendsTab from "../component/FriendsTab";
import Photos from "../component/Photos";
import { config } from "../config";
import Loading from "../component/Loading";
import { useQuery } from "react-query";
import { getAccessToken } from "../util/helper";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const auth = useSelector((state) => state.auth.user);
  const [value, setValue] = useState("2");

  // fetch user posts
  async function fetchUserInfo(email) {
    const { data } = await axios.get(config.urls.user.getUserInfo(email), {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
      },
    });

    // dispatch(setLoader(false));
    console.log("userInfo", data.data.coverImage);
    return data.data;
  }

  const { data, error, isError, isLoading } = useQuery("userInfo", () =>
    fetchUserInfo(auth.email)
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <TabContext value={value}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <MyProfile
          value={value}
          setValue={setValue}
          userLocation={data.location}
          userName={data.name}
          userCoverImage={data?.coverImage}
          userProfileImage={data?.profileImage}
        />
        <TabPanel value="1" sx={{ padding: 0 }}>
          <UserPosts />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0 }}>
          <AboutMe description={data.description} />
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

export default Profile;

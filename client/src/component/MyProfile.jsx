import {
  Avatar,
  Box,
  Button,
  Card,
  Fab,
  IconButton,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import sky from "../assets/image/sky.jpeg";
import avatar from "../assets/image/avatar.jpeg";
import TabList from "@mui/lab/TabList";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import FriendsPic from "../assets/image/friends.png";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditImage from "../assets/image/edit.png";
import { generateImageUrl, stringToColor } from "../util/helper";
import cover from "../assets/image/coverImage.jpeg";
import cover1 from "../assets/image/cover1.jpeg";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { updateProfileImage, updateProfileText } from "../reactQuery/mutation";

const MyProfile = ({
  value,
  setValue,
  userLocation,
  userName,
  userCoverImage = false,
  userProfileImage,
}) => {
  const auth = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  // conditoinal variables
  const [editProfile, setEditProfile] = useState(false);
  const [editCoverImage, setEditCoverImage] = useState(false);
  const [editProfileImage, setEditProfileImage] = useState(false);

  // data fields
  const [name, setName] = useState(userName);
  const [location, setLocation] = useState(userLocation);
  const [coverImage, setCoverImage] = useState(userCoverImage);
  const [profileImage, setProfileImage] = useState(userProfileImage);

  const [oldName, setOldName] = useState(userName);
  const [oldLocation, setOldLocation] = useState(userLocation);
  const [oldCoverImage, setOldCoverImage] = useState(userCoverImage);

  // mutations
  const saveProfileMutation = useMutation({
    mutationFn: (body) => updateProfileText(body),
    onSuccess: async () => {
      // await queryClient.invalidateQueries(["savedPosts"]);
    },
  });

  const saveProfileImageMutatin = useMutation({
    mutationFn: (body) => updateProfileImage(body),
    onSuccess: async () => {
      // await queryClient.invalidateQueries(["savedPosts"]);
    },
  });

  const saveProfile = () => {
    saveProfileMutation.mutate({ name, email: auth.email, location });
    setEditProfile(false);
    setOldLocation(location);
    setOldName(name);
  };

  const saveCoverImage = () => {
    let formData = new FormData();

    formData.append("images", coverImage);
    formData.append("email", auth.email);
    formData.append("imageType", "cover");

    saveProfileImageMutatin.mutate(formData);

    setOldCoverImage(coverImage);

    setEditCoverImage(false);
  };

  const tabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (profileImage !== undefined) {
      let formData = new FormData();

      formData.append("images", profileImage);
      formData.append("email", auth.email);
      formData.append("imageType", "profile");

      saveProfileImageMutatin.mutate(formData);
    }
  }, [profileImage]);
  return (
    <Card
      sx={{ height: editProfile ? "48.3vh" : "40vh", position: "relative" }}
    >
      {/* Cover Image */}
      <Box sx={{ height: "50%", position: "relative" }}>
        <img
          src={
            coverImage
              ? coverImage.data !== undefined
                ? generateImageUrl(coverImage)
                : URL.createObjectURL(coverImage)
              : cover1
          }
          // src={cover1}
          height="100%"
          width="100%"
          style={{ objectFit: "cover" }}
        />

        {editCoverImage ? (
          <Box sx={{ position: "absolute", right: 10, bottom: 10 }}>
            <Box sx={{ alignSelf: "flex-start" }}>
              <Box
                sx={{
                  display: "flex",

                  gap: 2,
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "var(--grayTitle)",
                    textTransform: "none",
                    color: "var(--grayTitle)",
                    backgroundColor: "white",
                    // pointerEvents: "none",
                    "&:hover": {
                      borderColor: "var(--grayTitle)",
                      textTransform: "none",
                      color: "var(--grayTitle)",
                      backgroundColor: "white",
                    },
                  }}
                  onClick={() => {
                    saveCoverImage();
                  }}
                >
                  Save Image
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    mr: "1rem",
                    borderColor: "var(--grayTitle)",
                    textTransform: "none",
                    color: "var(--grayTitle)",
                    backgroundColor: "white",
                    // pointerEvents: "none",
                    "&:hover": {
                      borderColor: "var(--grayTitle)",
                      textTransform: "none",
                      color: "var(--grayTitle)",
                      backgroundColor: "white",
                    },
                  }}
                  onClick={() => {
                    setCoverImage(oldCoverImage);
                    setEditCoverImage(false);
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <>
            <Button
              variant="outlined"
              sx={{
                position: "absolute",
                right: 10,
                bottom: 10,
                borderColor: "var(--grayTitle)",
                textTransform: "none",
                color: "var(--grayTitle)",
                backgroundColor: "white",
                // pointerEvents: "none",
                "&:hover": {
                  borderColor: "var(--grayTitle)",
                  textTransform: "none",
                  color: "var(--grayTitle)",
                  backgroundColor: "white",
                },
              }}
            >
              <label
                htmlFor="cover-image"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Box sx={{ display: "flex", gap: 1 }}>
                  <CameraAltIcon sx={{ color: "var(--grayTitle)" }} />
                  Change Cover Image
                </Box>
              </label>
            </Button>
            <input
              id="cover-image"
              style={{ display: "none" }}
              type="file"
              name="myImage"
              accept="image/*"
              multiple
              // value={image}
              onChange={(event) => {
                setCoverImage(event.target.files[0]);
                setEditCoverImage(true);
              }}
            />
          </>
        )}
      </Box>

      {/* Profile Image */}
      <Box
        sx={{
          position: "absolute",
          top: editProfile ? "9rem" : "7rem",
          left: "1rem",
          display: "flex",
        }}
      >
        {profileImage !== undefined ? (
          <Avatar
            src={
              profileImage.data !== undefined
                ? generateImageUrl(profileImage)
                : URL.createObjectURL(profileImage)
            }
            sx={{
              height: "9rem",
              width: "9rem",
            }}
          />
        ) : (
          <Avatar
            sx={{
              height: "9rem",
              width: "9rem",
              fontSize: "5rem",
              backgroundColor: stringToColor(name),
            }}
          >
            {name[0]}
          </Avatar>
        )}
      </Box>

      <IconButton
        sx={{
          position: "absolute",
          top: editProfile ? "14.8rem" : "13rem",
          left: "7.5rem",
        }}
        onClick={(e) => {
          // e.stopPropagation();
        }}
      >
        <label
          htmlFor="profile-image"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Paper
            sx={{
              borderRadius: "3rem",
              padding: "0.3rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CameraAltIcon sx={{ color: "var(--grayTitle)" }} />
          </Paper>
          {/* <Fab
            size="small"
            color="#fff"
            sx={{
              // position: "absolute",
              // top: editProfile ? "15.2rem" : "13.4rem",
              // left: "7.7rem",
              zIndex: 500,
              size: "1rem",
            }}
          >
            <CameraAltIcon
              sx={{
                fontSize: "1.4rem",
              }}
            />
          </Fab> */}
        </label>
      </IconButton>

      <input
        id="profile-image"
        style={{ display: "none" }}
        type="file"
        name="myImage"
        accept="image/*"
        multiple
        // value={image}
        onChange={(event) => {
          setProfileImage(event.target.files[0]);
        }}
      />

      {/* Profile Text */}

      {editProfile ? (
        <Box
          sx={{
            ml: "11rem",
            mt: "0.8rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Enter Name"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Enter Location"
              size="small"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Box>
          {/* Button */}
          <Box sx={{ alignSelf: "flex-start" }}>
            <Box
              sx={{
                display: "flex",

                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  borderColor: "var(--grayTitle)",
                  textTransform: "none",
                  color: "var(--grayTitle)",
                  // pointerEvents: "none",
                  "&:hover": {
                    borderColor: "var(--grayTitle)",
                    textTransform: "none",
                    color: "var(--grayTitle)",
                  },
                }}
                onClick={() => {
                  saveProfile();
                }}
              >
                Save Profile
              </Button>
              <Button
                variant="outlined"
                sx={{
                  mr: "1rem",
                  borderColor: "var(--grayTitle)",
                  textTransform: "none",
                  color: "var(--grayTitle)",
                  // pointerEvents: "none",
                  "&:hover": {
                    borderColor: "var(--grayTitle)",
                    textTransform: "none",
                    color: "var(--grayTitle)",
                  },
                }}
                onClick={() => {
                  setName(oldName);
                  setLocation(oldLocation);
                  setEditProfile(false);
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            ml: "11rem",
            mt: "0.8rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "1.6rem", fontWeight: 800 }}>
              {name}
            </Typography>
            <Typography sx={{ color: "var(--grayTitle)" }}>
              {location != undefined
                ? location
                : "Edit profile to enter location"}
            </Typography>
          </Box>
          <Box>
            <Button
              variant="outlined"
              sx={{
                mr: "2rem",
                borderColor: "var(--grayTitle)",
                textTransform: "none",
                color: "var(--grayTitle)",
                // pointerEvents: "none",
                "&:hover": {
                  borderColor: "var(--grayTitle)",
                  textTransform: "none",
                  color: "var(--grayTitle)",
                },
              }}
              startIcon={<img src={EditImage} style={{ width: "1.2rem" }} />}
              onClick={() => {
                setEditProfile(true);
              }}
            >
              Edit Profile
            </Button>
          </Box>
        </Box>
      )}

      {/* Tabs */}
      <Box sx={{ mt: "1rem", paddingX: "1rem" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={tabChange} aria-label="lab API tabs example">
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
      </Box>
    </Card>
  );
};

export default MyProfile;

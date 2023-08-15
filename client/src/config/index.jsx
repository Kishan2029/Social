import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";

export const config = {
  navBar: [
    {
      name: "home",
      title: "Home",
      icon: <HomeOutlinedIcon />,
    },
    {
      name: "friends",
      title: "Friends",
      icon: <GroupOutlinedIcon />,
    },
    {
      name: "savedPosts",
      title: "Saved Posts",
      icon: <BookmarkBorderIcon />,
    },
    {
      name: "notifications",
      title: "Notification",
      icon: <NotificationsNoneIcon />,
    },
    {
      name: "logout",
      title: "Logout",
      icon: <LogoutIcon />,
    },
  ],
  loginItems: [
    {
      name: "Google",
      icon: <GoogleIcon sx={{ fontSize: "2.5rem" }} />,
    },
    {
      name: "Twitter",
      icon: <TwitterIcon sx={{ fontSize: "2.5rem" }} />,
    },
    {
      name: "Github",
      icon: <GitHubIcon sx={{ fontSize: "2.5rem" }} />,
    },
  ],
  postInteraction: [
    {
      name: "Like",
      icon: <FavoriteBorderIcon sx={{ fontSize: "2.5rem" }} />,
    },
    {
      name: "Comment",
      icon: <ChatBubbleOutlineIcon sx={{ fontSize: "2.5rem" }} />,
    },
    {
      name: "Share",
      icon: <ShareIcon sx={{ fontSize: "2.5rem" }} />,
    },
  ],
};

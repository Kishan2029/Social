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
import ClearIcon from "@mui/icons-material/Clear";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export const config = {
  navBar: [
    {
      name: "home",
      title: "Home",
      icon: <HomeOutlinedIcon />,
    },
    {
      name: "profile",
      title: "Profile",
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
  postOptions: [
    {
      name: "unsavePost",
      title: "Unsave post",

      icon: <BookmarkBorderIcon />,
    },
    {
      name: "savePost",
      title: "Save post",
      icon: <BookmarkIcon />,
    },
    {
      name: "turnNotification",
      title: "Turn notifications",
      icon: <NotificationsActiveIcon />,
    },
    {
      name: "hidePost",
      title: "Hide post",
      icon: <ClearIcon />,
    },
    {
      name: "seePost",
      title: "Visible post",
      icon: <RemoveRedEyeIcon />,
    },
    {
      name: "delete",
      title: "Delete",
      icon: <DeleteOutlineIcon />,
    },
    {
      name: "report",
      title: "Report",
      icon: <WarningAmberIcon />,
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
  urls: {
    auth: {
      logIn: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/auth/login`;
      },
    },
    post: {
      createPost: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/post/createPost`;
      },
      getUserPosts: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/post/getUserPosts`;
      },
      getAllPosts: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/post/getAllPosts`;
      },
      getSavedPosts: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/post/getSavedPosts`;
      },
      hidePost: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/post/hidePost`;
      },
      deletePost: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/post/deletePost`;
      },
      savePost: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/post/savePost`;
      },
      likePost: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/post/likePost`;
      },
    },
    user: {
      getUserInfo: (email) => {
        return `${import.meta.env.VITE_BACKEND_URL}/user/${email}`;
      },
      getFriends: (email) => {
        return `${import.meta.env.VITE_BACKEND_URL}/user/getFriends/${email}`;
      },
      getPhotos: (email) => {
        return `${import.meta.env.VITE_BACKEND_URL}/user/getPhotos/${email}`;
      },
      updateProfileText: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/user/profile/updateText`;
      },
      updateProfileImage: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/user/profile/updateImage`;
      },
      addFriend: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/user/addFriend`;
      },
    },
    comment: {
      addComment: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/comment/addComment`;
      },
      getComments: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/comment`;
      },
    },
    notification: {
      addNotification: () => {
        return `${
          import.meta.env.VITE_BACKEND_URL
        }/notification/addNotification`;
      },
      getNotifications: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/notification`;
      },
    },
  },
};

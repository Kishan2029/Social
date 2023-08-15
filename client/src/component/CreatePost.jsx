import {
  Avatar,
  Box,
  Button,
  Card,
  TextField,
  TextareaAutosize,
  makeStyles,
} from "@mui/material";
import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const CreatePost = () => {
  const [content, setContent] = useState("");

  //onClick
  const onShare = () => {
    console.log("content", content);
  };

  // styled component
  //   const useStyles = makeStyles((theme) => ({
  //     root: {
  //       "& .MuiTextField-root": {
  //         margin: theme.spacing(1),
  //       },
  //     },
  //     textarea: {
  //       resize: "both",
  //     },
  //   }));
  //   const classes = useStyles();
  return (
    <Card sx={{ padding: "1rem", fontWeight: 300 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Avatar sx={{ width: 45, height: 45 }} />
        {/* <TextareaAutosize
          minRows={3}
          maxRows={10}
          fullWidth
          sx={{ outerWidth: "100rem" }}
        /> */}
        <TextField
          value={content}
          placeholder="What's on your mind,Kishan ?"
          multiline
          variant="outlined"
          fullWidth
          minRows={2}
          resize="both"
          maxRows={10}
          autoFocus={false}
          inputProps={{
            className: {
              textarea: {
                resize: "both",
              },
            },
          }}

          //   onChange={(e) => {
          //     console.log(e.target.value);
          //     setContent(e.target.value);
          //   }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: "1rem",
          alignItems: "center",
        }}
      >
        {/* 3 icons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <PersonOutlineIcon sx={{ fontSize: "1.7rem" }} />
            People
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <LocationOnOutlinedIcon sx={{ fontSize: "1.7rem" }} />
            Checked In
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <SentimentSatisfiedAltIcon sx={{ fontSize: "1.7rem" }} />
            Mood
          </Box>
        </Box>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "var(--blue)",
            fontSize: "0.95rem",
            paddingX: "1.5rem",
          }}
          onClick={onShare}
        >
          Share
        </Button>
      </Box>
    </Card>
  );
};

export default CreatePost;

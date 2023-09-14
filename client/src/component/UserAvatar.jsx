import { Avatar } from "@mui/material";
import React from "react";
import { stringToColor } from "../util/helper";

const UserAvatar = ({ name, avatar }) => {
  return (
    <>
      {avatar !== null && avatar !== undefined ? (
        <Avatar
          src={avatar}
          sx={{
            width: 45,
            height: 45,
          }}
        />
      ) : (
        <Avatar
          sx={{
            width: 45,
            height: 45,
            fontSize: "2rem",
            backgroundColor: stringToColor(name),
          }}
        >
          {name[0]}
        </Avatar>
      )}
    </>
  );
};

export default UserAvatar;

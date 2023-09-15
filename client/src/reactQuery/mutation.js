import { config } from "../config";
import { getAccessToken } from "../util/helper";
import axios from "axios";

// Post 
export const deletePost = async (body) => {
    const { data } = await axios.post(config.urls.post.deletePost(), body, {
        headers: {
            Authorization: "Bearer " + getAccessToken(),
        },
    });

    return data.data;
}

export const hidePost = async (body) => {
    const { data } = await axios.post(config.urls.post.hidePost(), body, {
        headers: {
            Authorization: "Bearer " + getAccessToken(),
        },
    });
    return data.data;
}

export const savePost = async (body) => {
    const { data } = await axios.post(config.urls.post.savePost(), body, {
        headers: {
            Authorization: "Bearer " + getAccessToken(),
        },
    });
    console.log("saved", data);
    return data.data;
}

export const likePost = async (body) => {
    const { data } = await axios.post(config.urls.post.likePost(), body, {
        headers: {
            Authorization: "Bearer " + getAccessToken(),
        },
    });
    console.log("like", data);
    return data.data;
}


// User 
export const updateProfileText = async (body) => {
    const { data } = await axios.post(config.urls.user.updateProfileText(), body, {
        headers: {
            Authorization: "Bearer " + getAccessToken(),
        },
    });

    return data.data;
}

export const updateProfileImage = async (body) => {
    const { data } = await axios.post(config.urls.user.updateProfileImage(), body, {
        headers: {
            Authorization: "Bearer " + getAccessToken(),
            "Content-Type": "multipart/formdata",
        },
    });

    return data.data;
}

export const addFriend = async (body) => {

    const { data } = await axios.post(config.urls.user.addFriend(), body, {
        headers: {
            Authorization: "Bearer " + getAccessToken(),

        },
    });

    return data.data;
}

export const updateDescription = async (body) => {

    const { data } = await axios.post(config.urls.user.updateDescription(), body, {
        headers: {
            Authorization: "Bearer " + getAccessToken(),

        },
    });

    return data.data;
}

// Comments
export const addComment = async (body) => {
    const { data } = await axios.post(config.urls.comment.addComment(), body, {
        headers: {
            Authorization: "Bearer " + getAccessToken(),
        },
    });
    return data.data;
}

// Notification
export const addNotification = async (body) => {
    const { data } = await axios.post(config.urls.notification.addNotification(), body, {
        headers: {
            Authorization: "Bearer " + getAccessToken(),
        },
    });
    return data.data;
}

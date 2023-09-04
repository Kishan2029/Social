import { config } from "../config";
import { getAccessToken } from "../util/helper";
import axios from "axios";


export const deletePost = async (body) => {
    console.log("inside delete post");
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

import { config } from "../config";
import { getAccessToken } from "../util/helper";
import axios from "axios";


// fetch saved posts
export const fetchSavedPosts = async (body) => {
    const { data } = await axios.post(config.urls.post.getSavedPosts(), body, {
        headers: {
            Authorization: "Bearer " + getAccessToken(),
        },
    });
    return data.data;
}

export const fetchComments = async (body) => {
    const { data } = await axios.post(config.urls.comment.getComments(), body, {
        headers: {
            Authorization: "Bearer " + getAccessToken(),
        },
    });
    return data.data;
}


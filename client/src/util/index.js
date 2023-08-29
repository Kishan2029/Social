export const stringSplit = (string) => {
    return string.split("\n");
}

export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
}

export const removeAccessToken = () => {
    localStorage.removeItem("accessToken");
}
export const stringSplit = (string) => {
    return string.split("\n");
}

export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
}

export const removeAccessToken = () => {
    localStorage.removeItem("accessToken");
}

export const stringToColor = (string) => {
    let hash = 0;
    let i;


    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }


    return color;
}
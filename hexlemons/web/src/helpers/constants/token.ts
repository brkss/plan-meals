let token : string = "";


export const SetAccessToken = (t: string) => {
    token = t;
}

export const getAccessToken = () => {
    return token;
}
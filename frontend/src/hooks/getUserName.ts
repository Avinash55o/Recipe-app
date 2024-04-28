export const useGetUserName = () => {

    const username = window.localStorage.getItem("username");
    if(!username){
        return ""
    }
    return username
}
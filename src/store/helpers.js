
export const getServerData = () =>{
    return JSON.parse(localStorage.getItem('user-data'));
}

export const getSignInUser = (arr, signInObj) =>{
    return arr.filter(item =>{
        if(signInObj.email === item.email && signInObj.password === item.password){
            return item;
        }
    })
}

export const emailConfirme = (arr, newUserObj) =>{
    return arr.map(item =>{
        if(item.email === newUserObj.email){
            return false;
        }
        return false;
    })
}
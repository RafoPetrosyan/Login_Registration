
export const getUserList = () =>{
    return JSON.parse(localStorage.getItem('user-list'));
}

export const loopLogin = (userList, payload) =>{
    let result = null;
    userList.forEach(item =>{
        if(item.email === payload.email && item.password === item.password){
            result = item;
        }
    });
    return result;
}

export const loopRegistration = (userList, payload) =>{
    let result = true;
    userList.forEach(item =>{
        if(item.email === payload.email) result = false;
    })
    return result;
}

export const setData = (userList, payload) =>{
    let result = [...userList, payload];
    return result;
}
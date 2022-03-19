
export const getAdminList = () =>{
    return JSON.parse(localStorage.getItem('admin-list'));
}

export const loopAdminList = (arr, loginObj) =>{
    let result = null;
    arr.forEach(item =>{
        if(item.email === loginObj.email && item.password === loginObj.password){
            result = item
        }
    })
    return result;
}
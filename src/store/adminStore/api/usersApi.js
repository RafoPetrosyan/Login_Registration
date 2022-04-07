import client from '../client';


export const getUsers = async (payload) =>{
    const { data } = await client.get(`user/getUserWebList/${payload}`)
    return data;
}

export const addUser = (payload) =>{
    return client.post('user/signup', payload);
}

export const deleteUser = (payload) =>{
    return client.delete(`user/${payload}`)
}

export const deleteSelected = (payload) =>{
    return client.delete('user/deleteSelected', payload)
}

export const editeUser = (payload) =>{
    return client.patch(`user/${payload.id}`, payload.data)
}
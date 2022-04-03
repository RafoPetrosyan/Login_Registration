import client from '../client';

export const getUsers = async (payload) =>{
    const { data } = await client.get(`user/getUserWebList/${payload}`)
    return data;
}
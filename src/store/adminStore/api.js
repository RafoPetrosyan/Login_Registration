import client from './client';

export const loginAdmin = async (payload) => {
    const { data } = await client.post('user/loginAdminPanel', payload)
    return data
}

export const currentAdmin = async () => {
    const { data } = await client.get('user/current')
    return data;
}

export const events = async (payload) => {
    const { data } = await client.get(`event${payload.url}${payload.dateUrl}`)
    return data;
}

export const createEvent = (payload) => {
    return client.post('event/createAndUpload', payload)
}

export const getEditeEvent = async (payload) =>{
    const { data } = await client.get(`event/${payload}`)
    return data;
}
import client from "../client"


export const events = async (payload) => {
    const { data } = await client.get(`event${payload.url}${payload.dateUrl}`)
    return data;
}

export const createEvent = async (payload) => {
    const { data } = await client.post('event/createAndUpload', payload)
    return data;
}

export const getEditeEvent = async (payload) =>{
    const { data } = await client.get(`event/${payload}`)
    return data;
}

export const updateEvent = async (payload) =>{
    const { data } = await client.put(`event/updateAndUpload/${payload.id}`, payload.values)
    return data;
}

export const deleteEvent = (payload) =>{
    return client.delete(`event/${payload}`)
}

export const dedleteSelectedEvents = (payload) =>{
    return client.delete('event/deleteSelectedEvent', payload)
}
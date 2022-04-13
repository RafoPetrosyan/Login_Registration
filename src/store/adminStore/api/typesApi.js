import client from "../client";

export const getTypes = async (payload) =>{
    const { data } = await client.get(`type/${payload}`)
    return data;
}

export const getTypeById = async (payload) => {
    const { data } = await client.get(`type/${payload}`)
    return data;
}

export const updateType = (payload) =>{
    return client.post('type/update', payload)
}

export const createType = (payload) =>{
    return client.post('type', payload)
}

export const deleteType = (payload) =>{
    return client.delete(`type/${payload}`)
}

export const deleteSelectedType = (payload) =>{
    return client.delete('type/deleteAllTypes', payload)
}


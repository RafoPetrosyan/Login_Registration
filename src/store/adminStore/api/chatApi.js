import client from "../client";


export const getChats = async (payload) => {
    const { data } = await client.get(`support/chat/${payload}?limit=5000`);
    return data;
}

export const getMessages = async (payload) => {
    const { data } = await client.get(`support/message/${payload}?limit=5000`);
    return data;
}

export const sendMessage = (payload) => {
    return client.post('support/message', payload);
}
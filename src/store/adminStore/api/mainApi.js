import client from "../client"

export const loginAdmin = async (payload) => {
    const { data } = await client.post('user/loginAdminPanel', payload)
    return data
}

export const currentAdmin = async () => {
    const { data } = await client.get('user/current')
    return data;
}
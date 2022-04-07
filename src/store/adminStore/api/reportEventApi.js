import client from "../client";

export const getReportsEvents = async (payload) =>{
    const { data } = await client.get(`report/event/${payload}`)
    return data;
}

export const approveReportEvent = (payload) =>{
    return client.get('report/event/approve', payload)
}
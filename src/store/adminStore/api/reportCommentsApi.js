import client from "../client";

export const getReportComments = async (payload) => {
    const { data } = await client.get(`report/comment${payload}`)
    return data;
}

export const approveReportComment = (payload) => {
    return client.post('report/comment/approve', payload)
}
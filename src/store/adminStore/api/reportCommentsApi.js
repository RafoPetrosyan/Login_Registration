import client from "../client";

export const getReportComments = async (payload) => {
    const { data } = await client.get(`report/comment${payload}`)
    return data;
}
import client from "../client";

export const getReports = async () =>{
    const { data } = await client.get('report/message');
    return data;
}

export const getReportsById = async (payload) =>{
    const { data } = await client.get(`report/message/${payload}`);
    return data;
}

export const editeReports = (payload) =>{
    return client.put(`report/message/${payload.id}`, payload.messages)
    
}

export const deleteReport = (payload) =>{
    return client.delete(`report/message/${payload}`)
    
}

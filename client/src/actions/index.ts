import axios from 'axios';

export const getGoogleConnectApiUrl = async () => {
    const resp = await axios.get('/auth/google/url', {
        withCredentials: true,
    });
    return resp.data;
};

export const getSheetsList = async () => {
    const resp = await axios.get('/sheets/list', {
        withCredentials: true,
    });
    return await resp.data;
};

export const updateDeduplicationSheets = async (id: string) => {
    let resp;
    try {
        resp = await axios.get(`/sheets/deduplication_updater?id=${id}`, {
            withCredentials: true,
        });
        return await resp.data;
    } catch (error) {
        resp = false;
    }
};

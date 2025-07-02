import {getDownload, getRequest, postRequest} from '/src/lib/axios';

const baseurl = '/microstation';

export const stationApi = {

    update: (data) => {
        return postRequest(`${baseurl}/update`, data);
    },

    query: (data) => {
        return postRequest(`${baseurl}/query`, data);
    },

    //批量删除
    batchDelete: (data) => {
        return postRequest(`${baseurl}/batchDelete`, data);
    },

    add: (data) => {
        return postRequest(`${baseurl}/add`, data);
    },

    export: (data) => {
        return getDownload(`${baseurl}/export`, data);
    },

    delete: (id) => {
        return getRequest(`${baseurl}/delete/${id}`);
    },

    lockBind: (data) => {
        return getRequest(`${baseurl}/lockBind`, data);
    },

    openLock: (data) => {
        return getRequest(`${baseurl}/openLock`, data);
    },
    unbind: (id) => {
        return getRequest(`${baseurl}/unbindLock/${id}`);
    },
};

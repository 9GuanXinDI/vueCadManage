import {getRequest, postRequest} from "/@/lib/axios.js";

export const gridApi = {
    query: (data) => {
        return postRequest(`reseau/query`, data);
    },

    add: (data) => {
        return postRequest(`reseau/add`, data);
    },

    update: (data) => {
        return postRequest(`reseau/update`, data);
    },

    delete: (id) => {
        return getRequest(`reseau/delete/${id}`)
    },

    listAll: () => {
        return getRequest('reseau/listAll');
    }
}

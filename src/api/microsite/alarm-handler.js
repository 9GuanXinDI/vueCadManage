import { getRequest, postRequest} from '/src/lib/axios';

export const alarmHandlerApi = {
    query: (data) => {
        return postRequest('alarmHandle/query', data);
    },

    delete: (id) => {
        return getRequest(`alarmHandle/delete/${id}`);
    },

    update: (data) => {
        return postRequest(`alarmHandle/update`, data);
    },
}

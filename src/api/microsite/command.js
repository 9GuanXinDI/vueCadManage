import { getRequest, postRequest} from '/src/lib/axios';

export const commandApi = {
    query: (data) => {
        return postRequest('taskElease/query', data);
    },

    delete: (id) => {
        return getRequest(`task/delete/${id}`);
    },
}

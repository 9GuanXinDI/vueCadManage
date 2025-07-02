import { getRequest, postRequest} from '/src/lib/axios';

export const taskAPi = {
    commandQuery: (data) => {
        return postRequest('taskElease/query', data);
    },

    commandDelete: (id) => {
        return getRequest(`taskElease/delete/${id}`);
    },

    taskReceive: (data) => {
        return postRequest('taskElease/receiveRecord', data);
    },

    taskDelete: (id) => {
        return getRequest(`task/delete/${id}`);
    },

    /** ** ** ** ** **       任务模版   ** ** ** ** ** ** **/

    taskTemplate: (data) => {
        return postRequest('taskTemplet/query', data);
    },

    addTaskTemplate: (data) => {
        return postRequest('taskTemplet/add', data);
    },

    updateTaskTemplate: (data) => {
        return postRequest('taskTemplet/update', data);
    },

    taskTemplateDelete: (id) => {
        return getRequest(`taskTemplet/delete/${id}`);
    },

    /** ** ** ** ** **       任务审核   ** ** ** ** ** ** **/
    taskReview: (data) => {
        return postRequest('task/examineList', data);
    },

    /** ** ** ** ** **       任务执行   ** ** ** ** ** ** **/
    taskExQuery: (data) => {
        return postRequest('task/ex/query', data);
    },

    taskDetail: (taskId) => {
        return getRequest(`task/examineInfo/${taskId}`);
    },

    taskExamine: (data) => {
        return postRequest('task/examine', data);
    },

    /** ** ** ** ** **       任务发布   ** ** ** ** ** ** **/
    taskEleaseAdd: (data) => {
        return postRequest('taskElease/add', data);
    },

    taskEleaseDelete: (id) => {
        return getRequest(`taskElease/delete/${id}`);
    }
}

import {getDownload, getRequest, postRequest} from '/src/lib/axios';

export const volunteerApi = {
    // 志愿者查询
    employeeQuery: (data) => {
        return postRequest(`employee/page`, data);
    },

    // 志愿者导出
    employeeExport: (data) => {
        return getDownload('employee/export', data);
    },

    // 编辑志愿者
    employeeUpdate: (data) => {
        return postRequest('employee/set', data);
    },

    // 志愿者删除
    employeeDelete: (data) => {
        return postRequest('employee/update/batch/delete', data);
    },

    // 站长查询
    masterQuery: () => {
        return getRequest('employee/master');
    },

    update: (data) => {
        return postRequest(`examine/update`, data);
    },

    // 审核分页查询
    examineQuery: (data) => {
        return postRequest(`examine/page`, data);
    },

    // 转岗申请
    place: (data) => {
        return postRequest(`examine/place`, data);
    },

    // 入职申请
    entry: (data) => {
        return postRequest(`examine/entry`, data);
    },

    // 入职分页查询
    entryQuery: (data) => {
        return postRequest(`examine/entry/page`, data);
    },

    // 审核
    audit: (data) => {
        return postRequest(`examine/audit`, data);
    },


    export: (data) => {
        return getDownload(`examine/export`, data);
    },

    delete: (id) => {
        return getRequest(`examine/delete/${id}`);
    },

    check: (data) => {
        return postRequest('examine/check', data)
    }
}

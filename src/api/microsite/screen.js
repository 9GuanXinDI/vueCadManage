import { getRequest, postRequest } from '/src/lib/axios';

export const screenApi = {
    getMicStatistics: () => {
        return getRequest(`/screen/statistics`);
    },

    getMicList: () => {
        return getRequest(`/screen/stations`);
    },

    // 首页统计
    getIndexStatistics: () => {
        return getRequest('screen/indexStatistics');
    },

    // 数据统计
    getDataStatistics: () => {
        return getRequest('screen/dataStatistics');
    },

    // 警情趋势
    getAlarmTrend: (params = 7) => {
        return getRequest('screen/alarmTrend', { day: params });
    },

    alarmHandle: (params) => {
        return postRequest('alarmHandle/add', params);
    },
    // 获取设备统计
    getDeviceCount: (params) => {
        return postRequest('device/queryCount');
    },
    // 获取头盔对话token
    getHelmetToken: (params) => {
        return postRequest('/helmet-api/helmet/token',params);
    }
}

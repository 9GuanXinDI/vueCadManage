import { postRequest, getRequest } from '/@/lib/axios';

export const deviceApi = {
  // 新建设备信息 @author wdzhao
  create: (param) => {
    return postRequest('/device/add', param);
  },
  // 更新设备信息 @author wdzhao
  update: (param) => {
    return postRequest('/device/update', param);
  },

  // 添加aep设备 @author wdzhao
  addAEP: (param) => {
    return postRequest('/device/addAEP', param);
  },

  // 删除设备信息 @author wdzhao
  delete: (param) => {
    return postRequest(`/device/delete`, param);
  },

  // 设备详情 @author wdzhao
  detail: (id) => {
    return getRequest(`/device/detail/${id}`);
  },

  // 分页查询 @author wdzhao
  pageQuery: (param) => {
    return postRequest('/device/query', param);
  },

  unlock: (deviceId) => {
    return getRequest(`/device/lock/open/${deviceId}`);
  },

  syncAep: (deviceId) => {
    return getRequest(`/device/syncAepStatus/${deviceId}`);
  },
  // 分页查询故障列表
  faultQuery: (param) => {
    return postRequest('/fault/query', param);
  },
  // 删除故障信息
  deleteDefault: (id) => {
    return getRequest(`/fault/delete/${id}`);
  },
}
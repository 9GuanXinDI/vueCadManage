import { postRequest, getRequest } from '/@/lib/axios';

export const productApi = {
  // 新建信息 @author wdzhao
  create: (param) => {
    return postRequest('/oa/product/create', param);
  },

  // 删除信息 @author wdzhao
  delete: (productId) => {

  },

  // 详情 @author wdzhao
  detail: (id) => {
    return getRequest(`/product/detail/${id}`);
  },

  // 根据产品Key 查询产品信息 @author wdzhao
  queryByProductKey: (productKey) => {
    return getRequest(`/product/detail/productKey/${productKey}`);
  },

  // 更新 @author wdzhao
  update: (param) => {
    return postRequest('/product/update', param);
  },

  // 分页查询 @author wdzhao
  pageQuery: (param) => {
    return postRequest('/product/query', param);
  },

  queryAll: () => {
    return postRequest('/product/queryAll');
  }

}
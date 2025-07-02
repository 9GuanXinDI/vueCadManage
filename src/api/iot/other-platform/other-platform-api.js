/**
 * 第三方物联网平台 api 封装
 *
 * @Author:    wdzhao
 * @Date:      2024-08-22 10:48:38
 * @Copyright  wdzhao
 */
import { postRequest, getRequest } from '/@/lib/axios';

export const otherPlatformApi = {

  /**
   * 分页查询  @author  wdzhao
   */
  queryPage : (param) => {
    return postRequest('/otherPlatform/queryPage', param);
  },

  /**
   * 增加  @author  wdzhao
   */
  add: (param) => {
      return postRequest('/otherPlatform/add', param);
  },

  /**
   * 修改  @author  wdzhao
   */
  update: (param) => {
      return postRequest('/otherPlatform/update', param);
  },


  /**
   * 删除  @author  wdzhao
   */
  delete: (id) => {
      return getRequest(`/otherPlatform/delete/${id}`);
  },

  /**
   * 查询AEP设备  @author  wdzhao
   */
  queryAepDevicePage: (param) => {
    return postRequest('/otherPlatform/product/device/queryPage', param);
  },

  /**
   * aep设备添加到平台 @author  wdzhao
   */
  addDevice: (param) => {
    return postRequest('/otherPlatform/product/device/add', param);
  },

  aepAddBatch: (param) => {
    return postRequest('/otherPlatform/product/device/addBatch', param);
  }

};

/**
 * 开锁记录 api 封装
 *
 * @Author:    wdzhao
 * @Date:      2024-09-05 09:04:09
 * @Copyright  wdzhao
 */
import { postRequest, getRequest } from '/@/lib/axios';

export const commandLogApi = {

  /**
   * 分页查询  @author  wdzhao
   */
  queryPage : (param) => {
    return postRequest('/commandLog/queryPage', param);
  },

  /**
   * 增加  @author  wdzhao
   */
  add: (param) => {
      return postRequest('/commandLog/add', param);
  },

  /**
   * 修改  @author  wdzhao
   */
  update: (param) => {
      return postRequest('/commandLog/update', param);
  },


  /**
   * 删除  @author  wdzhao
   */
  delete: (id) => {
      return getRequest(`/commandLog/delete/${id}`);
  },

  /**
   * 批量删除  @author  wdzhao
   */
  batchDelete: (idList) => {
      return postRequest('/commandLog/batchDelete', idList);
  },

};

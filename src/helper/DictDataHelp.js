import {dictApi} from "/@/api/support/dict-api.js";
import {stationApi} from "/@/api/microsite/fire-station.js";

export class DictDataHelp {
    static instance = null;
    typeList = [];      // 申请类型
    placeList = [];     // 职位
    examineStatusList = [];    // 审核状态

    static getInstance() {
        if (!this.instance) {
            this.instance = new DictDataHelp();
        }
        return this.instance;
    }

    async getDictList(key, isAdd) {
        const res = await dictApi.valueList(key);
        return this.formDataToSelect(res.data, isAdd);
    }

    async getMicroSiteList(params) {
        params = params ? params : {pageNum: 1, pageSize: 30};
        params.pageSize=100;
        const res = await stationApi.query(params);
        const list = [];
        res.data.list.forEach((item) => {
            list.push({
                label: item.stationName,
                value: item.stationId
            })
        })
        return list;
    }

    formDataToSelect(list, isAdd) {
        if (!list.length) return list;
        const newList = [];
        list.forEach((item, index) => {
            if (isAdd && index > 0) return;
            const obj = {
                value: item.valueCode,
                label: item.valueName
            }
            newList.push(obj);
        })
        return newList;
    }

}

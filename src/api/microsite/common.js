import {getRequest} from "/@/lib/axios.js";

export const commonApi = {
    getAreaTree: () => {
        return getRequest(`/area/treeList`);
    },
}

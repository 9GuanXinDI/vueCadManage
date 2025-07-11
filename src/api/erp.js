import { getRequest, postRequest } from '/src/lib/axios';

export const erpApi = {
    queryAccountByTenant: (tenantCode) => {
        return getRequest('/tenant/queryTenant/' + tenantCode);
    },
    activateErpDepotAPI: (params) => {
        return getRequest('/microstation/activateErpDepot/', params);
    },
    queryFeedingMaterialAPI: (params) => {
        return getRequest('/material/query', params);
    },
    validateMaterial: (param) => {
        return postRequest('/material/valid', param);
    },
    feedingAPI: (param) => {
        return postRequest('/mes/feeding', param);
    },
    
    feedingMaterialAPI: (param) => {
        return postRequest('/mes-material-controller/feedingMaterial', param);
    },
    
     unloadAPI: (param) => {
        return postRequest('/mes/unload', param);
    },
     queryLogAPI: (param) => {
        return postRequest('/mes/log/query', param);
    },
    
}

import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import VueHook from 'alova/vue';

const alovaInstance = createAlova({
  requestAdapter: adapterFetch(),
  statesHook: VueHook,
  responded: response => response.json()
});

export default alovaInstance;

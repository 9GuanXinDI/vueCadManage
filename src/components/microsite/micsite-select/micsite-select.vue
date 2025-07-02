<template>
  <a-form ref="micFormRef" :model="formData">
    <a-form-item label="所属微站：" name="stationId" class="smart-query-form-item margin-right-16"
                 :label-col="{ span: props.labelCol }" :wrapper-col="{ span: props.wrapperCol }" :rules="props.isRule ? [{ required: true, message: '请选择所属微站' }] : []">
      <a-select show-search v-model:value="formData.stationId"
                @popupScroll="handlePopupScroll"  @search="stationChange" :filter-option="filterOption" >
        <a-select-option v-for="item in stationTree" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>

<script setup>
// 节流
import {throttle} from "/@/utils/common-util.js";
import {DictDataHelp} from "/@/helper/DictDataHelp.js";
import {onBeforeMount, ref, watch} from "vue";
import {PAGE_SIZE} from "/@/constants/common-const.js";

const stationTree = ref([]);
const micFormRef = ref();
const rules = ref();

const params = ref({
  stationName: '',
  pageNum: 1,
  pageSize: PAGE_SIZE,
});

const formData = ref({
  stationId: ''
})

const props = defineProps({
  isRule: {
    type: Boolean,
    default: false
  },
  labelCol: {
    type: Number,
    default: 6
  },
  wrapperCol: {
    type: Number,
    default: 16
  }
})

defineExpose({
  getStationId,
  validate
})

onBeforeMount(async () => {
  stationTree.value = await DictDataHelp.getInstance().getMicroSiteList(params.value);
})

const throttledUpdateStation = throttle(updateStation, 500);

function stationChange(val) {
  throttledUpdateStation(val);
  params.value.pageNum = 1;
}

function filterOption() {
  return stationTree.value;
}

// 原始的函数
async function updateStation(val) {
  params.value.stationName = val;
  stationTree.value = await DictDataHelp.getInstance().getMicroSiteList(params.value);
}

async function loadStation() {
  params.value.pageNum += 1;
  const list = await DictDataHelp.getInstance().getMicroSiteList(params.value);
  if (!list.length) return;
  stationTree.value = [...stationTree.value, ...list];
}

function handlePopupScroll(e){
  const {target} = e;
  const {scrollTop, scrollHeight, clientHeight} = target;
  if (scrollTop + clientHeight == scrollHeight) {
    loadStation();
  }
}

function getStationId() {
  return formData.value.stationId;
}

async function validate() {
   await micFormRef.value.validate()
}
</script>

<style scoped>

</style>

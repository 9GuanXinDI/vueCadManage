<template>
  <a-form ref="gridFormRef" :model="formData">
    <a-form-item label="所属网格：" name="grid" class="smart-query-form-item margin-right-16"
                 :label-col="{ span: labelCol }" :wrapper-col="{ span: wrapperCol }" :rules="props.isRule ? [{ required: true, message: '请选择所属网格' }] : []">
      <a-cascader v-model:value="formData.grid" :options="gridTree" changeOnSelect :allowClear="false" />
    </a-form-item>
  </a-form>
</template>

<script setup>

import {onBeforeMount, ref} from "vue";
import {gridApi} from "/@/api/microsite/grid.js";
import {hanlderGridData} from "/@/utils/common-util.js";

const gridTree = ref();
const gridFormRef = ref();

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
  getGridId,
  validate
})


onBeforeMount(async () => {
  const result = await gridApi.listAll();
  gridTree.value = hanlderGridData(result.data);
})

const formData = ref({
  grid: null
})

function getGridId() {
  return formData.value.grid.pop();
}

async function validate() {
  await gridFormRef.value.validate()
}

</script>

<style scoped>

</style>

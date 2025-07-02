<template>
  <a-form-item class="smart-query-form-item">
    <a-button class="margin-right" type="primary" @click="onSearch">
      <template #icon><SearchOutlined /></template>
      查询
    </a-button>
    <a-button class="margin-right" @click="onReset" >
      <template #icon><ReloadOutlined /></template>
      重置
    </a-button>
    <a-button class="margin-right" @click="onExport" v-if="isExport">
      <template #icon><UploadOutlined /></template>
      导出
    </a-button>
  </a-form-item>
</template>

<script setup>
const props = defineProps({
  isExport: {type: Boolean, default: false},  // 导出按钮
  isPrint:  {type: Boolean, default: false}   // 打印按钮
});
const emit = defineEmits(['onSearch', 'onReset', 'onExport']);
function onSearch() {
  emit('onSearch');
}
function onReset() {
  emit('onReset');
}
function onExport() {
  emit('onExport');
}
</script>

<style scoped>
.margin-right {
  margin-right: 15px;
}
</style>

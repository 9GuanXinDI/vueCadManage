<template>
  <span>
     <a-tooltip title="刷新">
      <a-button type="text" @click="props.refresh" size="small">
        <template #icon><redo-outlined /></template>
      </a-button>
    </a-tooltip>
     <a-tooltip title="显示/隐藏">
      <a-button type="text" @click="tableShow" size="small">
        <template #icon><setting-outlined /></template>
      </a-button>
    </a-tooltip>
    <a-tooltip title="全屏" v-if="!fullScreenFlag">
      <a-button type="text" @click="fullScreen" size="small">
        <template #icon><fullscreen-outlined /></template>
      </a-button>
    </a-tooltip>
    <a-tooltip title="取消全屏" v-if="fullScreenFlag">
      <a-button type="text" @click="fullScreen" size="small">
        <template #icon><fullscreen-exit-outlined /></template>
      </a-button>
    </a-tooltip>
  </span>
</template>

<script setup>
  import _ from 'lodash';
  import { tableColumnApi } from '/src/api/support/table-column-api';
  import { onMounted, reactive, ref, watch } from 'vue';
  import { message } from 'ant-design-vue';
  import { smartSentry } from '/@/lib/smart-sentry';
  const props = defineProps({
    modelValue: { type: Array, default: new Array() },    // 表格列数组
    refresh: { type: Function, required: true},    // 刷新表格函数
    tableId: { type: Number, require: true }       // 表格id
  });

  const emit = defineEmits(['update:modelValue', 'columnShow']);

  // 原始表格列数据（复制一份最原始的columns集合，以供后续各个地方使用）
  let originalColumn = _.cloneDeep(props.modelValue);

  onMounted(buildUserTableColumns);

  //构建用户的数据列
  async function buildUserTableColumns() {
    if (!props.tableId) {
      return;
    }

    let userTableColumnArray = [];
    try {
      let res = await tableColumnApi.getColumns(props.tableId);
      if (res.data) {
        try {
          userTableColumnArray = JSON.parse(res.data);
        } catch (e1) {
          smartSentry.captureError(e1);
        }
      }
    } catch (e) {
      smartSentry.captureError(e);
    }
  }

  // ----------------- 全屏 -------------------
  const fullScreenFlag = ref(false);
  function fullScreen() {
    if (fullScreenFlag.value) {
      //取消全屏
      exitFullscreen(document.querySelector('#smartAdminLayoutContent'));
      fullScreenFlag.value = false;
    } else {
      //全屏
      launchFullScreen(document.querySelector('#smartAdminLayoutContent'));
      fullScreenFlag.value = true;
    }
  }

  //判断各种浏览器 -全屏
  function launchFullScreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else {
      message.error('当前浏览器不支持部分全屏！');
    }
  }
  //判断各种浏览器 -退出全屏
  function exitFullscreen(element) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  // ========= 定义 watch 监听 ===============
  watch(
    () => props.tableId,
    (e) => {
      if (e) {
        originalColumn = _.cloneDeep(props.modelValue);
        buildUserTableColumns();
      }
    },
    { immediate: true }
  );

  // ===========
 function tableShow() {
  emit('columnShow')
 }
</script>

<template>
  <div class="content">
    <!-- 时间 -->
    <div>
      起始：<a-date-picker v-model:value="startTime" class="mr-1" /> 终止：<a-date-picker v-model:value="endTime" class="mr-1" />
      <a-button @click="queryLog" class="mr-1">查询</a-button>
    </div>
    <div class="text-box" ref="scrollContainer">
      <div v-for="item in logList" :key="item.time" class="log-item">
        <div class="mb-1">【消息ID】：{{ item.commandId }}</div>
        <div class="mb-1">【日志时间】：{{ item.requestDate }}</div>
        <div class="mb-1">【日志级别】：{{ item.logLevel }}</div>
        <div class="mb-1">【日志内容】：{{ item.commandRequestJson }}</div>
        <div class="mb-1">【响应内容】：{{ item.responseJson }}</div>
      </div>
      <div v-if="loading" class="loading">加载中...</div>
      <div v-if="noMoreData" class="no-more">没有更多数据了</div>
    </div>
  </div>
</template>

<script setup>
import { erpApi } from '/@/api/erp';

let logList = ref([
  {
    time: '2025-06-15 12:33:21',
    name: 'H5_admin-ssdem',
    des: '测试是的试试四川上手术十四红寺湖说啥是啥',
    num: 'cpp',
    limit: 'cpp',
    operator: '',
    result: '',
    chufa: 'cpp',
  },
  {
    time: '2025-06-15 12:33:21',
    name: 'H5_admin-ssdem',
    des: '测试是的试试四川上手术十四红寺湖说啥是啥',
    num: 'cpp',
    limit: 'cpp',
    operator: '',
    result: '',
    chufa: 'cpp',
  },
  {
    time: '2025-06-15 12:33:21',
    name: 'H5_admin-ssdem',
    des: '测试是的试试四川上手术十四红寺湖说啥是啥',
    num: 'cpp',
    limit: 'cpp',
    operator: '',
    result: '',
    chufa: 'cpp',
  },
  {
    time: '2025-06-15 12:33:21',
    name: 'H5_admin-ssdem',
    des: '测试是的试试四川上手术十四红寺湖说啥是啥',
    num: 'cpp',
    limit: 'cpp',
    operator: '',
    result: '',
    chufa: 'cpp',
  },
  {
    time: '2025-06-15 12:33:21',
    name: 'H5_admin-ssdem',
    des: '测试是的试试四川上手术十四红寺湖说啥是啥',
    num: 'cpp',
    limit: 'cpp',
    operator: '',
    result: '',
    chufa: 'cpp',
  },
]);
let startTime = ref('');
let endTime = ref('');
const loading = ref(false);
const noMoreData = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const scrollContainer = ref(null);
/**
 * @name 查询日志
 */
async function queryLog(isLoadMore = false) {
  if (loading.value) return;

  loading.value = true;
  try {
    const res = await erpApi.queryLogAPI({
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      startTime: startTime.value,
      endTime: endTime.value,
    });
    if (res.code == 0) {
      if (isLoadMore) {
        logList.value = [...logList.value, ...res.data.list];
      } else {
        logList.value = res.data.list;
      }

      // 检查是否还有更多数据
      noMoreData.value = res.data.list.length < pageSize.value;
    }
  } finally {
    loading.value = false;
  }
}
// 加载更多
function loadMore() {
  if (loading.value || noMoreData.value) return;

  currentPage.value += 1;
  queryLog(true);
}
// 处理滚动事件
function handleScroll() {
  if (!scrollContainer.value) return;

  const container = scrollContainer.value;
  const scrollTop = container.scrollTop;
  const clientHeight = container.clientHeight;
  const scrollHeight = container.scrollHeight;

  // 距离底部50px时加载更多
  if (scrollHeight - (scrollTop + clientHeight) < 50) {
    loadMore();
  }
}
onMounted(() => {
  queryLog(false);
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', handleScroll);
  }
});
</script>
<style lang="scss" scoped>
@import '../../../../style/mixins.scss';
.content {
  // width: 100%;
  padding: vw(20);
  margin: vw(20);
  height: calc(100% - vw(190));
  overflow: hidden;
  background: #fff;
  border: 1px solid #000;
  border-radius: vw(5);
}

.mr-1 {
  margin-right: vw(10);
}
.mb-1 {
  margin-bottom: vw(10);
}
.text-box {
  padding: vw(20);
  margin-top: vw(10);
  border: 1px solid #d9d9d9;
  border-radius: vw(5);
  height: calc(100% - vw(60));
  overflow-y: auto;
}
.log-item {
  padding: vw(10) 0;
  border-bottom: 1px solid #f0f0f0;
}

.loading,
.no-more {
  text-align: center;
  padding: vw(10);
  color: #999;
}
</style>
<style>
</style>

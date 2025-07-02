<template>
  <div class="content">
    <!-- 时间 -->
     <div>
      <div v-for="item in logList" :key="item.time">
        <div>【日志时间】{{ item.time }}</div>
        <div>【日志级别】{{ item.name }}</div>
        <div>【日志内容】{{ item.des }}</div>
        <div>{{ item.num }}</div>
      </div>
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


onMounted(() => {
 
});
onUnmounted(() => {
  
});
</script>
<style lang="scss" scoped>
@import '../../../../style/mixins.scss';
.content {
  // width: 100%;
  padding: 0 vw(20);
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
</style>
<style>

</style>

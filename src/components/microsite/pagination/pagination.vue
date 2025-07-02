<template>
  <div class="smart-query-table-page">
    <a-pagination
        showSizeChanger
        showQuickJumper
        show-less-items
        :pageSizeOptions="PAGE_SIZE_OPTIONS"
        :defaultPageSize="PAGE_SIZE"
        v-model:current="pageNum"
        v-model:pageSize="pageSize"
        :total="total"
        @change="change"
        :show-total="(total) => `共${total}条`"
    />
  </div>
</template>

<script setup>
  import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from '/@/constants/common-const.js';
  import { ref } from 'vue'

  const pageNum = ref(1);
  const pageSize = ref(PAGE_SIZE);
  const props = defineProps({
    total: Number,
  });

  const emit = defineEmits(['change', 'showSizeChange']);

  function change() {
    emit('change', {pageNum: pageNum, pageSize: pageSize});
  }
</script>

<style scoped>

</style>

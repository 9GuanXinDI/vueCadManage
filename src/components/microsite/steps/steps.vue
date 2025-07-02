<template>
  <div>
    <div class="step-item" v-for="(item, index) in recordList" :key="index">
      <div class="line"></div>
      <div class="step-num">
        {{ index + 1 }}
      </div>
      <div class="step-des">
        <div v-if="index">
          <div class="title">
            {{ item.createTime }} {{ item.examineByName }}（管理员） 审核结果：
            <span
              :style="{ color: item.examineOper === '同意' ? '#52C41A' : '#F5222D' }"
              >{{ item.examineOper }}</span
            >
          </div>
          <div class="opinion">审核意见：{{ item.opinion }}</div>
        </div>
        <div v-else>
          <div class="title">
            {{ item.createTime }} {{ item.examineByName }}（志愿者） 提交
            <span class="type">{{ props.type }}</span> 申请
          </div>
          <div class="opinion">备注：{{ item.opinion }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const props = defineProps({
  recordList: {
    type: Array,
    default: [],
  },
  type: String,
});
onMounted(() => {
  console.log(props.recordList);
});
</script>

<style scoped>
.step-item {
  display: flex;
  height: 56px;
  position: relative;
}
.line {
  position: absolute;
  height: 20px;
  border-left: 1px solid rgba(0, 0, 0, 0.06);
  left: 11px;
  top: 30px;
}
.step-num {
  width: 22px;
  height: 22px;
  background: #1677ff;
  border-radius: 50%;
  font-size: 14px;
  color: #ffffff;
  line-height: 22px;
  text-align: center;
  margin-right: 16px;
}
.title {
  font-weight: bold;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 22px;
  text-align: left;
}
.type {
  color: #1677ff;
}
.opinion {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
  text-align: left;
}
</style>

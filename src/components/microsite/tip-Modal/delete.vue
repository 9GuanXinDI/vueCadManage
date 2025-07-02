<template>
    <a-modal v-model:open="modalVis"  width="438px" :okType="'danger'" :ok-text="'删除'" :closable="false"
             @ok="result(true)" @cancel="result(false)">
      <div class="modal-container">
        <div class="tip-container">
          <img src="../../../assets/microsite/tip-images/warning.png" />
          <div class="tipText">确认要删除这条信息吗？</div>
        </div>
        <div class="text">删除后，该信息将不可恢复</div>
      </div>
    </a-modal>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  visible: Boolean
})
const modalVis = ref(props.visible)
watch(() => props.visible, (newVal) => {
  modalVis.value = newVal;
})

const emit = defineEmits(['confirm'])

function result(val) {
  emit('confirm', val);
}
</script>

<style scoped lang="less">
.tip-container {
  display: flex;
  align-items: center;
  img {
    width: 22px;
    height: 22px;
  }
  .tipText {
    margin-left: 16px;
    font-weight: 500;
    font-size: 16px;
    color: rgba(0,0,0,0.85);
    line-height: 24px;
  }
}
.text {
  font-weight: 400;
  font-size: 14px;
  color: rgba(0,0,0,0.65);
  line-height: 22px;
  margin: 12px 0 46px 38px;
}
</style>
<style>
 .ant-modal .ant-modal-content {
  padding: 32px 32px 24px !important;
}
</style>

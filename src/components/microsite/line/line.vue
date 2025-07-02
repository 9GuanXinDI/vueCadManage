<template>
  <div class="line-container">
    <img src="/@/assets/microsite/images/down-icon.png" />
    <div>{{props.title}}</div>
  </div>
</template>

<script setup>

const props = defineProps({
  title: String
})
</script>

<style scoped lang="less">
.line-container {
  background: #FAFAFA;
  height: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  img {
    width: 20px;
    height: 20px;
    margin-left: 16px;
    margin-right: 12px;
  }
  font-weight: 600;
  font-size: 16px;
  color: rgba(0,0,0,0.88);
  line-height: 24px;
}
</style>

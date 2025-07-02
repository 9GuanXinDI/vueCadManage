<template>
  <a-modal v-model:open="mapDialogVis" class="map-modal modal-title" :title="title"
           width="688px" style="padding: 24px" :footer="isView ? null : undefined"
           @ok="chooseAddress(true)" @cancel="chooseAddress(false)">
    <a-input id="tipInput" class="map-input" :disabled="isView" v-model:value="address" placeholder="请输入关键字选取地点" />
    <div class="map-container" id="mapContainer"></div>
  </a-modal>
</template>

<script setup>
import {MapHelper} from "/@/helper/MapHelper.js";
import {ref, watch, onUpdated} from "vue";

const address = ref('')
const mapHelper = MapHelper.getInstance();

const emit = defineEmits(['address', 'cancel'])

const props = defineProps({
  title: String,
  lnglat: String,
  visible: Boolean,
  isView: {         // 展示 | 选择
    type: Boolean,
    default: false
  }
})

const mapDialogVis = ref(props.visible)
watch(() => props.visible, (newVal) => {
  mapDialogVis.value = newVal;
})

onUpdated(async () => {
  mapDialogVis.value && await mapHelper.initMap('mapContainer', 'tipInput', props.isView);
  props.lnglat && mapHelper.showPosition(props.lnglat);
})

function chooseAddress(val) {
  const addressInfo = mapHelper.getAddressInfo();
  mapDialogVis.value = false;
  emit('address', val ? addressInfo : null);
  mapHelper.setSearchWord('');
  mapHelper.destroy();
}
</script>

<style scoped>
.map-input {
  margin: 24px 0;
}
.map-container {
  width: 592px;
  height: 400px;
}
</style>

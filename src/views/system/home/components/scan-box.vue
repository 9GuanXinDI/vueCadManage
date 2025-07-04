<template>
  <div class="content">
    <div class="left-box">
      <div class="box-title">导航栏</div>
      <div class="gradient-line"></div>
      <div>
        <div
          v-for="(item, index) in list"
          :key="index"
          class="list-item"
          :class="indexName == item.name ? 'list-item-select' : ''"
          @click="changeIndex(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="right-box">
      <div class="right-box-one">
        <div style="display: flex; height: 100%">
          <div class="cad-content">
            <!-- <cad-content></cad-content> -->
            <img src="../../../../assets/content-img.png" alt="" style="width: 100%; height: 100%" />
          </div>
          <div class="scan-content" style="position: relative">
            <div class="scan-content-item">
              <div class="scan-content-title">{{ indexName }}主机构</div>
              <a-form :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-item label="物料条码：" :wrapper-col="{ span: 16 }">
                  <a-input v-model:value="form.materialBarcode" readonly />
                </a-form-item>
                <div style="display: flex">
                  <a-form-item label="安装位置：">
                    <a-input v-model:value="form.positionCode" readonly />
                  </a-form-item>

                  <a-form-item label="单位：" :label-col="{ style: { width: '60px' } }">
                    <a-input v-model:value="form.unit" readonly />
                  </a-form-item>
                  <a-form-item label="实时消耗数量：" :label-col="{ style: { width: '120px' } }">
                    <a-input v-model:value="form.consumptionQty" />
                  </a-form-item>
                </div>
                <div style="display: flex">
                  <a-form-item label="物料编码：">
                    <a-input v-model:value="form.materialCode" readonly />
                  </a-form-item>
                  <a-form-item label="上料系统数量：" :label-col="{ style: { width: '120px' } }">
                    <a-input v-model:value="form.feedingQuantity" readonly />
                  </a-form-item>
                </div>
                <div style="display: flex">
                  <a-form-item label="批次号：">
                    <a-input v-model:value="form.batchNumber" readonly />
                  </a-form-item>
                  <a-form-item label="下料消耗数量：" :label-col="{ style: { width: '120px' } }">
                    <a-input v-model:value="form.unloadingSystemQty" readonly />
                  </a-form-item>
                </div>

                <a-form-item label="上料结果：">
                  <div style="display: flex">
                    <a-button :type="feedingMaterialUpTypeOne" class="mr-1">完成</a-button>
                    <a-input class="mr-1" v-model:value="feedingMaterialUpTypeOneText"></a-input>
                    <a-button type="primary" @click="feedingMaterialUp(form, 1)" :disabled="!form.materialBarcode||feedingMaterialUpTypeOne=='primary'">物料上机</a-button>
                  </div>
                </a-form-item>

                <a-form-item label="下料结果：">
                  <div style="display: flex">
                    <a-button type="default" class="mr-1">完成</a-button>
                    <a-input class="mr-1"></a-input>
                    <a-button type="primary">物料下机</a-button>
                  </div>
                </a-form-item>

                <div class="check-box">
                  <a-checkbox v-model:checked="form.isFullConsumption">是否全部消耗</a-checkbox>
                </div>
                <div class="expirationate-box">{{ form.expirationate }}</div>
                <div class="status-box">
                  <a-button type="primary">启用</a-button>
                  <!-- <a-button type="primary" disabled>启用</a-button> -->
                </div>
              </a-form>
            </div>
            <div class="scan-content-item scan-content-item-close">
              <div class="scan-content-title">{{ indexName }}备机构</div>
              <a-form :model="formTwo" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-item label="物料条码：" :wrapper-col="{ span: 16 }">
                  <a-input v-model:value="formTwo.materialBarcode" readonly />
                </a-form-item>
                <div style="display: flex">
                  <a-form-item label="安装位置：">
                    <a-input v-model:value="formTwo.positionCode" readonly />
                  </a-form-item>

                  <a-form-item label="单位：" :label-col="{ style: { width: '60px' } }">
                    <a-input v-model:value="formTwo.unit" readonly />
                  </a-form-item>
                  <a-form-item label="实时消耗数量：" :label-col="{ style: { width: '120px' } }">
                    <a-input v-model:value="formTwo.consumptionQty" />
                  </a-form-item>
                </div>
                <div style="display: flex">
                  <a-form-item label="物料编码：">
                    <a-input v-model:value="formTwo.materialCode" />
                  </a-form-item>
                  <a-form-item label="上料系统数量：" :label-col="{ style: { width: '120px' } }">
                    <a-input v-model:value="formTwo.feedingQuantity" />
                  </a-form-item>
                </div>
                <div style="display: flex">
                  <a-form-item label="批次号：">
                    <a-input v-model:value="formTwo.batchNumber" />
                  </a-form-item>
                  <a-form-item label="下料消耗数量：" :label-col="{ style: { width: '120px' } }">
                    <a-input v-model:value="form.unloadingSystemQty" />
                  </a-form-item>
                </div>

                <a-form-item label="上料结果：">
                  <div style="display: flex">
                    <a-button :type="feedingMaterialUpTypeTwo" class="mr-1">完成</a-button>
                    <a-input class="mr-1" v-model:value="feedingMaterialUpTypeTwoText"></a-input>
                    <a-button type="primary" @click="feedingMaterialUp(formTwo, 2)" :disabled="!formTwo.materialBarcode||feedingMaterialUpTypeTwo=='primary'">物料上机</a-button>
                  </div>
                </a-form-item>

                <a-form-item label="下料结果：">
                  <div style="display: flex">
                    <a-button type="default" class="mr-1">完成</a-button>
                    <a-input class="mr-1"></a-input>
                    <a-button type="primary">物料下机</a-button>
                  </div>
                </a-form-item>

                <div class="check-box">
                  <a-checkbox v-model:checked="form.isAllConsumption">是否全部消耗</a-checkbox>
                </div>
                <div class="expirationate-box">{{ formTwo.expirationate }}</div>
                <div class="status-box">
                  <!-- <a-button type="primary">启用</a-button> -->
                  <a-button type="primary" disabled>启用</a-button>
                </div>
              </a-form>
            </div>
          </div>
        </div>
      </div>
      <div class="right-box-two">
        <div class="tab-header-line">
          <div class="tab-one tab-header-height">确认</div>
          <div class="tab-two tab-header-height">时间</div>
          <div class="tab-three tab-header-height">名称</div>
          <div class="tab-four tab-header-height">描述</div>
          <div class="tab-five tab-header-height">数值</div>
          <div class="tab-six tab-header-height">限值</div>
          <div class="tab-seven tab-header-height">操作人</div>
          <div class="tab-eight tab-header-height">处理结果</div>
          <div class="tab-nine tab-header-height">触发值</div>
        </div>
        <div class="tab-conten">
          <div
            v-for="(item, index) in logList"
            :key="index"
            class="tab-line"
            :class="index == logIndex ? 'select-tab-line' : ''"
            @click="logIndex = index"
          >
            <div class="tab-one tab-height">
              <div class="red-box"></div>
            </div>
            <div class="tab-two tab-height" :title="item.time">{{ item.time }}</div>
            <div class="tab-three tab-height" :title="item.des">{{ item.des }}</div>
            <div class="tab-four tab-height" :title="item.des">{{ item.des }}</div>
            <div class="tab-five tab-height" :title="item.num">{{ item.num }}</div>
            <div class="tab-six tab-height" :title="item.limit">{{ item.limit }}</div>
            <div class="tab-seven tab-height" :title="item.operator">{{ item.operator }}</div>
            <div class="tab-eight tab-height" :title="item.result">{{ item.result }}</div>
            <div class="tab-nine tab-height" :title="item.chufa">{{ item.chufa }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CadContent from '/@/components/cad-content.vue';
import { erpApi } from '/@/api/erp';
const props = defineProps({
  scanContent: {
    type: Object,
    default: () => {},
  },
});
let indexName = ref('');
let feedingMaterialUpTypeOne = ref('default');
let feedingMaterialUpTypeTwo = ref('default');
let feedingMaterialUpTypeOneText = ref('');
let feedingMaterialUpTypeTwoText = ref('');
let list = ref([
  {
    name: `L1线正向注液`,
    idOne: 'L1-1-A',
    idTwo: 'L1-1-B',
  },
  {
    name: `L1线镜向注液`,
    idOne: 'L1-2-A',
    idTwo: 'L1-2-B',
  },
  {
    name: `L2线一次注液`,
    idOne: 'L2-1-A',
    idTwo: 'L2-1-B',
  },
  {
    name: `L2线二次注液`,
    idOne: 'L2-2-A',
    idTwo: 'L2-2-B',
  },
  {
    name: `L3线一次注液`,
    idOne: 'L3-1-A',
    idTwo: 'L3-1-B',
  },
  {
    name: `L3线二次注液`,
    idOne: 'L3-2-A',
    idTwo: 'L3-2-B',
  },
  {
    name: `L4线一次注液`,
    idOne: 'L4-1-A',
    idTwo: 'L4-1-B',
  },
  {
    name: `L4线二次注液`,
    idOne: 'L4-2-A',
    idTwo: 'L4-2-B',
  },
]);
let logIndex = ref(0);
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

const deviceInfo = ref({});

const labelCol = { style: { width: '80px' } };
const wrapperCol = { span: 14 };
let form = ref({
  materialBarcode: '',
  positionCode: '',
  unit: '',
  materialCode: '',
  batchNumber: '',
  feedingQuantity: '',
  unloadingSystemQty: '',
  consumptionQty: '',
  isFullConsumption: false,
  expirationate:''
});
let formTwo = ref({
  materialBarcode: '',
  positionCode: '',
  unit: '',
  materialCode: '',
  batchNumber: '',
  feedingSystemQty: '',
  consumptionQty: '',
  unloadingSystemQty: '',
  isAllConsumption: false,
  expirationate:''
});
function getIndexName(deviceNo){
  list.value.forEach((item) => {
    if(item.idOne == deviceNo||item.idTwo == deviceNo){
      indexName.value = item.name;
    }
  });
}
/**
 * @name 获取scoket数据
 */
function getSocketData(newVal) {
  list.value.forEach((item) => {
    debugger;
    if (item.idOne == newVal.positionCode) {
      indexName.value = item.name;
      form.value = {
        materialBarcode: newVal.materialBarcode,
        positionCode: newVal.positionCode,
        unit: newVal.unit,
        materialCode: newVal.materialCode,
        batchNumber: newVal.batchNumber,
        feedingQuantity: newVal.feedingQuantity,
        unloadingSystemQty: '',
        consumptionQty: '',
        isFullConsumption: false,
        expirationate:newVal.expirationate||''
      };
      formTwo.value = {
        materialBarcode: '',
        positionCode: '',
        unit: '',
        materialCode: '',
        batchNumber: '',
        feedingSystemQty: '',
        consumptionQty: '',
        unloadingSystemQty: '',
        isAllConsumption: false,
        expirationate:''
      };
    }
    if (item.idTwo == newVal.positionCode) {
      indexName.value = item.name;
      form.value = {
        materialBarcode: '',
        positionCode: '',
        unit: '',
        materialCode: '',
        batchNumber: '',
        feedingSystemQty: '',
        consumptionQty: '',
        unloadingSystemQty: '',
        isAllConsumption: false,
        expirationate:''
      };
      formTwo.value = {
        materialBarcode: newVal.materialBarcode,
        positionCode: newVal.positionCode,
        unit: newVal.unit,
        materialCode: newVal.materialCode,
        batchNumber: newVal.batchNumber,
        feedingQuantity: newVal.feedingQuantity,
        unloadingSystemQty: '',
        consumptionQty: '',
        isFullConsumption: false,
        expirationate:newVal.expirationate||''
      };
    }
  });
}

/**
 * @name 切换tab
 */
const changeIndex = async (item) => {
  indexName.value = item.name;
  feedingMaterialUpTypeOne.value = 'default';
  feedingMaterialUpTypeOneText.value = '';
  feedingMaterialUpTypeTwo.value = 'default';
  feedingMaterialUpTypeTwoText.value = '';
  let dataOne = await queryFeedingMaterial(item.idOne);
  if (dataOne) {
    feedingMaterialUpTypeOne.value = dataOne.feedingResult ? 'primary' : 'default';
    form.value = dataOne;

    feedingMaterialUpTypeOneText.value = '完成';
  } else {
    form.value = {
      materialBarcode: '',
      positionCode: '',
      unit: '',
      materialCode: '',
      batchNumber: '',
      feedingQuantity: '',
      unloadingSystemQty: '',
      consumptionQty: '',
      isFullConsumption: false,
      expirationate:''
    };
  }
  let dataTwo = await queryFeedingMaterial(item.idTwo);
  if (dataTwo) {
    feedingMaterialUpTypeTwo.value = dataTwo.feedingResult ? 'primary' : 'default';
    formTwo.value = dataTwo;
    feedingMaterialUpTypeTwoText.value = '完成';
  } else {
    formTwo.value = {
      materialBarcode: '',
      positionCode: '',
      unit: '',
      materialCode: '',
      batchNumber: '',
      feedingSystemQty: '',
      consumptionQty: '',
      unloadingSystemQty: '',
      isAllConsumption: false,
      expirationate:''
    };
  }
};
/**
 * @name 查询上料结果
 */
async function queryFeedingMaterial(positionCode) {
  const res = await erpApi.queryFeedingMaterialAPI({
    positionCode: positionCode,
  });
  if (res.code == 0) {
    return res.data;
  } else {
    return null;
  }
}

/**
 * @name 上料
 */
const feedingMaterialUp = async (form, type) => {
  feedingMaterialUpTypeOne.value = 'default';
  feedingMaterialUpTypeTwo.value = 'default';
  feedingMaterialUpTypeOneText.value = '';
  feedingMaterialUpTypeTwoText.value = '';
  const res = await erpApi.feedingAPI(form);
  if (res.code == 0) {
    if (type == 1) {
      feedingMaterialUpTypeOne.value = 'primary';
      feedingMaterialUpTypeOneText.value = '完成';
    } else {
      feedingMaterialUpTypeTwo.value = 'primary';
      feedingMaterialUpTypeTwoText.value = '完成';
    }
  } else {
    if (type == 1) {
      feedingMaterialUpTypeOne.value = 'default';
      feedingMaterialUpTypeOneText.value = res.msg;
    } else {
      feedingMaterialUpTypeTwo.value = 'default';
      feedingMaterialUpTypeTwoText.value = res.msg;
    }
  }
};
defineExpose({
  getSocketData,
  getIndexName
});
onMounted(() => {
  changeIndex(list.value[0]);
});
</script>
<style lang="scss" scoped>
@import '../../../../style/mixins.scss';
.content {
  width: 100%;
  padding: 0 vw(20);
  margin-top: vw(10);
  height: calc(100% - vw(150));
  overflow: hidden;
  .left-box {
    float: left;
    width: 10%;
    height: 100%;
    margin-right: vw(10);
    padding: 0 vw(20);
    border: 1px solid #042e5e;
    border-radius: 8px;
    box-sizing: border-box;
    .list-item {
      width: 100%;
      height: vw(50);
      margin: vw(20) 0;
      text-align: center;
      line-height: vw(50);
      font-size: vw(18);
      color: #009cb3;
      cursor: pointer;
      background: rgba(35, 150, 255, 0.2);
    }
    .list-item-select {
      background: #000e85;
      color: #fff;
      // background-image: linear-gradient(to right, #00b4bc 5%, #000e85) !important;
    }
  }
  .right-box {
    float: left;
    width: calc(90% - vw(10));
    height: 100%;
  }
  .right-box-one {
    width: 100%;
    height: 70%;
    padding: 0 vw(20);
    border: 1px solid #042e5e;
    border-radius: 8px;
    .cad-content {
      width: 50%;
      height: calc(100% - vw(50));
      margin-top: vw(10);
    }
    .scan-content {
      width: calc(50% - vw(10));
      height: 100%;
      margin-left: vw(10);
      color: #00b4bc;
      font-size: vw(18);
      text-align: center;

      .scan-content-item {
        position: relative;
        width: 100%;
        height: calc((100% - vw(30)) * 0.5);
        border: 1px solid #fff;
        border-radius: 8px;
        margin: vw(10) 0;
        padding: vw(10);
        box-sizing: border-box;
        color: #fff;
        .scan-content-title {
          margin-bottom: vw(8);
          text-align: left;
          color: #356bab;
        }
        .check-box {
          position: absolute;
          bottom: vw(40);
          right: vw(20);
          color: #fff;
          font-size: vw(16);
          .ant-form-item-label > label {
            color: #fff !important;
          }
          .ant-checkbox-wrapper {
            color: #fff !important;
          }
        }
        .status-box {
          position: absolute;
          top: vw(10);
          right: vw(20);
          color: #fff;
          font-size: vw(16);
        }
      }
      .scan-content-value {
        margin-top: vw(10);
        padding-bottom: vw(20);
        font-size: vw(16);
      }
    }
  }
  .right-box-two {
    width: 100%;
    height: calc(30% - vw(10));
    margin-top: vw(10);
    border: 1px solid #042e5e;
    border-radius: 8px;
    overflow: hidden;
    .tab-conten {
      height: calc(100% - vw(20));
      overflow-y: auto;
    }
    .tab-line {
      height: vw(30);
      margin-bottom: vw(5);
      cursor: pointer;
    }
    .select-tab-line {
      height: vw(30);
      background: #28575a !important;
    }
    .tab-header-height {
      height: vw(20);
      line-height: vw(20);
      color: #fff;
      background: #002346;
      text-align: center;
      border-right: 1px solid #fff;
    }
    .tab-height {
      height: vw(30);
      line-height: vw(30);
      color: red;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tab-one {
      float: left;
      width: 5%;
    }
    .tab-two {
      float: left;
      width: 13%;
    }
    .tab-three {
      float: left;
      width: 13%;
    }
    .tab-four {
      float: left;
      width: 20%;
    }
    .tab-five {
      float: left;
      width: 5%;
    }
    .tab-six {
      float: left;
      width: 5%;
    }
    .tab-seven {
      float: left;
      width: 15%;
    }
    .tab-eight {
      float: left;
      width: 15%;
    }
    .tab-nine {
      float: left;
      width: 5%;
    }
    .red-box {
      width: vw(30);
      height: vw(30);
      background: red;
    }
  }
  .box-title {
    height: vw(40);
    color: #356bab;
    font-size: vw(20);
    font-weight: bold;
    line-height: vw(40);
    text-align: center;
  }
  .gradient-line {
    height: 1px; /* 横线高度 */
    background: linear-gradient(90deg, transparent, #356bab, transparent);
    /* 方向(90deg表示从左到右), 颜色从透明到实色再到透明 */
  }
}

.tab-header-line {
  width: 100%;
  height: vw(20);
  background: #002346;
}
.check-btn {
  position: absolute;
  bottom: vw(10);
  left: 50%;
  transform: translateX(-50%, 0);
}
.ant-btn-primary:disabled {
  color: #fff !important;
}
.mr-1 {
  margin-right: vw(10);
}
.expirationate-box{
  position: absolute;
  bottom: vw(10);
  right: vw(20);
  color: red;
  font-size: vw(16);
}
</style>
<style>

</style>

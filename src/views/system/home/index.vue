<template>
  <div class="container" :style="containerStyle">
    <div class="title">
      沧州远景电解液供应系统
      <svg width="100%" height="60" class="item-one-line">
        <line x1="0" y1="0" x2="35%" y2="0" style="stroke: #0e3b6c; stroke-width: 3"></line>

        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color: #0e3b6c; stop-opacity: 1" />
            <stop offset="100%" style="stop-color: #0da1b0; stop-opacity: 1" />
          </linearGradient>
        </defs>

        <line x1="35%" y1="0" x2="39%" y2="30" stroke="url(#lineGradient1)" stroke-width="2"></line>

        <line x1="39%" y1="30" x2="61%" y2="30" style="stroke: #0da1b0; stroke-width: 2"></line>

        <defs>
          <linearGradient id="lineGradient2" x2="0%" y2="0%" x1="100%" y1="100%">
            <stop offset="0%" style="stop-color: #0da1b0; stop-opacity: 1" />
            <stop offset="100%" style="stop-color: #0e3b6c; stop-opacity: 1" />
          </linearGradient>
        </defs>

        <line x1="61%" y1="30" x2="65%" y2="0" stroke="url(#lineGradient2)" stroke-width="2"></line>
        <line x1="65%" y1="0" x2="100%" y2="0" style="stroke: #0e3b6c; stroke-width: 3"></line>
      </svg>
    </div>

    <div class="header-left">
      <div class="tab-item diamond" :class="{ active: pageIndex == 'main' }" @click="pageIndex = 'main'"
      >首页</div>
      <div class="tab-item diamond" :class="{ active: pageIndex == 'history' }" @click="pageIndex = 'history'">历史数据</div>
      <div class="tab-item diamond" :class="{ active: pageIndex == 'alarm' }" @click="pageIndex = 'alarm'">报警查询</div>
      <div class="tab-item diamond" :class="{ active: pageIndex == 'log' }" @click="pageIndex = 'log'">日志查询</div>
    </div>
    <div class="header-right">
      <div class="user-item account">登录</div>
      <div class="user-item account">注销</div>
      <div class="user-item account">退出</div>
      <div class="user-item user-name">Admin</div>
      <div class="user-item data-box">
        <div class="date">{{ date }}</div>
        <div class="time">{{ time }}</div>
      </div>
    </div>

    <scan-box v-if="pageIndex == 'main'" ref="scanBoxRef"></scan-box>
    <div v-else-if="pageIndex == 'history'">历史数据</div>
    <div v-else-if="pageIndex == 'alarm'">报警查询</div>
    <log-box v-else-if="pageIndex == 'log'"></log-box>
  </div>
</template>

<script setup>
import CadContent from '/@/components/cad-content.vue';
import ScanBox from '/@/views/system/home/components/scan-box.vue';
import LogBox from '/@/views/system/home/components/log-box.vue';
import { erpApi } from '/@/api/erp';
let containerStyle = ref({
  height: '100%',
});
let date = ref('');
let time = ref('');
let pageIndex = ref('main');
let indexName = ref('');
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
let scanBoxRef = ref(null);
let socket = null;
let socketTwo = null;
const deviceInfo = ref({});
let scanContent = ref({});

/**
 * @name 获取当前日期，星期以及时间
 */
const getDate = () => {
  window.setTimeout(function () {
    window.requestAnimationFrame(getDate);
  }, 1000 / 2);
  var d = new Date();
  var year = d.getFullYear(); //获取年
  var month = d.getMonth() + 1; //获取月，从 Date 对象返回月份 (0 ~ 11)，故在此处+1
  var day = d.getDay(); //获取日
  var days = d.getDate(); //获取日期
  var hour = d.getHours(); //获取小时
  var minute = d.getMinutes(); //获取分钟
  var second = d.getSeconds(); //获取秒
  var week = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
  date.value = year + ' 年 ' + getDateString(month) + ' 月 ' + getDateString(days) + ' 日 ';
  time.value = getDateString(hour) + ':' + getDateString(minute) + ':' + getDateString(second);
  // var c = week[day] + ' ';
};
/**
 * @name 日期时间补零
 * @param num
 * @returns
 */
const getDateString = (num) => {
  return num < 10 ? '0' + num : num;
};

const scokenDetailInfo = (data) => {
  // 关闭之前的 socketTwo 连接（如果存在）
  if (socketTwo) {
    socketTwo.close();
    socketTwo = null;
  }

  const wsUrlTwo = `ws://116.196.87.183:8085/sa-api/ws/data/${data.deviceNo}`;
  socketTwo = new WebSocket(wsUrlTwo);

  // 监听连接打开
  socketTwo.onopen = () => {
    console.log('WebSocket-two连接已建立');
  };
  setInterval(function() {
    if (socketTwo.readyState === WebSocket.OPEN) {
      socketTwo.send('ping');
    }
}, 30000); // 每 30 秒发送一次心跳

  // 监听消息
  socketTwo.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      // scanContent.value = data;
      scanBoxRef.value&&scanBoxRef.value.getSocketData(data);
      console.log('第二次socket连接的数据:', data);
    } catch (error) {
      console.error('解析数据失败:', error);
    }
  };

  // 监听错误
  socketTwo.onerror = (error) => {
    console.error('WebSocket错误:', error);
  };

  // 监听连接关闭
  socketTwo.onclose = (event) => {
    console.log('WebSocket连接关闭:', event);
  };
};

onMounted(() => {
  containerStyle.value.height = window.innerHeight + 'px';
  getDate();
  const wsUrl = `ws://116.196.87.183:8085/sa-api/ws/device`;
  socket = new WebSocket(wsUrl);

  // 监听连接打开
  socket.onopen = () => {
    console.log('WebSocket连接已建立');
  };
  setInterval(function () {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send('ping');
    }
  }, 30000); // 每 30 秒发送一次心跳
  // 监听消息
  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      scanBoxRef.value&&scanBoxRef.value.getIndexName(data.deviceNo);
      // deviceInfo.value = data;
      // changeIndex(list.value.find((item) => item.idOne === data.deviceNo || item.idTwo === data.deviceNo));
      scokenDetailInfo(data); // 创建第二个 WebSocket 连接
      console.log('第一次socket连接的数据:', data);
    } catch (error) {
      console.error('解析数据失败:', error);
    }
  };

  // 监听错误
  socket.onerror = (error) => {
    console.error('WebSocket错误:', error);
  };

  // 监听连接关闭
  socket.onclose = (event) => {
    console.log('WebSocket连接关闭:', event);
  };
});
onUnmounted(() => {
  if (socket) {
    socket.close();
  }
  if (socketTwo) {
    socketTwo.close();
  }
});
</script>
<style lang="scss" scoped>
@import '../../../style/mixins.scss';
.container {
  width: 100%;
  background: rgba(3, 12, 49);
  overflow: hidden;
  .title {
    position: relative;
    width: 100%;
    padding-top: vw(20);
    font-size: vw(38);
    letter-spacing: 4px;
    text-align: center;
    font-weight: bold;
    color: rgba(0, 187, 197);
  }

  .header-left {
    position: absolute;
    left: 0;
    top: 0;
    .tab-item {
      display: inline-block;
      top: vw(75);
      left: vw(20);
    }
    .active {
      color: #fff;
      background-color: #163477;
    }
  }

  .diamond {
    position: relative;
    width: vw(120);
    height: vw(50);
    margin-right: vw(15);
    font-size: vw(16);
    line-height: vw(50);
    font-weight: bold;
    text-align: center;
    color: #1d71b8;
    background-color: transparent;
    border: 1px solid #163477;
    transform: skewX(20deg);
  }

  .diamond::after {
    content: '';
    position: absolute;
    top: 0;
    left: vw(-30);
    width: vw(30);
    height: 100%;
    transform: skewX(-20deg);
  }
}
.header-right {
  display: flex;
  align-content: flex-start;
  position: absolute;
  top: vw(75);
  right: vw(20);

  .user-item {
    margin-right: vw(10);
  }
  .account {
    width: vw(50);
    height: vw(50);
    text-align: center;
    line-height: vw(45);
    border: 2px solid #2955ac;
    border-radius: 50%;
    color: #fff;
    font-size: vw(16);
    font-weight: bold;
  }
  .user-name {
    height: vw(50);
    padding-right: vw(10);
    line-height: vw(50);
    font-size: vw(16);
    font-weight: bold;
    color: #fff;
    border-right: 2px solid #363d59;
  }
  .data-box {
    margin-left: vw(10);
    text-align: center;
    color: #fff;
    font-size: vw(18);
    .time {
      font-size: vw(32);
    }
  }
}
.mr-1 {
  margin-right: vw(10);
}
</style>
<style>
.ant-form-item .ant-form-item-label > label {
  color: #fff !important;
}
.ant-form-item {
  margin-bottom: 6px !important;
}
</style>

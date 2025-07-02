<template></template>

<script setup lang="tsx">
import { Client } from "@stomp/stompjs";
import { localClear, localRead } from '/@/utils/local-util';
import LocalStorageKeyConst from '/@/constants/local-storage-key-const.js';
import {unifiedTenantCode} from '/@/utils/common-util'
let tenantCode = localRead(LocalStorageKeyConst.TENANT_CODE);

// 定义消息事件emit
const emit = defineEmits(["stomp:event"]);

const protocol = window.location.protocol === "https:" ? "wss://" : "ws://";
let host = window.location.host;
let wsUrl = protocol + host + "/ws"+"ws/device";
console.log(wsUrl, "wsUrl");

let _client;
// STOMP 配置
const STOMP_CONFIG = {
  url: wsUrl, // RabbitMQ 的 STOMP WebSocket 地址
  virtualHost: "safety_vhost", // RabbitMQ 的 Virtual Host
  exchange: `/exchange/device_station_alarm_exchange/device.station.${unifiedTenantCode(tenantCode)}.#`, // RabbitMQ 的 Exchange 名称
  routingKey: "my.routing.key", // Routing Key
  username: "safety", // RabbitMQ 用户名
  password: "safety123456", // RabbitMQ 密码
};

console.log(STOMP_CONFIG);
// debugger;
function setActivate() {
  _client = new Client({
    brokerURL: STOMP_CONFIG.url,
    connectHeaders: {
      login: STOMP_CONFIG.username, // 用户名
      passcode: STOMP_CONFIG.password, // 密码
      host: STOMP_CONFIG.virtualHost, // 指定 Virtual Host
    },
    debug: function (str) {
      // console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 1000,
    heartbeatOutgoing: 1000,
  });
  _client.onConnect = (frame) => {
    // console.log("连接成功");
    _client.subscribe(STOMP_CONFIG.exchange, (message) => {
      console.log(message.body);
      emit("stomp:event", message.body);
    });
  };
  _client.onStompError = (frame) => {
    console.log("🐛连接失败: " + frame);
  };
  _client.activate();
}

// 断开连接
function disconnect() {
  _client.deactivate();
}

setActivate();

onUnmounted(() => {
  disconnect();
});
</script>

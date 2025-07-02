<template>
  <div class="login-container">
    <div class="login-content">
      <div class="qrCode-img" @click="changeLogin">
        <img v-if="showQRCode" src="/@/assets/microsite/login/login-way-1.png" />
        <img v-else src="/@/assets/microsite/login/login-way-2.png" />
      </div>
      <div v-if="!showQRCode">
        <div class="title-container">
          <div class="title">欢迎登录</div>
          <div class="mic-name">微型应急服务站管理平台</div>
        </div>
        <div class="input-container">
          <a-form ref="formRef" :model="loginForm" :rules="rules">
            <a-form-item name="loginName">
              <a-input
                class="input-item"
                v-model:value="loginForm.loginName"
                placeholder="请输入账号"
              >
                <template #prefix>
                  <img src="/@/assets/microsite/login/user-icon.png" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="password">
              <a-input-password
                class="input-item"
                v-model:value="loginForm.password"
                placeholder="请输入密码"
              >
                <template #prefix>
                  <img src="/@/assets/microsite/login/password-icon.png" />
                </template>
              </a-input-password>
            </a-form-item>
            <!-- <a-form-item name="captchaCode">
              <div class="captcha-code-container">
                <a-input
                  class="input-item"
                  v-model:value="loginForm.captchaCode"
                  placeholder="请输入验证码"
                >
                  <template #prefix>
                    <img src="/@/assets/microsite/login/code-icon.png" />
                  </template>
                </a-input>
                <img class="captcha-img" :src="captchaBase64Image" @click="getCaptcha" />
              </div>
            </a-form-item> -->
          </a-form>
        </div>
        <a-checkbox v-model:checked="rememberPwd">记住密码</a-checkbox>
        <div class="login-btn" @click="onLogin">登录</div>
        <div class="other-login">
          <div class="separation-line">
            <div class="line"></div>
            <div class="text">其他登录方式</div>
            <div class="line"></div>
          </div>
          <div class="other">
            <img src="/@/assets/microsite/login/wechat-icon.png" />
          </div>
        </div>
      </div>
      <div class="qr-content" v-else>
        <div class="qr-title">
          <div v-if="!codeLose">扫码登录</div>
          <div v-else class="code-lose">二维码已失效，点击刷新</div>
        </div>
        <div class="qr-code">
          <div v-if="codeLose" class="lose-efficacy">
            <img src="/@/assets/microsite/login/update.png" />
          </div>
          <div class="code"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import { onBeforeMount, onMounted, onUnmounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { loginApi } from "/@/api/system/login-api";
import { SmartLoading } from "/@/components/framework/smart-loading";
import { LOGIN_DEVICE_ENUM } from "/@/constants/system/login-device-const";
import { useUserStore } from "/@/store/modules/system/user";
import { buildRoutes } from "/@/router/index";
import { smartSentry } from "/@/lib/smart-sentry";
import { decryptData, encryptData } from "/@/lib/encrypt";
import { localRead, localRemove, localSave } from "/@/utils/local-util.js";
import LocalStorageKeyConst from "/@/constants/local-storage-key-const.js";
import { LOCAL_KEY } from "/@/constants/microsite/localKey.js";
//--------------------- 登录表单 ---------------------------------

const loginForm = ref({
  loginName: "",
  password: "",
  captchaCode: "",
  captchaUuid: "",
  loginDevice: LOGIN_DEVICE_ENUM.PC.value,
});
const rules = {
  loginName: [{ required: true, message: "用户名不能为空" }],
  password: [{ required: true, message: "密码不能为空" }],
  captchaCode: [{ required: true, message: "验证码不能为空" }],
};

const router = useRouter();
const formRef = ref();
const rememberPwd = ref(false);
const showQRCode = ref(false);
const codeLose = ref(true);

onMounted(getCaptcha);
onBeforeMount(() => {
  setUserAccountPwd();
});
onMounted(() => {
  document.onkeyup = (e) => {
    if (e.keyCode == 13) {
      onLogin();
    }
  };
});

onUnmounted(() => {
  document.onkeyup = null;
});

function changeLogin() {
  showQRCode.value = !showQRCode.value;
}

function setUserAccountPwd() {
  const info = localRead(LOCAL_KEY.userAccountPwd);
  if (!info) return;
  const formatInfo = JSON.parse(info);
  rememberPwd.value = true;
  loginForm.value.loginName = formatInfo.loginName;
  loginForm.value.password = decryptData(formatInfo.password);
}

function rememberInfo() {
  if (!rememberPwd.value) {
    localRemove(LOCAL_KEY.userAccountPwd);
    return;
  }
  localSave(
    LOCAL_KEY.userAccountPwd,
    JSON.stringify({
      loginName: loginForm.value.loginName,
      password: encryptData(loginForm.value.password),
    })
  );
}

//登录
async function onLogin() {
  formRef.value.validate().then(async () => {
    try {
      SmartLoading.show();
      // 密码加密
      let encryptPasswordForm = Object.assign({}, loginForm.value, {
        password: encryptData(loginForm.value.password),
      });
      const res = await loginApi.login(encryptPasswordForm);
      stopRefrestCaptchaInterval();
      localSave(LocalStorageKeyConst.USER_TOKEN, res.data.token ? res.data.token : "");
      // 保存tanentId
      localSave(LocalStorageKeyConst.TENANT_CODE, res.data.tenantCode);
      message.success("登录成功");
      // 更新用户信息到pinia
      useUserStore().setUserLoginInfo(res.data);
      // 构建系统的路由
      buildRoutes();
      router.push("/home");
      rememberInfo();
    } catch (e) {
      if (e.data && e.data.code !== 0) {
        loginForm.value.captchaCode = "";
        getCaptcha();
      }
      smartSentry.captureError(e);
    } finally {
      SmartLoading.hide();
    }
  });
}

//--------------------- 验证码 ---------------------------------

const captchaBase64Image = ref("");
async function getCaptcha() {
  try {
    let captchaResult = await loginApi.getCaptcha();
    captchaBase64Image.value = captchaResult.data.captchaBase64Image;
    loginForm.value.captchaUuid = captchaResult.data.captchaUuid;
    beginRefrestCaptchaInterval(captchaResult.data.expireSeconds);
  } catch (e) {
    console.log(e);
  }
}

let refrestCaptchaInterval = null;
function beginRefrestCaptchaInterval(expireSeconds) {
  if (refrestCaptchaInterval === null) {
    refrestCaptchaInterval = setInterval(getCaptcha, (expireSeconds - 5) * 1000);
  }
}

function stopRefrestCaptchaInterval() {
  if (refrestCaptchaInterval != null) {
    clearInterval(refrestCaptchaInterval);
    refrestCaptchaInterval = null;
  }
}
const checked = ref(false);
</script>

<style scoped lang="less">
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("/@/assets/microsite/login/login-bg.png");
  background-size: cover;
}
.login-content {
  position: absolute;
  top: calc((100vh - 480px) * 0.4);
  right: calc((100vw - 363px) * 0.2);
  background: rgba(255, 255, 255, 0.65);
  border-radius: 8px;
  padding: 28px 35px 0 33px;
  width: 363px;
  height: 396px;
  .qrCode-img {
    width: 46px;
    height: 46px;
    position: absolute;
    top: 15px;
    right: 16px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title-container {
    display: flex;
    align-items: end;
    .title {
      font-weight: bold;
      font-size: 24px;
      color: #000000;
      line-height: 28px;
    }
    .mic-name {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.45);
      line-height: 19px;
      margin-left: 11px;
    }
  }
  .input-container {
    margin-top: 22px;
    .input-item {
      margin-bottom: 22px;
      height: 40px;
    }
    .captcha-code-container {
      display: flex;
      .captcha-img {
        height: 40px;
        margin-left: 10px;
      }
    }
  }
  .login-btn {
    margin-top: 24px;
    width: 100%;
    height: 35px;
    background: #1677ff;
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);
    border-radius: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #ffffff;
    line-height: 24px;
    cursor: pointer;
  }
  .separation-line {
    width: 100%;
    margin-top: 20px;
    height: 25px;
    display: flex;
    align-items: center;
    .line {
      top: 50%;
      width: calc((100% - 104px) / 2);
      border: 1px solid #d9d9d9;
    }
    .text {
      width: 104px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.25);
      text-align: center;
    }
  }
  .other {
    width: 100%;
    margin-top: 6px;
    display: flex;
    justify-content: center;
  }
}
.qr-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .qr-title {
    margin-top: 37px;
    margin-bottom: 16px;
    font-weight: bold;
    font-size: 24px;
    color: #000000;
    line-height: 28px;
    .code-lose {
      font-weight: 500;
      font-size: 14px;
      color: #000000;
      line-height: 16px;
    }
  }
  .qr-code {
    width: 229px;
    height: 229px;
    border: 1px solid #000;
    position: relative;
    .lose-efficacy {
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.65);
      position: absolute;
      top: 0;
      left: 0;
      img {
        position: absolute;
        height: 52px;
        width: 52px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
      }
    }
  }
}
</style>
<style>
.login-container .ant-form-item .ant-form-item-control-input-content {
  height: 40px !important;
}
</style>

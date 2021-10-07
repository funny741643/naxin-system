<template>
  <div class="login-panel">
    <h1>Acat纳新系统</h1>
    <el-tabs type="border-card" stretch>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-s-check"></i> 登录</span>
        </template>
        <login-account ref="accountRef"></login-account>
        <div class="account-control">
          <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        </div>
        <el-button type="primary" class="login-btn" @click="loginClick"
          >立即登录</el-button
        >
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-s-grid"></i> 注册</span>
        </template>
        <register ref="registerRef"></register>
        <el-button type="primary" class="login-btn" @click="registerClick"
          >立即注册</el-button
        >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import LoginAccount from "./login-account.vue";
import register from "./register.vue";
import { reactive, ref } from "vue";
export default {
  components: { register, LoginAccount },
  setup() {
    const isKeepPassword = ref(false);
    const accountRef = ref();
    const registerRef = ref();
    const wordbtn = reactive(["立即登录", "立即注册"]);
    const loginClick = () => {
      console.log("登录");
      accountRef.value.loginAction(isKeepPassword.value);
    };
    const registerClick = () =>{
        console.log('注册');
        registerRef.value.registerAciton();
    }
    return {
      isKeepPassword,
      accountRef,
      wordbtn,
      registerRef,
      loginClick,
      registerClick
    };
  },
};
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-top: -50px;
  > h1 {
    text-align: center;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
    font-size: 16px;
  }
}
</style>

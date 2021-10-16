<template>
  <div class="register">
    <el-form label-width="80px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="姓名" prop="admin_name">
        <el-input v-model="account.admin_name"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="admin_num">
        <el-input v-model="account.admin_num"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="admin_password" type="password">
        <el-input v-model="account.admin_password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="SurePassword" type="password">
        <el-input v-model="account.SurePassword"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  setup() {
    const store = useStore();
    let account = reactive({
      admin_name: "",
      admin_num: "",
      admin_password: "",
      SurePassword: "",
    });
    const formRef = ref();
    const surepw = (rule, value, callback) => {
      if (account.admin_password !== account.SurePassword) {
        callback(new Error("两次输入密码不一致，请重新输入！"));
      }else {
        callback()
      }
    };
    let rules = {
      admin_name: [
        {
          required: true,
          message: "用户名不为空",
          trigger: "blur",
        },
      ],
      admin_num: [
        {
          required: true,
          message: "账号不为空",
          trigger: "blur",
        },
        {
          pattern: /^\d{8}$/,
          message: "账号为八位学号",
          trigger: "blur",
        },
      ],
      admin_password: [
        {
          required: true,
          message: "密码不为空",
          trigger: "blur",
        },
        {
          pattern: /^[a-z0-9]{3,}$/,
          message: "密码为3位以上",
          trigger: "blur",
        },
      ],
      SurePassword: [
        {
          required: true,
          message: "密码不为空",
          trigger: "blur",
        },
        {
          validator: surepw,
          trigger: "blur",
        },
      ],
    };

    const resetAccount = ()=>{
      account.admin_name = '';
      account.admin_num= "";
      account.admin_password= "";
      account.SurePassword=""
    };

    const registerAciton = () => {
      formRef.value.validate((valid) => {
        if (valid) {
          console.log('register',valid)
          store.dispatch("registerFun", { ...account });
          resetAccount()
        }
      });
    };

    return {
      account,
      rules,
      formRef,
      surepw,
      registerAciton,
    };
  },
};
</script>

<style lang="less" scoped>
.surepw {
  display: flex;
}
</style>

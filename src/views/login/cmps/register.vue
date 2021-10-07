<template>
  <div class="register">
    <el-form label-width="80px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="SurePassword">
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
    const account = reactive({
      name: "",
      password: "",
      SurePassword: "",
    });
    const formRef = ref();
    const surepw = (rule, value, callback) => {
      if (account.password !== account.SurePassword) {
        callback(new Error("两次输入密码不一致，请重新输入！"));
      }
    };

    const registerAciton = () => {
      console.log('registerAciton')

      //进不到？？？
      formRef.value.validate((valid) => {
        console.log(222)
        if (valid) {
          store.dispatch("registerFun", { ...account });
        }
      });
    };

    const rules = {
      name: [
        {
          required: true,
          message: "用户名不为空",
          trigger: "blur",
        },
        {
          pattern: /^\d{8}$/,
          message: "账号为八位学号",
          trigger: "blur",
        },
      ],
      password: [
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

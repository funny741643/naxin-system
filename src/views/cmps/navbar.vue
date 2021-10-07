<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="后台组" name="first"
        >用户管理
        <table></table>
      </el-tab-pane>
      <table></table>
      <el-tab-pane label="go组" name="second"
        >go组
        <table></table>
      </el-tab-pane>
      <el-tab-pane label="前端组" name="third"
        >前端组
        <table></table>
      </el-tab-pane>
      <el-tab-pane label="服务端组" name="fourth"
        >服务端组
        <table></table>
      </el-tab-pane>
      <el-tab-pane label="机器学习组" name="fifth"
        >机器学习组
        <table></table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import table from "./usertable.vue";
export default {
  components: { table },
  setup() {},
};
</script>

<style lang="less" scoped></style>

<template>
  <div>
    <el-card class="box-card">
      <el-input type="textarea" :rows="7" placeholder="请输入你的评价" v-model="appraise" style="font-size: 17px;">
      </el-input>
      <div class="score">
        <div>
          打分：<el-input v-model="score"></el-input>
        </div>
        <el-button @click="admitAppraise">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import {reactive} from '@vue/reactivity'
import {useStore} from 'vuex'
export default {
  setup() {
    const store = useStore();
    const evaluator = store.state.admin_name;
    // console.log(evaluator)
    const apprasieMsg = reactive({
      appraise:'',
      score:'',
    })
    const admitAppraise = ()=>{
      store.dispatch('')
    }
    return {
      apprasieMsg,
      evaluator,
      admitAppraise
    }
  },
};
</script>

<style lang="less" scoped>
.el-card {
  width: 60%;
  margin: 0 auto;
  .el-input {
    width: 100px;
  }
  .score{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
  }
}
</style>

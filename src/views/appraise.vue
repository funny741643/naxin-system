<template>
  <div>
    <el-card class="box-card">
      <el-input type="textarea" :rows="7" placeholder="请输入你的评价" maxlength="300"  v-model="apprasieMsg.appraise" style="font-size: 17px;">
      </el-input>
      <div class="score">
        <div>
          打分：<el-input v-model="apprasieMsg.score" type="number"></el-input>
        </div>
        <el-button @click="admitAppraise">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import {reactive} from '@vue/reactivity'
import localStorage from '../utils/cache'
import {useStore} from 'vuex'
// import {MessageBox} from 'element-plus'
export default {
  setup() {
    const store = useStore();
    const evaluator = localStorage.getCache('admin_num') ? localStorage.getCache('admin_num'):'';
    // console.log(evaluator)
    let apprasieMsg = reactive({
      appraise:'',
      score:'',
      studentName: localStorage.getCache("evalateStudent_num")?localStorage.getCache("evalateStudent_num"):''
    })
    console.log(apprasieMsg)
    const admitAppraise = ()=>{
      store.dispatch("appraiseAction",{...apprasieMsg})
      // 提交完信息置空
      apprasieMsg.appraise = '',
      apprasieMsg.score = ''
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

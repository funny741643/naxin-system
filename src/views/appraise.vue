<template>
  <div>
    <el-card class="box-card">
      <el-input type="textarea" :rows="7" placeholder="请输入你的评价" maxlength="300"  v-model="appraise" style="font-size: 17px;">
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
      // confirm('提交评价, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     center: true,
      //   }).then(() => {
      //       message({
      //         type: 'success',
      //         message: '提交成功！',
      //       })
      //     }).catch(() => {
      //       message({
      //         type: 'info',
      //         message: '取消提交！',
      //       })
      //     })
      store.dispatch("appraiseAction",{...apprasieMsg})
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

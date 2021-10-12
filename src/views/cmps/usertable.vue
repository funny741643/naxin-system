<template>
  <div class="table">
    <el-card class="box-card">
      <el-table :data="userlist" :border="true" style="font-size: 14px">
        <el-table-column label="学号" prop="student_num"></el-table-column>
        <el-table-column label="姓名" prop="student_name"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="面试状态" prop="interview_state">
          <template #default="scope">
            <el-button v-if="scope.row.interview_state == 0" type="primary">等待面试           
            </el-button>
             <el-button v-else-if="scope.row.interview_state == 1" type="success">面试中            
            </el-button>
            <el-button v-else type="warning">面试结束           
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="选择方向"  prop="choice">
          <template #default="scope" >
            <span>{{getusergroup(scope.row.choice)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="评价" width="180">
          <template #default="scope">
              <el-button @click="evaluate(scope.row.student_num)">去面ta</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <!-- current-page 每页显示的个数 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 5, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { computed, ref, reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import router from "../../router";
import localStorage from '../../utils/cache'
export default {
  setup() {
    const store = useStore();
    let queryInfo = reactive({
      pagenum: 1, //当前页数
      pagesize: 2, //可以显示的条数
    });
    const total = store.state.usertotal;
    const usergroup = ref()
    let userlist = store.state.userlist ? store.state.userlist : reactive([])
    // const userlist = [
    //   {
    //     student_num: "04192106",
    //     student_name: "llr",
    //     email: "2119999999@qq.com",
    //     mobile: "1111111",
    //     interview_state: 0,
    //     choice: 1,
    //   },
    //   {
    //     student_num: "04192106",
    //     student_name: "llr",
    //     email: "2119999999@qq.com",
    //     mobile: "1111111",
    //     interview_state: 1,
    //     choice: 2,
    //   },
    //   {
    //     student_num: "04192106",
    //     student_name: "llr",
    //     email: "2119999999@qq.com",
    //     mobile: "1111111",
    //     interview_state: 2,
    //     choice: 4,
    //   },
    // ];
    //发送请求,获取页面数据
    const getuserInfo = () => {
      console.log(111);
      store.dispatch("UserInfoAcction", { ...queryInfo });
      // 更新用户列表
      userlist = store.state.userInfo
    };
    //根据choice判断那个组
    const group = ['未选择、未赋权','超级管理员','前端','Go','Java','服务端','机器学习']
    const getusergroup = (choice) =>{
      return group[choice]
    }
    //监听pagesize改变
    const handleSizeChange = (newsize) => {
      queryInfo.pagesize = newsize;
      getuserInfo();
    };
    //当前页数的改变
    const handleCurrentChange = (newnum) => {
      queryInfo.pagenum = newnum;
      getuserInfo();
    };
    // 跳转评价页
    const evaluate = (student_num) => {
      // 跳转的时候保存student_num
      localStorage.setCache('evalateStudent_num',student_num)
      router.push("../appraise");
    };
    return {
      userlist,
      queryInfo,
      total,
      usergroup,
      evaluate,
      getuserInfo,
      getusergroup,
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>

<style lang="less" scoped>
.box-card {
  font-size: 16px;
}
.el-pagination {
  margin-top: 10px;
}
.el-button{
  width: 80px;
}
</style>

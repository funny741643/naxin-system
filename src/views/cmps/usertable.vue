<template>
  <div class="table">
    <el-card class="box-card">
      <el-table :data="userInfo.list" :border="true" style="font-size: 14px">
        <el-table-column label="学号" prop="student_num"></el-table-column>
        <el-table-column label="姓名" prop="student_name"></el-table-column>
        <el-table-column label="邮箱" prop="student_email"></el-table-column>
        <el-table-column label="电话" prop="student_telephone"></el-table-column>
        <el-table-column label="面试状态" prop="interview_state">
          <template #default="scope">
            <el-button v-if="scope.row.interview_state == 0" type="primary"
              >等待面试           
            </el-button>
             <el-button
              v-else-if="scope.row.interview_state == 1"
              type="success"
              >面试中            
            </el-button>
            <el-button v-else type="warning">面试结束 </el-button>
          </template>
        </el-table-column>
        <el-table-column label="选择方向" prop="choice">
          <template #default="scope">
            <span>{{ getusergroup(scope.row.choice) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评价" width="180">
          <template #default="scope">
            <el-button @click="evaluate(scope.row.student_num)"
              >去面ta</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <!-- current-page 每页显示的个数 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userInfo.total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { computed, ref, reactive } from "@vue/reactivity";
import router from "../../router";
import localStorage from "../../utils/cache";
import axios from "../../service/request";
import { ElMessage } from "element-plus";
export default {
  setup() {
    let userInfo = reactive({
      list: [],
      total: "",
    });
    let queryInfo = reactive({
      pagenum: 1, //当前页数
      pagesize: 2, //可以显示的条数
    });
    const usergroup = ref();
    const group = [
      "未选择、未赋权",
      "超级管理员",
      "前端",
      "Go",
      "Java",
      "服务端",
      "机器学习",
    ];
    //发送请求,获取页面数据
    const getuserInfo = () => { 
      axios
        .get(
          `api/admin/uninterview?pagesize=${queryInfo.pagesize}&pagenum=${queryInfo.pagenum}`
        )
        .then((getUserRes) => {
          console.log(getUserRes);
          if (getUserRes) {
            if (getUserRes.status === 200) {
              userInfo.list = getUserRes.list;
              userInfo.total = getUserRes.total;
            }
          } else {
            ElMessage.warning({
              message: "请先点击右上角头像授权，获取用户信息！",
              type: "warning",
            });
          }
        });
    };
    getuserInfo();
    //根据choice判断那个组
    const getusergroup = (choice) => {
      return group[choice];
    };
    //监听pagesize改变
    const handleSizeChange = (newsize) => {
      console.log(newsize)
      queryInfo.pagesize = newsize;
      getuserInfo();
    };
    //当前页数的改变
    const handleCurrentChange = (newnum) => {
      console.log(newnum)
      queryInfo.pagenum = newnum;
      getuserInfo();
    };
    // 跳转评价页
    const evaluate = (student_num) => {
      // 跳转的时候保存student_num
      localStorage.setCache("evalateStudent_num", student_num);
      axios.get(`api/admin/gointerview/${student_num}`).then(res=>{
        console.log(res)
      })
      router.push("../appraise");
    };
    return {
      userInfo,
      queryInfo,
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
.el-button {
  width: 80px;
}
</style>

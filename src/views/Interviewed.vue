<template>
  <div>
    <el-card class="box-card">
      <el-table :data="userInfoed.list" :border="true" style="font-size: 14px">
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
            <el-button v-else type="warning" width="100px"
              >面试结束           
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="选择方向" prop="choice">
          <template #default="scope">
            <span>{{ getusergroup(scope.row.choice) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="查看信息">
          <template #default="scope">
            <el-link type="primary" @click="findUserMg(scope.row)"
              >查看</el-link
            >
          </template>
        </el-table-column>
        <el-table-column label="是否通过" width="200px">
          <template #default="scope">
            <el-button type="success" @click="textsuccess(scope.row)"
              >通过</el-button
            >
            <el-button type="danger" @click="textfail(scope.row)"
              >未通过</el-button
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
          :page-sizes="[1, 5, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <el-dialog title="评价详情" v-model="userMgVisable" width="30%" class="userMg">
      <div class="normal">评价：{{ finduserInfo.appraise }}</div>
      <div class="normal">成绩：{{ finduserInfo.score }}</div>
      <div class="normal">评价人：{{ finduserInfo.evaluator }}</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="userMgVisable = false">取 消</el-button>
          <el-button type="primary" @click="userMgVisable = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { computed, ref, reactive } from "@vue/reactivity";
import axios from "./../service/request";
import { ElMessage } from "element-plus";
export default {
  setup() {
    // 查看dialog是否显示

    let queryInfo = reactive({
      pagenum: 1,
      pagesize: 2,
    });
    let userMgVisable = ref(false);
    console.log(userMgVisable.value);
    const userInfoed = reactive({
      list: [],
      total: "",
    });
    // 获取面试完成用户信息
    const getuserlisted = () => {
     
      axios
        .get(
          `api/admin/interviewed?pagesize=${queryInfo.pagesize}&pagenum=${queryInfo.pagenum}`
        )
        .then((userInfoedRes) => {
          if (userInfoedRes.status === 200) {
            userInfoed.list = userInfoedRes.list;
            userInfoed.total = userInfoedRes.total;
          } else {
            console.log("获取信息失败");
          }
        });
    };
    getuserlisted();

    //根据choice判断那个组
    const group = [
      "未选择、未赋权",
      "超级管理员",
      "前端",
      "Go",
      "Java",
      "服务端",
      "机器学习",
    ];
    const getusergroup = (choice) => {
      return group[choice];
    };
    // 查看功能中显示的信息
    let finduserInfo = reactive({
      appraise:'',
      score:'',
      evaluator:''
    });
    // 查找学生信息
    const findUserMg = (findUserMg) => {
      userMgVisable.value = true;
      // 给后台传入考生学号
      axios
        .get(
          `api/admin/getappraise/${findUserMg.student_num}`
        )
        .then((res) => {
          finduserInfo.appraise = res.view.appraise;
          finduserInfo.evaluator = res.view.evaluator;
          finduserInfo.score = res.view.score
          console.log(finduserInfo);
        });
    };
    const textsuccess = (userMg) => {
      axios
        .get(
          `api/admin/successemail/${userMg.student_num}`
        )
        .then((res) => {
          if (res.status === 200) {
            ElMessage.warning({
              message: "通过邮件发送成功",
              type: "success",
            });
            location.reload();
          }
        });
    };
    const textfail = (userMg) => {
      axios
        .get(`api/admin/failemail/${userMg.student_num}`)
        .then((res) => {
          if (res.status === 200) {
            ElMessage.warning({
              message: "未通过邮件发送成功",
              type: "warning",
            });
            location.reload();
          }
        });
    };
    //监听pagesize改变
    const handleSizeChange = (newsize) => {
      queryInfo.pagesize = newsize;
    };
    const handleCurrentChange = (newpagenum) => {
      queryInfo.pagenum = newpagenum;
    };
    return {
      userInfoed,
      queryInfo,
      userMgVisable,
      finduserInfo,
      findUserMg,
      getusergroup,
      textsuccess,
      textfail,
      handleSizeChange,
      handleCurrentChange,
      getuserlisted,
    };
  },
};
</script>

<style lang="less" scoped>
.normal{
  font-size: 15px;
  line-height: 1.5em;
}

</style>

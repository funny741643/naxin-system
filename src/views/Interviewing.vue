<template>
  <div>
    <el-card class="box-card">
      <el-table :data="userInfoing.list" :border="true" style="font-size: 14px">
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
            <el-button v-else type="warning">面试结束            </el-button>
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
          :page-sizes="[1, 5, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userInfoing.total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import { computed, ref, reactive } from "@vue/reactivity";
import axios from "./../service/request";
import router from "../router/index";
export default {
  setup() {
    let queryInfo = reactive({
      pagenum: 1,
      pagesize: 2,
    });
    const userInfoing = reactive({
      list: [],
      total: "",
    });
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

    // 获取正在面试考生的信息列表
    // const getuserInfoing = async () => {
    const getuserInfoing = () => {
      // const userInfoingRes = await get(
      //   `http://192.168.1.121:3000/admin/interviewing?pagesize=${queryInfo.pagesize}&pagenum=${queryInfo.pagenum}`,
      //   queryInfo
      // );
      axios
        .get(
          `api/admin/interviewing?pagesize=${queryInfo.pagesize}&pagenum=${queryInfo.pagenum}`
        )
        .then((userInfoingRes) => {
          if (userInfoingRes.status === 200) {
            userInfoing.list = userInfoingRes.list;
            userInfoing.total = userInfoingRes.total;
          }
        });
    };
    // 跳转评价页
    const evaluate = (student_num) => {
      axios.get(`api/admin/gointerview/${student_num}`).then(res=>{
        console.log(res)
      })
      router.push("../appraise");
    };
    getuserInfoing();
    //监听pagesize改变
    const handleSizeChange = (newsize) => {
      queryInfo.pagesize = newsize;
      getuserInfoing();
    };
    const handleCurrentChange = (newpagenum) => {
      queryInfo.pagenum = newpagenum;
      getuserInfoing();
    };
    return {
      userInfoing,
      queryInfo,
      group,
      getusergroup,
      evaluate,
      getuserInfoing,
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>

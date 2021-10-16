<template>
    <div>
        <el-card class="box-card">
      <el-table :data="userInfoing.list" :border="true" style="font-size: 14px">
        <el-table-column label="学号" prop="student_num"></el-table-column>
        <el-table-column label="姓名" prop="student_name"></el-table-column>
        <el-table-column label="邮箱" prop="student_email"></el-table-column>
        <el-table-column label="电话" prop="student_telephone"></el-table-column>
        <el-table-column label="选择方向" prop="choice">
          <template #default="scope">
            <span>{{ getusergroup(scope.row.choice) }}</span>
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
    const getuserInfoing = () => {
      axios
        .get(
          `api/admin/passinterview?pagesize=${queryInfo.pagesize}&pagenum=${queryInfo.pagenum}`
        )
        .then((userInfoingRes) => {
          if (userInfoingRes.status === 200) {
            userInfoing.list = userInfoingRes.list;
            userInfoing.total = userInfoingRes.total;
          }
        });
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
      getuserInfoing,
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>

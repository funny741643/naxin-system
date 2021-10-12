<template>
  <div>
    <el-card class="box-card">
      <el-table :data="userInfoed" :border="true" style="font-size: 14px">
        <el-table-column label="学号" prop="student_num"></el-table-column>
        <el-table-column label="姓名" prop="student_name"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
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
            <el-link type="primary" @click="findUserMg(scope.row)">查看</el-link>
          </template>
        </el-table-column>
        <el-table-column label="是否通过" width="200px">
          <el-button type="success">通过</el-button>
          <el-button type="danger">未通过</el-button>
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
    <el-dialog
      title="评价详情"
      v-model="userMgVisable"
      width="30%"
    >
      <div>{{finduserInfo.appraise}}</div>
      <div>{{finduserInfo.score}}</div>
      <div>{{finduserInfo.evaluator}}</div>
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
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    // const userInfoed = [
    //   {
    //     student_num: "04192106",
    //     student_name: "llr",
    //     email: "2119999999@qq.com",
    //     mobile: "1111111",
    //     interview_state: 1,
    //     choice: 1,
    //   },
    //   {
    //     student_num: "04192106",
    //     student_name: "llr",
    //     email: "2119999999@qq.com",
    //     mobile: "1111111",
    //     interview_state: 2,
    //     choice: 2,
    //   },
    //   {
    //     student_num: "04192106",
    //     student_name: "llr",
    //     email: "2119999999@qq.com",
    //     mobile: "1111111",
    //     interview_state: 2,
    //     choice: 3,
    //   },
    //   {
    //     student_num: "04192106",
    //     student_name: "llr",
    //     email: "2119999999@qq.com",
    //     mobile: "1111111",
    //     interview_state: 1,
    //     choice: 4,
    //   },
    //   {
    //     student_num: "04192106",
    //     student_name: "llr",
    //     email: "2119999999@qq.com",
    //     mobile: "1111111",
    //     interview_state: 0,
    //     choice: 5,
    //   },
    //   {
    //     student_num: "04192106",
    //     student_name: "llr",
    //     email: "2119999999@qq.com",
    //     mobile: "1111111",
    //     interview_state: 1,
    //     choice: 1,
    //   },
    // ];
    // 查看dialog是否显示
    let userMgVisable = ref(false);
    console.log(userMgVisable.value)

    let queryInfo = reactive({
      pagenum: 1,
      pagesize: 2,
    });
    let total = store.state.usertotaled ? store.state.usertotaled : ref(10);
    // 获取面试完考生信息
    let userInfoed = store.state.userInfoed ? store.state.userInfoed : reactive([])
    // console.log(userInfoed);
    const getuserlisted = () => {
      store.dispatch("UserInfoedAcction", { ...queryInfo });
      userInfoed = store.state.userInfoed;
    };
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
      return group[choice + 1];
    };
    // 查看功能
    const finduserInfo = reactive({
      appraise:store.state.appraise?store.state.appraise:'',
      evaluator:store.state.evaluator?store.state.evaluator:'',
      score:store.state.score?store.state.score:''
    })
    const findUserMg = (findUserMg) => {
      userMgVisable.value = true
      console.log(userMgVisable.value)
      // 给后台传入考生学号
      store.dispatch("findUserMg",findUserMg.student_num)
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
      total,
      userMgVisable,
      finduserInfo,
      findUserMg,
      getusergroup,
      handleSizeChange,
      handleCurrentChange,
      getuserlisted,
    };
  },
};
</script>

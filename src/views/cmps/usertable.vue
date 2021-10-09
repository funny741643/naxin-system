<template>
  <div class="table">
    <el-card class="box-card">
      <el-table :data="userlist" :border="true" style="font-size: 14px">
        <el-table-column label="学号" prop="student_num"></el-table-column>
        <el-table-column label="姓名" prop="student_name"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="面试状态">
          <template slot-scope="">
            <!-- <el-button v-if="scope.interview_state == -1">未面试</el-button> -->
            <!-- <span>{{scope.row}}</span> -->
          </template>
        </el-table-column>
        <el-table-column label="选择方向" prop="choice"></el-table-column>
        <el-table-column label="评价" width="180">
          <el-button @click="appraise">去评价</el-button>
          <el-button>发邮件</el-button>
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
import router from '../../router'

export default {
  setup() {
    const store = useStore();
    const queryInfo = reactive({
      pagenum: 1, //当前页数
      pagesize: 2, //可以显示的条数
    });
    const total = ref(100);

    const userlist = [
      {
        student_num: "04192106",
        student_name: "llr",
        email: "2119999999@qq.com",
        mobile: "1111111",
        interview_state: -1,
        choice: "前端组",
      },
      {
        student_num: "04192106",
        student_name: "llr",
        email: "2119999999@qq.com",
        mobile: "1111111",
        interview_state: -1,
        choice: "前端组",
      },
      {
        student_num: "04192106",
        student_name: "llr",
        email: "2119999999@qq.com",
        mobile: "1111111",
        interview_state: 0,
        choice: "前端组",
      }
    ];
    //发送请求,获取页面数据
    const getuserInfo = () => {
      console.log(111);
      store.dispatch("UserInfoAcction", { ...queryInfo });
      // const userlist = store.state.userInfo
    };
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

    const appraise = ()=>{
      router.replace('/appraise')
    }
    return {
      userlist,
      queryInfo,
      total,
      appraise,
      getuserInfo,
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
</style>

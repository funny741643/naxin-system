<template>
  <div>
    <el-card class="box-card">
      <el-table :data="userlist" :border="true" style="font-size: 14px">
        <el-table-column label="学号" prop="student_num"></el-table-column>
        <el-table-column label="姓名" prop="student_name"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="面试状态" prop="interview_state">
          <el-button>一面完</el-button>
        </el-table-column>
        <el-table-column label="选择方向" prop="choice"></el-table-column>
        <el-table-column label="查看信息" >
              <el-link type="primary">查看</el-link>
        </el-table-column>
        <el-table-column label="是否通过" width="200px">
            <el-button>通过</el-button>
            <el-button>未通过</el-button>
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
import {useStore} from 'vuex'
export default {
  setup() {
      const store = useStore()
    const userlisted = [
      {
        student_num: "04192106",
        student_name: "llr",
        email: "2119999999@qq.com",
        mobile: "1111111",
        interview_state: "",
        choice: "前端组",
      },{
        student_num: "04192106",
        student_name: "llr",
        email: "2119999999@qq.com",
        mobile: "1111111",
        interview_state: "",
        choice: "前端组",
      },{
        student_num: "04192106",
        student_name: "llr",
        email: "2119999999@qq.com",
        mobile: "1111111",
        interview_state: "",
        choice: "前端组",
      },{
        student_num: "04192106",
        student_name: "llr",
        email: "2119999999@qq.com",
        mobile: "1111111",
        interview_state: "",
        choice: "前端组",
      },{
        student_num: "04192106",
        student_name: "llr",
        email: "2119999999@qq.com",
        mobile: "1111111",
        interview_state: "",
        choice: "前端组",
      },{
        student_num: "04192106",
        student_name: "llr",
        email: "2119999999@qq.com",
        mobile: "1111111",
        interview_state: "",
        choice: "前端组",
      },
    ];

    const queryInfo = reactive({
      pagenum: 1,
      pagesize: 2,
    });
    const total = ref(0);

    // 获取面试完考生信息
    const getuserlisted = ()=>{
        store.dispatch("UserInfoedAcction",{...queryInfo})
        userlisted = store.state.userlisted
    }

    //监听pagesize改变
    const handleSizeChange = (newsize) => {
      queryInfo.pagesize = newsize;
      getuserlisted()
    };
    const handleCurrentChange = (newpagenum) => {
      queryInfo.pagenum = newpagenum;
      getuserlisted()
    };
    return {
      userlisted,
      queryInfo,
      total,
      handleSizeChange,
      handleCurrentChange,
      getuserlisted
    };
  },
};
</script>
<template>
  <div>
    <el-card class="box-card">
      <el-table :data="userInfoing" :border="true" style="font-size: 14px">
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
    let queryInfo = reactive({
      pagenum: 1,
      pagesize: 2,
    });
    let total = store.state.usertotaling ? store.state.usertotaling : ref(10);
    // 获取正在面试考生的信息列表
    let userInfoing = store.state.userInfoing ? store.state.userInfoing : reactive([]);
    const getuserInfoing = (queryInfo)=>{
      store.dispatch("UserInfoingAcction",{...queryInfo})
      userInfoing = store.state.userInfoing ? store.state.userInfoing : reactive([])
    }

    //监听pagesize改变
    const handleSizeChange = (newsize) => {
      queryInfo.pagesize = newsize;
      getuserInfoing()
    };
    const handleCurrentChange = (newpagenum) => {
      queryInfo.pagenum = newpagenum;
      getuserInfoing()
    };
    return {
      userInfoing,
      queryInfo,
      total,
      getuserInfoing,
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>

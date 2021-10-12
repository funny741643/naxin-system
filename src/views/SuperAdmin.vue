<template>
  <div>
    <el-card class="box-card">
      <!-- <el-input> </el-input> <el-button>搜索</el-button> -->
      <el-table :data="adminlist" :border="true" style="font-size: 14px">
        <el-table-column label="学号" prop="admin_num"></el-table-column>
        <el-table-column label="姓名" prop="admin_name"></el-table-column>
        <el-table-column label="方向" prop="role">
          <template #default="scope">
            <el-select
              v-model="scope.row[scope.column.property]"
              default-first-option
            >
              <el-option
                v-for="(item, index) in groups"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="授权">
          <template #default="scope">
            <el-button @click="changePower(scope.row)">{{
              isCommission
            }}</el-button>
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
// import router from "../router";
export default {
  setup() {
    const store = useStore();
    const queryInfo = reactive({
      pagenum: 1, //当前页数
      pagesize: 2, //可以显示的条数
    });
    const groups = ["前端组", "后台组", "go组", "服务端", "机器学习"];
    let isCommission = ref("去授权");
    const role = ref();
    const total = store.state.adminTotal;
    let adminlist = [
      {
        admin_num: "04192106",
        admin_name: "llr",
        role: "",
      },
      {
        admin_num: "04192106",
        admin_name: "llr",
        role: "",
      },
      {
        admin_num: "04192106",
        admin_name: "llr",
        role: "",
      },
    ];
    // let adminlist = store.state.admimInfo
    // 更新adminlist
    const updateAdminInfo = () => {
      // 这里触发的是授权的请求，感觉有点不太对？？？？？？？？？？
      store.dispatch("accreditAction");
      adminlist = store.state.admimInfo;
    };
    // 超管授权，改变管理员组别
    const changePower = (adminMg) => {
      isCommission = "已授权";
      console.log(isCommission);
      store.dispatch("changePowerAction", { ...adminMg });
    };
    //监听pagesize改变
    const handleSizeChange = (newsize) => {
      queryInfo.pagesize = newsize;
      updateAdminInfo();
    };
    //当前页数的改变
    const handleCurrentChange = (newnum) => {
      queryInfo.pagenum = newnum;
      updateAdminInfo();
    };
    return {
      adminlist,
      queryInfo,
      total,
      isCommission,
      role,
      groups,
      updateAdminInfo,
      handleSizeChange,
      handleCurrentChange,
      changePower,
    };
  },
};
</script>

<style lang="less" scoped>
.block {
  margin-top: 10px;
}
</style>

<template>
  <div>
    <el-card class="box-card">
      <el-table :data="adminlist" :border="true" style="font-size: 14px">
        <el-table-column label="学号" prop="admin_num"></el-table-column>
        <el-table-column label="姓名" prop="admin_name"></el-table-column>
        <el-table-column label="方向" prop="role">
          <template>
            <!-- <el-select v-model="role" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.role"
                :label="item.label"
                :role="item.role"
              >
              </el-option>
            </el-select> -->
            <!-- <el-select>
              <el-option
                key="234"
                label="前端"
              >

              </el-option>
            </el-select> -->
        
          </template>
            
        </el-table-column>
        <el-table-column label="授权">
          <template #default="scope">
            <el-button @click="changePower(scope.row)">去授权</el-button>
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
    const options = [
      {
        role: "选项1",
        label: "前端组",
      },
      {
        role: "选项2",
        label: "后台组",
      },
      {
        role: "选项3",
        label: "go组",
      },
      {
        role: "选项4",
        label: "服务端",
      },
      {
        role: "选项5",
        label: "机器学习",
      },
    ];
    const role = ref("前端组");
    const total = store.state.adminTotal;
    // const adminlist = store.state.admimInfo
    const adminlist = [
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
    // 更新adminlist
    const updateAdminInfo = () => {
      // 这里触发的是授权的请求，感觉有点不太对？？？？？？？？？？
      store.dispatch("accreditAction");
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
    // 超管授权，改变管理员组别
    const changePower = (adminMg) => {
      
      
      store.dispatch("changePowerAction", { ...warranty });
    };
    return {
      adminlist,
      queryInfo,
      total,
      options,
      role,
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

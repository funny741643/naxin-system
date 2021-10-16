<template>
  <div>
    <el-card class="box-card">
      <!-- <el-input> </el-input> <el-button>搜索</el-button> -->
      <el-table :data="adminInfo.list" :border="true" style="font-size: 14px">
        <el-table-column label="学号" prop="admin_num"></el-table-column>
        <el-table-column label="姓名" prop="admin_name"></el-table-column>
        <el-table-column label="方向" prop="role">
          <template #default="scope">
            <el-select
              v-model="scope.row[scope.column.property]"
              default-first-option
            >
              <el-option
                v-for="(item, index) in selectGroups"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <!-- 点击文字改变 -->
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
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="adminInfo.total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { computed, ref, reactive } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import axios from "./../service/request";
import { nextTick, onMounted } from '@vue/runtime-core';
export default {
  setup() {
    const queryInfo = reactive({
      pagenum: 1, //当前页数
      pagesize: 2, //可以显示的条数
    });
    const selectGroups = [
      "前端",
      "go",
      "Java",
      "服务端",
      "机器学习",
    ];
    let isCommission = ref("去授权");
    let adminRole = ref();
    const adminInfo = reactive({
      list: [],
      total: "",
    });
    const groups = [
      "无（未选择、未赋权）",
      "超级管理员",
      "前端",
      "go",
      "Java",
      "服务端",
      "机器学习",
    ];
    // 更新adminlist
    const updateAdminInfo = () => {
      console.log("updateAdminInfo");
      axios
        .get(
          `api/admin/superadmin/getadminpage?pagesize=${queryInfo.pagesize}&pagenum=${queryInfo.pagenum}`
        )
        .then((adminInfoRes) => {
          console.log(adminInfoRes);
          if (adminInfoRes.status == 200) {
            adminInfo.total = adminInfoRes.total;

            adminInfo.list = adminInfoRes.admins;
            adminInfo.list.forEach((item) => {
              item.role = groups[item.role];
            });
            console.log("adminInfo.list", adminInfo.list);

            // 自己的方法
            // adminInfo.list = JSON.parse(JSON.stringify(adminInfoRes.admins));
            // console.log(adminInfo.list);
            // for (let i = 0; i < adminInfoRes.total; i++) {
            //   for (let j = 0; i < groups.length; j++) {
            //     if (j == adminInfo.list[i].role) {
            //       adminInfo.list[i].role = groups[j];
            //     }
            //   }
            // }
          }
        });
    };
    onMounted(() => {
      updateAdminInfo()
    })
    // 超管授权，改变管理员组别
    // const changePower = async (adminMg) => {
    const changePower = (adminMg) => {
      isCommission = "已授权";
      console.log({ ...adminMg });
      groups.filter((item,index)=>{
        if(item == adminMg.role){
          adminRole = index
        }
      })
      const params = {
        admin_num: adminMg.admin_num,
        role: adminRole,
      };
      axios
        .post(`api/admin/superadmin/changepower`, params)
        .then((changePowerRes) => {
          console.log(changePowerRes);
          if (changePowerRes.status == 200) {
            ElMessage.warning({
              message: "授权成功",
              type: "success",
            });
            location.reload();
          } else {
            ElMessage.warning({
              message: "授权失败",
              type: "warning",
            });
          }
        });
    };
    //监听pagesize改变
    const handleSizeChange = (newsize) => {
      queryInfo.pagesize = newsize;
      updateAdminInfo();
    };
    //当前页数的改变
    const handleCurrentChange = (newnum) => {
      console.log('aaa')
      queryInfo.pagenum = newnum;
      updateAdminInfo();
    };
    return {
      adminInfo,
      queryInfo,
      isCommission,
      adminRole,
      selectGroups,
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

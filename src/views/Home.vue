<template>
  <div id="app-wrapper">
    <el-container>
      <el-header class="layout-header">
        <div>Acat纳新系统</div>
        <div>
          <el-dropdown>
            <div class="el-dropdown-link">
              <img
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                alt=""
              />
              <div>{{ name }}</div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="accredit">去授权</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-close" @click="backlogin"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container class="layout-body">
        <el-aside width="200px" class="layout-sideBar">
          <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
          >
            <template v-for="item in items">
              <template v-if="item.subs">
                <el-sub-menu :index="item.index" :key="item.index">
                  <template #title>
                    <i :class="item.icon"></i>
                    <span>{{ item.title }}</span>
                  </template>
                  <template v-for="subItem in item.subs">
                    <div>
                      <el-menu-item :index="subItem.index" :key="subItem.index">
                        <i :class="subItem.icon"></i>
                        <template #title>{{ subItem.title }}</template>
                      </el-menu-item>
                    </div>
                  </template>
                </el-sub-menu>
              </template>
              <template v-else>
                <el-menu-item :index="item.index" :key="item.index">
                  <i :class="item.icon"></i>
                  <template #title>{{ item.title }}</template>
                </el-menu-item>
              </template>
            </template>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { computed, ref, reactive, } from "vue";
import { useRoute } from "vue-router";
import router from "../router";
import localCache from "../utils/cache";
import axios from "./../service/request";
import { ElMessage } from "element-plus";
export default {
  setup() {
    let items = [
      {
        icon: "el-icon-location",
        index: "/user",
        title: "考生信息",
      },
      {
        icon: "el-icon-menu",
        index: "2",
        title: "面试管理",
        subs: [
          {
            index: "/interviewing",
            title: "面试中",
          },
          {
            index: "/interviewed",
            title: "一面结束",
          },
        ],
      },
      {
        icon: "el-icon-document",
        index: "/success",
        title: "新成员信息",
      },
    ];
    const route = useRoute();
    const name = localCache.getCache("admin_name");
    // 权限
    let power = ref(null);
    // 退出登录
    const backlogin = () => {
      console.log(route);
      router.replace("/login");
    };
    const params = reactive({
      pagesize: 5,
      pagenum: 1,
    });
    // 授权操作
    // const accredit = async () => {
    const accredit = () => {
      axios
        .get(
          `api/admin/superadmin/getadminpage?pagesize=${params.pagesize}&pagenum=${params.pagenum}`
        )
        .then((accreditRes) => {
          console.log(accreditRes);
          console.log(power);
          if (accreditRes.status !== 200 && accreditRes.status === 1008) {
            ElMessage.warning({
              message: "抱歉，你没有权限！正在授权，请稍等",
              type: "warning",
            });
            console.log("没有权限");
          } else {
            power = accreditRes.power;
            if (power) {
              console.log("success", power);
              items.push({
                icon: "el-icon-document",
                index: "/SuperAdmin",
                title: "管理员信息",
              });
              // router.push("/superadmin");
              router.replace("/superadmin");
            }
          }
        });
    };

    const onRoutes = computed(() => {
      return route.path;
    });

    return {
      items,
      name,
      power,
      params,
      onRoutes,
      backlogin,
      accredit,
    };
  },
};
</script>

<style lang="less" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  text-align: center;
  height: 50px;
  padding: 0 50px;
  line-height: 50px;
  background-color: #4c5768;
  font-size: 20px;
  font-weight: bolder;
  color: #fff;
  .el-dropdown-link {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-size: 13px;
    > img {
      height: 26px;
      width: 26px;
    }
  }
}

.layout-body {
  width: 100%;
  min-height: calc(100vh - 50px);
  overflow: hidden;
  .layout-sideBar {
    background-color: #324157;
  }
}
</style>

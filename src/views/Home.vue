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
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "../router";
import localCache from "../utils/cache";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const items = [
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
            index: "/interview1",
            title: "一轮面试",
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
    const name = localCache.getCache("name");
    const backlogin = () => {
      console.log(route);
      router.replace("/login");
    };
    // 授权操作
    const accredit = () => {
      console.log("accredit");
      store.dispatch("accreditAction");
      if (store.state.power) {
        items.push({
          icon: "el-icon-document",
          index: "/SuperAdmin",
          title: "管理员信息",
        });
        router.push('/superadmin')
      }
    };

    const onRoutes = computed(() => {
      return route.path;
    });

    // const testRequest = () => {
    //   axios.get("/api/users").then((res) => {
    //     console.log(res);
    //   });
    // };

    // onMounted(() => {
    //   testRequest();
    // });

    return {
      items,
      name,
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

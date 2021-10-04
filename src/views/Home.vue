<template>
  <div id="app-wrapper">
    <el-container>
      <el-header class="layout-header">Acat纳新系统</el-header>
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
import axios from "../utils/request";
// import { routes } from "../router";
export default {
  setup() {
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
          {
            index: "/interview2",
            title: "二轮面试",
          },
          {
            index: "/interview3",
            title: "三轮面试",
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

    const onRoutes = computed(() => {
      return route.path;
    });

    const testRequest = () => {
      axios.get('/api/users').then(res => {
        console.log(res);
      })
    }

    onMounted(() => {
      testRequest()
    });

    return {
      items,
      onRoutes,
    };
  },
};
</script>

<style lang="less" scoped>
.layout-header {
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #545c64;
  color: #fff;
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

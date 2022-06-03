<template>
  <el-container :direction="vertical">
    <el-header height=""> admin </el-header>
    <el-container :direction="horizontal">
      <el-aside width="200px">
        <el-menu style="height:calc(100vh - 60px)" mode="vertical" :default-active="$route.path" router>
          <el-submenu
            v-for="(item, index) in menu.items"
            :index="`menu-item-${index}`"
            :key="`menu-item-${index}`"
          >
            <template #title>{{ item.title }}</template>
            <el-menu-item
              v-for="(subItem, subIndex) in item.items"
              :index="subItem.path"
              :key="`menu-item-${index}-${subIndex}`"
            >
              {{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container :direction="vertical">
        <el-main>
          <router-view :key="$route.path"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  components: {},
})
export default class Main extends Vue {
  menu = {
    items: [
      {
        title: "内容管理",
        items: [
          { title: "首页", path: "/" },
          { title: "课程管理", path: "/courses/list" },
          { title: "课时管理", path: "/episode/list" },
        ],
      },
      {
        title: "系统管理",
        items: [
          { title: "用户管理", path: "/users/list" },
          { title: "权限管理", path: "/roles/list" },
        ],
      },
    ],
  };
}
</script>

<style>
</style>
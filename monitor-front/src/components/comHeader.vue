<template>
  <header>
    <div class="l-content">
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        @click="handleMenu"
      ></el-button>

      <el-breadcrumb s>
        <el-breadcrumb-item :to="{ path: '/home' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="current.path" v-if="current">{{
          current.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- <div class="m-content">
      <p>监控网站名字（待传入）</p>
    </div> -->
    <div class="r-content">
      <el-dropdown trigger="click" size="mini" @command="handleCommand">
        <span class="el-dropdown-link">
          <img :src="userImg" class="user" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人中心</el-dropdown-item>
            <el-dropdown-item command="b">退出</el-dropdown-item>
          </el-dropdown-menu>
        </span>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      userImg: require('../assets/images/logo.png'),
    };
  },

  methods: {
    handleMenu() {
      this.$store.commit("isCollapseMenu");
    },
    handleCommand(command) {
      if (command == "b") {
        window.sessionStorage.clear();
        this.$message.success("退出成功");
      }
    },
  },
  computed: {
    ...mapState({
      current: (state) => state.menu.currentMenu,
    }),
  },
};
</script>
<style  scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  background: rgb(255,255,255);

}

.l-content {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.l-content .el-button {
  margin-right: 20px;
}
.m-content{
  width:300px;
  height: 40px;
  background: red;
}
.r-content .user {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-breadcrumb__item .el-breadcrumb__inner {
  color: #666;
  font-weight: normal;
}
</style>

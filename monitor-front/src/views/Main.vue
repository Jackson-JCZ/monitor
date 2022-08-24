<template>
  <el-container class="container1">
    <el-aside class="com-aside" width="auto">
      <com-aside ></com-aside>
    </el-aside>
    <el-container class="container2">
      <el-header class="com-header" >
        <com-header ></com-header>
      </el-header>
      <el-main class="com-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import ComHeader from "../components/comHeader.vue";
import ComAside from "../components/comAside.vue";

export default {
  name: "mainIndex",
  components: {
    ComHeader,
    ComAside,
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped>
.container1 {
  height: 100%;
  width: 100%;
  display: flex;
}
.com-aside{
    /* border:1px solid red;
    background: red; */

}
.com-header {
  /* border:1px solid  black;
  background: black; */
  padding: 0;
  
}
.com-main {
  display: flex;
  flex-direction: column;
  overflow: auto;
  /* border:1px solid  blue;
  background: blue; */
 
}
</style>
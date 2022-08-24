<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse-transition='false'
  >
  <!-- 是否水平折叠收起菜单collapse -->
    <h3 v-show="!isCollapse">前端监控系统</h3>
    <h3 v-show="isCollapse">后台</h3>
    <!-- 对于不含二级菜单的菜单，直接el-menu-item 遍历就行了 对于可以跳转的选择绑定点击事件clickMenu(item)-->
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
     
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <!-- 专门应用于含有子菜单的标签，默认点击时展开子菜单 -->
    <el-submenu
      :index="item.label"
      v-for="item in hasChildren"
      :key="item.path" 
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subItem.path"
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
          @click="clickMenu(subItem)"
        >
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>



<script>
export default {
  data() {
    return {
      menu: [
        {
          path: '/home',
          name: 'home',
          label: '实时预览',
          icon: 's-home',
          url: '',
        },
        {
          label: '异常监控',
          icon: 'user',
          children: [
            {
              path: '/js_error',
              name: 'js_error',
              label: 'JS异常',
              icon: 'setting',
              url: '',
            },
            {
              path: '/api',
              name: 'api',
              label: '接口异常',
              icon: 'setting',
              url: '',
            },
            {
              path: '/blank',
              name: 'blank',
              label: '白屏异常',
              icon: 'setting',
              url: '',
            },
                        {
              path: '/sour_error',
              name: 'sour_error',
              label: '资源异常',
              icon: 'setting',
              url: '',
            },
          ],
        },
        {
          label: '性能监控',
          icon: 'user',
          children: [
            {
              path: '/page_perf',
              name: 'page_perf',
              label: '页面性能',
              icon: 'setting',
              url: '',
            }
          ],
        },
        {
          label: '行为监控',
          icon: 'user',
          children: [
            {
              path: '/pvuv',
              name: 'pvuv',
              label: '页面访问',
              icon: 'setting',
              url: '',
            }
          ],
        },
      ],
    }
  },
  methods: {
    clickMenu(item) {
      if(window.location.pathname!=item.path)
    {
      this.$router.push(item.path).catch(err=>{});
      this.$store.commit('selectMenu', item)
    }else{
      return
    }
      
    },
  },
  computed: {
    noChildren() {
      return this.menu.filter((item) => !item.children)
    },
    hasChildren() {
      return this.menu.filter((item) => item.children)
    },
    //跨组件使用方法，将变量（全局）放在store中，并加以调用,需要注意的是调用方法格式
    isCollapse() {
      return this.$store.state.menu.isCollapse
    },
  },
}
</script>
<style  scoped>
.el-menu {
  height: 100%;
  border: none;
  transition: all .5s;
}
.el-menu  h3 {
    color: #ffffff;
    text-align: center;
    line-height: 48px;
  }
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 160px;
  height: 100%;
}
</style>
export default{
    state:{
          //控制侧边栏收起
          isCollapse: false,
          //用于显示面包屑当前所在页面
          currentMenu: null,
    },
    mutations:{
           //可以直接操作状态，方法的收个参数为当前状态对象，第二个可选参数为载荷，一般为对象
        isCollapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            //val.name==='home'?(state.currentMenu=null):state.currentMenu=val
            if (val.name == 'home') {
                state.currentMenu = null;
            }
            else{
                state.currentMenu=val
            }
        },
        resetCurrentMenu(state){
            state.currentMenu=null;
        }
    },
    getter:{

    },
    action:{

    }
}
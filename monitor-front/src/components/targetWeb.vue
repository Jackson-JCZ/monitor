<template>
    <el-row type="flex" justify="space-between">
        <el-dropdown size="mini" split-button="true" type="primary" @click="jumpTar" @command="handleCommand">
        {{target.title}}
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="博客网站">博客网站</el-dropdown-item>
                <el-dropdown-item command="淘宝">淘宝</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-row type="flex" align="middle">
            <span class="tip">采样率：{{ sampling_rate }}</span>
            <div>
              <el-popover
                placement="bottom-end"
                :width="400"
                trigger="hover"
                content="this is content, this is content, this is content"
              >
                <div class="help-wrapper">
                    <strong>名词解释</strong>
                    <el-divider class="divide-margin"></el-divider>
                    <li>
                      <p><strong>异常次数：</strong>产生异常的次数</p>
                    </li>
                    <li>
                      <p><strong>影响用户：</strong>产生了JS异常影响到的用户数</p>
                    </li>
                    <li>
                      <p><strong>异常次数PV比：</strong>异常次数 / 页面PV * 100%</p>
                    </li>
                  </div>
                
                <div
                  slot="reference"
                  style="margin-left: 16px; color: #39f; font-size: 12px"
                >
                  <span>帮助文档</span>
                </div>
              </el-popover>
            </div>
          </el-row>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            target: {
                title: '博客网站',
                url: 'http://47.103.139.192/'
            },
           sampling_rate: '99%' 
        }
    },
    methods: {
        jumpTar() {
            window.open(this.target.url);
        },
        handleCommand(command) {
            this.target.title = command;
            if(command=='淘宝') this.target.url = ''

        }
    }
}
</script>

<style scoped>
.tip {
    color: grey;
    font-size: 13px;
    text-align: center;
    line-height: 13px;
}
li {
    list-style-type: none;
}
.divide-margin {
    margin: 10px auto;
}
</style>
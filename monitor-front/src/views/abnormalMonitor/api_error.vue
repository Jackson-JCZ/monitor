<template>
  <div>
    <div class="header fixed-header">
      <div class="h5-header-main">
        <div class="main-item" style="flex: 1 1 0%"></div>
        <div class="main-item">
          <div class="flex-row-end flex-row">
            <span class="text">采样率：？？？</span>
            <div>
              <el-popover
                placement="bottom-end"
                :width="200"
                trigger="hover"
                content="this is content, this is content, this is content"
              >
                <div class="help-wrapper">
                  <div class="popper-content">
                    <h4 class="main-title">名词解释</h4>
                    <li class="help-item">
                      <h5 class="help-label">异常次数：</h5>
                      <div class="help-content">产生异常的次数</div>
                    </li>

                    <li class="help-item">
                      <h5 class="help-label">影响用户：</h5>
                      <div class="help-content">产生了JS异常影响到的用户数</div>
                    </li>

                    <li class="help-item">
                      <h5 class="help-label">异常次数PV比：</h5>
                      <div class="help-content">异常次数 / 页面PV * 100%</div>
                    </li>
                  </div>
                </div>
                <div
                  slot="reference"
                  style="margin-left: 16px; color: #39f; font-size: 12px"
                >
                  <span>帮助文档</span>
                </div>
              </el-popover>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- text-board -->
    <div class="text-board content-box">
      <div class="text-board-item solid" style="width: 33.33%">
        <!-- <el-icon><WarningFilled /></el-icon> -->
        <div class="text-board-context text-normal text-center">
          <div class="texttooltip">
            <div class="ttooltip">
              <el-tooltip
                class="item"
                effect="dark"
                content="今日指标"
                placement="right"
              >
                <i
                  class="el-icon-info"
                  style="color: rgb(51, 153, 255); font-size: 16px"
                ></i>
              </el-tooltip>
            </div>

            <h5 class="text-title text-help first-title">请求次数</h5>
          </div>
          <div class="text-value">
            <span class="label">9999</span>
          </div>

          <div class="text-sub-value">
            <span class="text-help">
              较昨日
              <span>
                <i></i>
                <!-- &nbsp; 表示占一个空格位 -->
                &nbsp;58.76
                <span> % </span>
              </span>
            </span>
          </div>
        </div>
      </div>

      <div class="text-board-item solid" style="width: 33.33%">
        <div class="text-board-context text-normal text-center">
          <h5 class="text-title text-help">成功率</h5>

          <div class="text-value">
            <span class="label">9999</span>
          </div>

          <div class="text-sub-value">
            <span class="text-help">
              较昨日
              <span>
                <i></i>
                <!-- &nbsp; 表示占一个空格位 -->
                &nbsp;58.76
                <span> % </span>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="text-board-item solid" style="width: 33.33%">
        <div class="text-board-context text-normal text-center">
          <h5 class="text-title text-help">请求平均耗时</h5>

          <div class="text-value">
            <span class="label">9999</span>
          </div>

          <div class="text-sub-value">
            <span class="text-help">
              较昨日
              <span>
                <i></i>
                <!-- &nbsp; 表示占一个空格位 -->
                &nbsp;58.76
                <span> % </span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="content-box">
      <div
        class="charts-header flex-row"
        style="justify-content: space-between; align-items: center"
      >
        <div class="date-pick flex-row" style="align-items: center">
          <div class="date-picker">
            <div class="block">
              <el-date-picker
                v-model="timeList"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                disabledDate
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </div>
          </div>
          <span class="radio-text" style="font-size: 12px; padding-right: 4px"
            >时间粒度:</span
          >
          <div class="time-radio">
            <el-radio-group v-model="timeInterval">
              <el-radio label="60">分钟</el-radio>
              <el-radio label="3600">小时</el-radio>
              <el-radio label="86400">天</el-radio>
            </el-radio-group>
          </div>
          <el-button
            class="select-btn"
            type="primary"
            size="mini"
            @click="confirmParam"
            >查询</el-button
          >
        </div>
      </div>

      <div>
        <div class="echarts">
          <div class="box-card">
            <el-card body-style="padding:0">
              <div id="apiEcharts" style="height: 310px; width: 100%"></div>
            </el-card>
          </div>
        </div>
      </div>
    </div>

    <div class="line-content-container" style="margin: 16px 0 10px 0">
      <div>
        <span style="font-size: 14px; margin: 0 10px 0 10px">时间:</span>
      </div>
      <div class="log-block">
        <el-date-picker
          v-model="logDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-M-d"
        >
        </el-date-picker>
        <div class="back-current" @click="backLodDate">回到今日</div>
      </div>
    </div>

    <div style="display: flex; margin-bottom: 5px">
      <el-tabs class="tabMain" v-model="logChoose">
        <el-tab-pane label="全部URL" name="first">
          <div class="content-box">
            <el-table :data="tableData1" style="width: 100%">
              <el-table-column label="  #  " type="index"> </el-table-column>
              <el-table-column label="API URL" prop="apiUrl"> </el-table-column>
              <el-table-column label="请求次数" prop="applyCount">
              </el-table-column>
              <el-table-column label="成功率" prop="successRate">
              </el-table-column>
              <el-table-column label="请求耗时" prop="applyTime">
              </el-table-column>
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    @click="goDetails1(scope.row)"
                    type="text"
                    size="small"
                    >查看详情</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div>
              <div class="block">
                <el-pagination
                  @size-change="handleSizeChange1"
                  @current-change="handleCurrentChange1"
                  :current-page="currentPage1"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="pageSize1"
                  layout="total, sizes, prev, pager, next"
                  :total="total1"
                  :pager-count="more"
                  class="pagin"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="失败URL" name="second">
          <div class="content-box">
            <el-table :data="tableData2" style="width: 100%">
              <el-table-column label="  #  " type="index"> </el-table-column>
              <el-table-column label="API URL" prop="apiUrl"> </el-table-column>
              <el-table-column label="失败次数" prop="failCount">
              </el-table-column>
              <el-table-column label="失败率" prop="failRate">
              </el-table-column>
              <el-table-column label="失败耗时" prop="failTime">
              </el-table-column>
              <el-table-column label="失败影响用户数" prop="affectedUser">
              </el-table-column>
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    @click="goDetails2(scope.row)"
                    type="text"
                    size="small"
                    >查看详情</el-button
                  >
                </template>
              </el-table-column>
            </el-table>

            <div>
              <div class="block">
                <el-pagination
                  @size-change="handleSizeChange2"
                  @current-change="handleCurrentChange2"
                  :current-page="currentPage2"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="pageSize2"
                  layout="total, sizes, prev, pager, next"
                  :total="total2"
                  :pager-count="more"
                  class="pagin"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="日志详情" :visible.sync="dialogVisible">
      {{ detailData }}
    </el-dialog>
  </div>
</template>
<script>
import * as echarts from "echarts";
import {
  getFromTo,
  getStartAndEnd,
  judgeDefault,
  getCurrentDay,
  getNextDay
} from "@/comfunciton";
export default {
  name: "api-error",
  components: {},
  data() {
    return {
      logChoose: "first",
      logType: "api",
      start: "2022-8-4 21:61:00",
      end: "2022-8-4 21:90:00",
      timeInterval: "60",
      logDate: "",
      timeList: [], //日期
      more: 5, //超过5页自动折叠 共有
      pageSize1: 10,
      pageSize2: 10,
      currentPage1: 1,
      currentPage2: 1,
      total1: 24,
      total2: 100,
      dialogVisible: false,
      detailData: {
        time: "2020-08-21",
        author: "jack-chen",
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      tableData1: [
        {
          id: "12987122",
          apiUrl: "网络异常",
          applyCount: 4,
          successRate: "79.8%",
          applyTime: "200ms",
        },
        {
          id: "12987122",
          apiUrl: "网络异常",
          applyCount: 4,
          successRate: "79.8%",
          applyTime: "200ms",
        },
        {
          id: "12987122",
          apiUrl: "网络异常",
          applyCount: 4,
          successRate: "79.8%",
          applyTime: "200ms",
        },
        {
          id: "12987122",
          apiUrl: "网络异常",
          applyCount: 4,
          successRate: "79.8%",
          applyTime: "200ms",
        },
      ],
      tableData2: [
        {
          id: "12987122",
          apiUrl: "网络异常",
          failCount: 4,
          failRate: "79.8%",
          failTime: "200ms",
          affectedUser: 3,
        },
        {
          id: "12987122",
          apiUrl: "网络异常",
          failCount: 4,
          failRate: "79.8%",
          failTime: "200ms",
          affectedUser: 3,
        },
        {
          id: "12987122",
          apiUrl: "网络异常",
          failCount: 4,
          failRate: "79.8%",
          failTime: "200ms",
          affectedUser: 3,
        },
        {
          id: "12987122",
          apiUrl: "网络异常",
          failCount: 4,
          failRate: "79.8%",
          failTime: "200ms",
          affectedUser: 3,
        },
      ],
      source: [
        { api_num: 5, succRate: 0.14145002669321038, key: "2022-8-4 21:38:00" },
        { api_num: 8, succRate: 0.26325489617880193, key: "2022-8-4 21:39:00" },
        { api_num: 12, succRate: 0.5142059200160358, key: "2022-8-4 21:40:00" },
        { api_num: 11, succRate: 0.9969506561721722, key: "2022-8-4 21:41:00" },
        { api_num: 15, succRate: 0.6110415314176265, key: "2022-8-4 21:42:00" },
        { api_num: 7, succRate: 0.6792145737930444, key: "2022-8-4 21:43:00" },
        { api_num: 6, succRate: 0.5954372481842105, key: "2022-8-4 21:44:00" },
        { api_num: 6, succRate: 0.8719065090313902, key: "2022-8-4 21:45:00" },
        {
          api_num: 13,
          succRate: 0.40963234730288356,
          key: "2022-8-4 21:46:00",
        },
        { api_num: 15, succRate: 0.993096147582484, key: "2022-8-4 21:47:00" },
        {
          api_num: 12,
          succRate: 0.27960369803342733,
          key: "2022-8-4 21:48:00",
        },
        { api_num: 9, succRate: 0.4797171072013273, key: "2022-8-4 21:49:00" },
        { api_num: 8, succRate: 0.4934927537382383, key: "2022-8-4 21:50:00" },
        { api_num: 7, succRate: 0.43677644957575623, key: "2022-8-4 21:51:00" },
        { api_num: 5, succRate: 0.9222177255785726, key: "2022-8-4 21:52:00" },
        { api_num: 6, succRate: 0.37989531575011304, key: "2022-8-4 21:53:00" },
        { api_num: 7, succRate: 0.3435865466666088, key: "2022-8-4 21:54:00" },
        { api_num: 8, succRate: 0.8472785867392991, key: "2022-8-4 21:55:00" },
        { api_num: 9, succRate: 0.6722366972926861, key: "2022-8-4 21:56:00" },
        { api_num: 12, succRate: 0.3263518994126393, key: "2022-8-4 21:57:00" },
        { api_num: 15, succRate: 0.6016647096743462, key: "2022-8-4 21:58:00" },
        {
          api_num: 14,
          succRate: 0.12960993155689726,
          key: "2022-8-4 21:59:00",
        },
        { api_num: 8, succRate: 0.7342549566252536, key: "2022-8-4 21:60:00" },
        { api_num: 9, succRate: 0.8045199323159282, key: "2022-8-4 21:61:00" },
        { api_num: 5, succRate: 0.9266393907403245, key: "2022-8-4 21:62:00" },
        { api_num: 5, succRate: 0.8909421883761317, key: "2022-8-4 21:63:00" },
        { api_num: 5, succRate: 0.9899815266319221, key: "2022-8-4 21:64:00" },
        {
          api_num: 15,
          succRate: 0.10728836155050825,
          key: "2022-8-4 21:65:00",
        },
        { api_num: 12, succRate: 0.8404308786814774, key: "2022-8-4 21:66:00" },
        {
          api_num: 12,
          succRate: 0.02504739641311393,
          key: "2022-8-4 21:67:00",
        },
        { api_num: 12, succRate: 0.8684243034196959, key: "2022-8-4 21:68:00" },
        { api_num: 7, succRate: 0.5494028723865727, key: "2022-8-4 21:69:00" },
        { api_num: 18, succRate: 0.8796057346505288, key: "2022-8-4 21:70:00" },
        {
          api_num: 14,
          succRate: 0.12106221330331701,
          key: "2022-8-4 21:71:00",
        },
        { api_num: 12, succRate: 0.3144816976593545, key: "2022-8-4 21:72:00" },
        { api_num: 11, succRate: 0.800704301580279, key: "2022-8-4 21:73:00" },
        { api_num: 8, succRate: 0.06815845381368946, key: "2022-8-4 21:74:00" },
        { api_num: 5, succRate: 0.3871451311638312, key: "2022-8-4 21:75:00" },
        { api_num: 5, succRate: 0.8484572970144348, key: "2022-8-4 21:76:00" },
        { api_num: 6, succRate: 0.32321952682344235, key: "2022-8-4 21:77:00" },
        { api_num: 7, succRate: 0.7018784546034391, key: "2022-8-4 21:78:00" },
        { api_num: 7, succRate: 0.7565356645444528, key: "2022-8-4 21:79:00" },
        { api_num: 6, succRate: 0.9307779801407763, key: "2022-8-4 21:80:00" },
        { api_num: 5, succRate: 0.2766654981401073, key: "2022-8-4 21:81:00" },
        { api_num: 7, succRate: 0.689565550572194, key: "2022-8-4 21:82:00" },
        { api_num: 8, succRate: 0.5680344585527817, key: "2022-8-4 21:83:00" },
        { api_num: 9, succRate: 0.692505546216019, key: "2022-8-4 21:84:00" },
        { api_num: 7, succRate: 0.18209017009912842, key: "2022-8-4 21:85:00" },
        { api_num: 8, succRate: 0.31528494478642166, key: "2022-8-4 21:86:00" },
        { api_num: 6, succRate: 0.05752294537177516, key: "2022-8-4 21:87:00" },
        { api_num: 7, succRate: 0.6403191079817638, key: "2022-8-4 21:88:00" },
        { api_num: 8, succRate: 0.7941319225907173, key: "2022-8-4 21:89:00" },
        { api_num: 12, succRate: 0.8734349865673197, key: "2022-8-4 21:90:00" },
        { api_num: 11, succRate: 0.2946635930462467, key: "2022-8-4 21:91:00" },
        { api_num: 12, succRate: 0.7743780998490812, key: "2022-8-4 21:92:00" },
        { api_num: 13, succRate: 0.9141003374544019, key: "2022-8-4 21:93:00" },
        { api_num: 14, succRate: 0.770878662077888, key: "2022-8-4 21:94:00" },
        { api_num: 15, succRate: 0.373035840758166, key: "2022-8-4 21:95:00" },
        { api_num: 12, succRate: 0.8047066126710447, key: "2022-8-4 21:96:00" },
        {
          api_num: 11,
          succRate: 0.07421821519115035,
          key: "2022-8-4 21:97:00",
        },
      ],
    };
  },
  methods: {
    //页面数据初始化 时间
    initTimeTable() {
      this.timeList = [];
      this.timeList.push(new Date());
      this.timeList.push(new Date());

      this.logDate = new Date();
    },
    initRequestTime() {
      return getFromTo(this.timeList[0], this.timeList[1]);
    },
    initRequestBody() {
      //拼接请求参数
      let tepmData = {};
      let ft = this.initRequestTime();
      tepmData.logType = this.logType; //错误类型
      tepmData.from = ft.from;
      tepmData.to = ft.to;
      tepmData.indicatorList = ["js_error", "uv", "pv_percent", "uv_percent"];
      tepmData.timeInterval = this.timeInterval;
      return tepmData;
    },
    initProgress(itemList) {
      let flag = judgeDefault(this.timeList[0], this.timeList[1]);
      let timeData = getStartAndEnd(this.timeInterval, itemList, flag);
      this.start = timeData.startValue;
      this.end = timeData.endValue;
    },
    initEcharts(start, end, itemList) {
      var api_echarts = echarts.init(document.getElementById("apiEcharts"));
      var api_option = {
        grid: {
          left: "1%", //默认10%
          right: "1%", //默认10%
          bottom: "12%", //默认60
          top: "10%",
          containLabel: true,
          //grid区域是否包含坐标轴的刻度标签
        },
        toolbox: {
          feature: {
            magicType: {
              type: ["line", "bar"],
            },
            restore: {},
            saveAsImage: {},
          },
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params, ticket, callback) {
            let dataMap = new Map(Object.entries(params[0].data));
            let nameKey = new Map();
            nameKey.set("api成功率", "succRate");
            nameKey.set("请求次数", "api_num");
            let getValue = function (dataMap, nameKey, name) {
              let key = nameKey.get(name);
              let tail = "";
              switch (key) {
                case "succRate":
                  tail = "%";
                  break;
                case "api_num":
                  break;
              }
              if (key == "api_num") {
                return dataMap.get(key) + tail;
              } else {
                return (dataMap.get(key) * 100).toFixed(2) + tail;
              }
            };
            let time = new Date(params[0].axisValue); //时间戳转换时间
            let lable = `${("0" + (time.getMonth() + 1)).slice(-2)}-${(
              "0" + time.getDay()
            ).slice(-2)} ${("0" + time.getHours()).slice(-2)}:${(
              "0" + time.getMinutes()
            ).slice(-2)}`;
            let value = (params[0].value.succRate * 100).toFixed(2) + "%";
            let res = "<span>" + lable + "</span><br/>";
            for (let i = 0; i < params.length; i++) {
              res +=
                params[i].marker +
                params[i].seriesName +
                '：<span style="float:right;font-weight:600">';
              res +=
                getValue(dataMap, nameKey, params[i].seriesName) +
                "</span><br/>";
            }
            return res;
          },
          backgroundColor: "rgba(40,42,54, 0.7)",
          borderColor: "rgba(40,42,54,0.5)",
          textStyle: {
            color: "#fff",
          },
        },
        legend: {
          left: "2%",
        },
        xAxis: {
          type: "time",
          boundaryGap: false,
          axisLabel: {
            showMinLable: "true",
            showMaxLable: "true",
            hideOverlap: "true",
          },
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: [
          {
            type: "value",
          },
          {
            type: "value",
            axisLabel: {
              show: true,
              interval: "auto",
              formatter: function (value, index) {
                return value * 100 + "%";
              },
            },
            show: true,
          },
        ],
        dataset: {
          source: itemList,
        },
        dataZoom: [
          {
            type: "slider", //滑动类型数据区域缩放组件
            startValue: start,
            endValue: end,
          },
        ],
        series: [
          {
            name: "请求次数",
            type: "bar",
            yAxisIndex: 0,
            encode: {
              x: "key",
              y: "api_num",
            },
          },
          {
            name: "api成功率",
            type: "line",
            smooth: true,
            symbol: "none",
            yAxisIndex: 1,
            encode: {
              x: "key",
              y: "succRate",
            },
          },
        ],
      };
      api_echarts.setOption(api_option);
    },
    confirmParam() {
      //请求做出改变
      let that = this;
      let requestData = this.initRequestBody();
      console.log(requestData);
      getEchartData(requestData).then((res) => {
        //拿到数据后再考虑渲染echarts
        that.initProgress(res.itemList); //初始化显示进度位置
        that.initEcharts(that.start, that.end, res.itemList);
      });
    },
    handleSizeChange1(val) {
      this.pageSize1 = val;
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val;
    },
    handleSizeChange2(val) {
      this.pageSize2 = val;
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val;
    },
    backLodDate() {
      this.logDate = getCurrentDay();
      // console.log(this.logDate);
    },
    goDetails1(item) {
      console.log(item);
      this.dialogVisible = true;
    },
    goDetails2(item) {
      console.log(item);
      this.dialogVisible = true;
    },
        //处理表格显示
    getTableData1() {
      let start = this.pageSize1 * (this.currentPage1 - 1);
      let end = start + this.pageSize1;
      if (end > this.total1) {
        this.tableData1 = this.templateList1.slice(start);
      } else {
        this.tableData1 = this.templateList1.slice(start, end);
      }
    },
    getTableData2() {
      let start = this.pageSize2 * (this.currentPage2 - 1);
      let end = start + this.pageSize2;
      if (end > this.total1) {
        this.tableData2 = this.templateList2.slice(start);
      } else {
        this.tableData2 = this.templateList2.slice(start, end);
      }
    },
  },
    watch: {
    currentPage1(newValue, oldValue) {
      this.getTableData1();
    },
    pageSize1(newValue, oldValue) {
      this.getTableData1();
    },
    currentPage2(newValue, oldValue) {
      this.getTableData2();
    },
    pageSize2(newValue, oldValue) {
      this.getTableData2();
    },
  },
  created() {
    //方法数据创建后就可以加载一下默认日期选择
    this.initTimeTable();
  },
  mounted() {
    // 还需要初始化时间操作  默认触发一次点击事件 confirmParam
    this.initEcharts(this.start, this.end, this.source);
  },
};
</script>
<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

*,
:after,
:before {
  box-sizing: border-box;
}

.box-item {
  color: #39f;
  padding: 0 0 0 0;
  background: transparent;
  box-shadow: 0;
  border: 0 0 0 0;
  line-height: 21px;
}

.content-box {
  margin-bottom: 16px;
  background: #fff;
  padding: 16px;
}

.date-picke {
  display: inline-block;
  margin-top: 14px;
  margin-left: 12px;
}

.date-picker {
  /* vertical-align: middle; */
  display: inline-block;
}

.fixed-header {
  box-shadow: 1px 1px 1px 0 #eeebe8e3;
}

.flex-row-end {
  -webkit-box-pack: end;
  justify-content: flex-end;
  /* display: flex; */
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.header {
  background: #f0f1f3;
  position: sticky;
  /* position: fixed;  */
  z-index: 999; /*置于最上层*/
  padding: 0px 20px 10px 20px;
}

.h5-header-main {
  display: flex;
  -webkit-box-pack: justify; /*???*/
  justify-content: space-between;
  -webkit-box-align: center; /*???*/
  align-items: center;
}

.help-content {
  padding: 4px 0 4px 8px;
  font-size: 12px;
}

.help-label {
  padding: 4px 0;
}

.help-wrapper {
  margin: 0 0 0 0;
  padding: 8px 0 5px 0;
  min-width: 150px;
}

.help-wrapper .help-item {
  display: flex;
}

.inline-block {
  display: inline-block;
}

.line-content-container {
  display: flex;
  align-items: center;
}

.main-item {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  height: 100%;
}

.help-wrapper .main-title {
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
}

.radio-text {
  display: inline-block;
  vertical-align: middle;
  line-height: 30px;
  margin-left: 8px;
}

.text {
  display: inline-block;
  vertical-align: middle;
  line-height: 21px;
  font-size: 12px;
  opacity: 0.6;
}

.text-board {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; /*一行放不下时可自动换行*/
  justify-content: center;
  width: 100%;
}

.text-board > .solid:not(:first-child) {
  border-left: 1px solid #e3e8ef;
}

.text-board-item {
  float: left;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
}

.text-board-context {
  padding: 0 8px;
}

.text-normal {
  font-size: 24px;
}

.text-center {
  text-align: center;
}

.text-title {
  font-size: 12px;
}

.text-help {
  color: #9ea7b4;
}

.text-value .label {
  font-weight: 700;
  color: #666;
}

.text-sub-value {
  font-size: 12px;
}
.select-btn {
  margin-left: 20px;
}
h5 {
  margin: 0;
  padding: 0;
  display: block;
}
.text-value {
  margin-top: 5px;
}
.texttooltip {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
}
.first-title {
  margin-right: 180px;
}
.log-block {
  display: flex;
  align-items: center;
}
.back-current {
  height: 36px;
  line-height: 36px;
  margin-left: 10px;
  background: #fff;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 14px;
  cursor: pointer;
  border: 0.5px solid #999;
}
.back-current:hover {
  color: #39f;
  border: 0.5px solid #39f;
}
.tabMain {
  width: 100%;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.block {
  margin-top: 10px;
  overflow: hidden;
}
.pagin {
  width: 40%;
  float: right;
}
</style>

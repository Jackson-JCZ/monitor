<template>
  <div>
    <div class="header fixed-header">
      <div class="h5-header-main">
        <div class="main-item" style="flex: 1 1 0%">
          <!--  -->
        </div>

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
                  style="color: rgb(51,153,255); font-size: 16px"
                ></i>
              </el-tooltip>
            </div>
            <h5 class="text-title text-help first-title">失败资源数</h5>
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
          <h5 class="text-title text-help">异常次数PV比</h5>
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
          <h5 class="text-title text-help">影响用户占比</h5>

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
      <div class="charts-header flex-row" style="align-items: center">
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
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </div>
          </div>

          <span class="radio-text" style="font-size: 14px; padding-right: 4px"
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
              <div id="sourEcharts" style="height: 310px; width: 100%"></div>
            </el-card>
          </div>
        </div>
      </div>
    </div>

    <div class="line-content-container" style="margin: 16px 0 10px 0">
      <div>
        <span style="font-size: 16px; margin: 0 10px 0 10px">时间:</span>
      </div>
      <div class="log-block">
        <el-date-picker
          v-model="logDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-M-d"
        >
        </el-date-picker>
      </div>
 <div class="back-current" @click="backLodDate">回到今日</div>
    </div>

    <div class="content-box">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="  #  " type="index"> </el-table-column>
        <el-table-column label="资源地址URL" prop="resourceUrl">
        </el-table-column>
        <el-table-column label="异常次数" prop="abnormalCount">
        </el-table-column>
        <el-table-column label="影响用户" prop="affectedUser">
        </el-table-column>
                <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="goDetails(scope.row)" type="text" size="small"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
        <!-- 日志详情 -->
    <el-dialog title="日志详情" :visible.sync="dialogVisible">
      {{ detailData }}
    </el-dialog>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { getFromTo, getStartAndEnd, judgeDefault, getCurrentDay,
  getNextDay, } from "@/comfunciton";
import { getDetailByUrl, getTemplate } from "@/api/sourceerror";
export default {
  name: "source-error",
  components: {},
  data() {
    return {
      logType: "resloadfail",
      start: "2022-8-12 0:11:00",
      end: "2022-8-12 0:36:00",
      timeInterval: "60",
      logDate: "",
      timeList: [],
      currentPage: 1,
      more: 5, //超过5页自动折叠 共有
      pageSize: 10,
      total: 15,
            dialogVisible: false,
      detailData: {
        time: "2020-08-21",
        author: "jack-chen",
      },
      templateList: [
        {
          id: "12987122",
          resourceUrl: "网络异常",
          abnormalCount: 4,
          affectedUser: 10,
          produceTime: "",
          DOMPath: "html>body>div>script",
        },
        {
          id: "12987122",
          resourceUrl: "网络异常",
          abnormalCount: 4,
          affectedUser: 10,
          produceTime: "",
          DOMPath: "html>body>div>script",
        },
        {
          id: "12987122",
          resourceUrl: "网络异常",
          abnormalCount: 4,
          affectedUser: 10,
          produceTime: "",
          DOMPath: "html>body>div>script",
        },
        {
          id: "12987122",
          resourceUrl: "网络异常",
          abnormalCount: 4,
          affectedUser: 10,
          produceTime: "",
          DOMPath: "html>body>div>script",
        },
      ],
      tableData: [
      ],
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
      source: [
        {
          resloadfail: 6,
          key: "2022-8-12 0:11:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 19,
          key: "2022-8-12 0:12:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 17,
          key: "2022-8-12 0:13:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 8,
          key: "2022-8-12 0:14:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 16,
          key: "2022-8-12 0:15:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 12,
          key: "2022-8-12 0:16:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 6,
          key: "2022-8-12 0:17:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 11,
          key: "2022-8-12 0:18:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 13,
          key: "2022-8-12 0:19:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 10,
          key: "2022-8-12 0:20:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 15,
          key: "2022-8-12 0:21:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 10,
          key: "2022-8-12 0:22:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 13,
          key: "2022-8-12 0:23:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 15,
          key: "2022-8-12 0:24:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 17,
          key: "2022-8-12 0:25:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 18,
          key: "2022-8-12 0:26:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 9,
          key: "2022-8-12 0:27:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 16,
          key: "2022-8-12 0:28:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 9,
          key: "2022-8-12 0:29:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 16,
          key: "2022-8-12 0:30:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 9,
          key: "2022-8-12 0:31:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 13,
          key: "2022-8-12 0:32:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 17,
          key: "2022-8-12 0:33:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 12,
          key: "2022-8-12 0:34:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 19,
          key: "2022-8-12 0:35:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 17,
          key: "2022-8-12 0:36:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 15,
          key: "2022-8-12 0:38:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 16,
          key: "2022-8-12 0:39:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 19,
          key: "2022-8-12 0:40:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 12,
          key: "2022-8-12 0:41:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 15,
          key: "2022-8-12 0:42:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 6,
          key: "2022-8-12 0:43:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 7,
          key: "2022-8-12 0:44:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 7,
          key: "2022-8-12 0:45:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 11,
          key: "2022-8-12 0:46:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 8,
          key: "2022-8-12 0:47:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 15,
          key: "2022-8-12 0:48:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 10,
          key: "2022-8-12 0:49:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 19,
          key: "2022-8-12 0:50:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 16,
          key: "2022-8-12 0:51:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 19,
          key: "2022-8-12 0:52:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 8,
          key: "2022-8-12 0:53:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 19,
          key: "2022-8-12 0:54:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 13,
          key: "2022-8-12 0:55:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 10,
          key: "2022-8-12 0:56:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 13,
          key: "2022-8-12 0:57:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 7,
          key: "2022-8-12 0:58:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 6,
          key: "2022-8-12 0:59:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 14,
          key: "2022-8-12 01:00:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 18,
          key: "2022-8-12 01:01:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 19,
          key: "2022-8-12 01:02:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 12,
          key: "2022-8-12 01:03:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 18,
          key: "2022-8-12 01:04:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 17,
          key: "2022-8-12 01:05:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 12,
          key: "2022-8-12 01:06:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 11,
          key: "2022-8-12 01:07:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 16,
          key: "2022-8-12 01:08:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 18,
          key: "2022-8-12 01:09:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          resloadfail: 18,
          key: "2022-8-12 01:10:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
      ],
    };
  },
  methods: {
        //初始化列表数据
    initTableData() {
      let that = this;
      getTemplate().then((res) => {
        //修改template1和total1
        that.getTableData();
      });
    },
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
      var source_echarts = echarts.init(document.getElementById("sourEcharts"));
      var source_option = {
        toolbox: {
          feature: {
            magicType: {
              type: ["line", "bar"],
            },
            restore: {},
            saveAsImage: {},
          },
        },
        grid: {
          left: "1%", //默认10%
          right: "1%", //默认10%
          bottom: "12%", //默认60
          top: "10%",
          containLabel: true,
          //grid区域是否包含坐标轴的刻度标签
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params, ticket, callback) {
            let dataMap = new Map(Object.entries(params[0].data));
            let nameKey = new Map();
            nameKey.set("资源加载异常", "resloadfail");
            nameKey.set("异常次数PV比", "uv_percent");
            nameKey.set("影响用户比", "pv_percent");
            let getValue = function (dataMap, nameKey, name) {
              let key = nameKey.get(name);
              let tail = "";
              switch (key) {
                case "uv_percent":
                  tail = "%";
                  break;
                case "pv_percent":
                  tail = "%";
                  break;
                case "resloadfail":
                  break;
              }
              if (key == "resloadfail") {
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
              // formatter: '{value} %'
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
            name: "资源加载异常",
            type: "bar",
            encode: {
              x: "key",
              y: "resloadfail",
            },
          },
          {
            name: "异常次数PV比",
            type: "line",
            yAxisIndex: 1,
            encode: {
              x: "key",
              y: "uv_percent",
            },
          },
          {
            name: "影响用户比",
            type: "line",
            yAxisIndex: 1,
            encode: {
              x: "key",
              y: "pv_percent",
            },
          },
        ],
      };
      source_echarts.setOption(source_option);
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    
    backLodDate() {
      this.logDate = getCurrentDay();
      // console.log(this.logDate);
    },
    goDetails() {
      getDetailByUrl().then((res) => {});
      // console.log(item);
      this.dialogVisible = true;
    },
    //处理表格显示
    getTableData() {
      let start = this.pageSize * (this.currentPage - 1);
      let end = start + this.pageSize;
      if (end > this.total) {
        this.tableData = this.templateList.slice(start);
      } else {
        this.tableData = this.templateList.slice(start, end);
      }
    },
  },
    watch: {
    currentPage(newValue, oldValue) {
      this.getTableData();
    },
    pageSize(newValue, oldValue) {
      this.getTableData();
    },
    //监听日志时间 做出同步改变表格列表数据源
    logDate(newValue, oldValue) {
      //重新获取对应时间范围内的列表数据 并且需要重置当前页为第一页。
      this.initTableData();
      this.currentPage = 1;
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
  flex-direction: row;
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

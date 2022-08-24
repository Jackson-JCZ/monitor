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
            <h5 class="text-title text-help first-title">异常次数</h5>
          </div>
          <div class="text-value">
            <span class="label">9999</span>
          </div>
          <div class="text-sub-value">
            <span class="text-help">
              较昨日
              <span>
                <i></i>
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
              <div id="jsEcharts" style="height: 310px; width: 100%"></div>
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

    <div style="display: flex; margin-bottom: 5px;" >
      <el-tabs class="tabMain" v-model="logChoose">
        <el-tab-pane label="异常内容" name="first" >
          <div class="content-box">
            <el-table :data="tableData1" border style="width: 100%"  :row-class-name="tableRowClassName">
               <el-table-column label="#" type="index" > </el-table-column>
             
              <el-table-column label="异常内容" prop="content" >
              </el-table-column>
              <el-table-column label="异常次数" prop="count" > </el-table-column>
            <el-table-column label="操作" width="150">
            <template slot-scope="scope">
        <el-button @click="goDetails1(scope.row)" type="text" size="small">查看详情</el-button>
      </template>
            </el-table-column>
            </el-table>
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
        </el-tab-pane>
        <el-tab-pane label="异常页面" name="second"> 
        <div class="content-box">
      <el-table :data="tableData2" style="width: 100%">
            <el-table-column label="#" type="index" > </el-table-column>
              <el-table-column label="页面URL" prop="pageUrl" >
              </el-table-column>
              <el-table-column label="异常次数" prop="count" > </el-table-column>
                  <el-table-column label="影响用户" prop="affectedUser"> </el-table-column>
            <el-table-column label="操作" width="150">
            <template slot-scope="scope">
        <el-button @click="goDetails2(scope.row)" type="text" size="small">查看详情</el-button>
      </template>
            </el-table-column>
      </el-table>
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
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 日志详情 -->
    <el-dialog title="日志详情" :visible.sync="dialogVisible">
      {{detailData}}
</el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import {
  getFromTo,
  getStartAndEnd,
  judgeDefault,
  getCurrentDay,
  getNextDay,
} from "@/comfunciton";
import { getEchartData, getTemplate1, getTemplate2,getDetailByContent,getDetailByUrl ,test} from "@/api/jserror";
export default {
  name: "js-error",
  components: {},
  data() {
    return {
      logChoose: "first",
      logType: "jserror",
      start: "2022-08-11 15:36:00",
      end: "2022-08-11 15:46:00",
      timeInterval: "60",
      more: 5, //超过5页自动折叠 共有
      pageSize1: 10,
      pageSize2: 10,
      currentPage1: 1,
      currentPage2: 1,
      total1: 24,
      total2: 100,
      dialogVisible:false,
      detailData:{
        time:'2020-08-21',
        author:'jack-chen',
      },
      templateList1: [
        {
          id: "12987122",
          content: "网络异常1",
          count: 4,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
          abnormalStack:
            "at d (https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2409723) \
at https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2410713",
        },
        {
          id: "12987122",
          content: "Not Found2",
          count: 9,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
        },
        {
          id: "12987122",
          content: "异常3",
          count: 10,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
        },
        {
          id: "12987122",
          content: "异常4",
          count: 7,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
        },
        {
          id: "12987122",
          content: "网络异常5",
          count: 4,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
          abnormalStack:
            "at d (https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2409723) \
at https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2410713",
        },
        {
          id: "12987122",
          content: "Not Found6",
          count: 9,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
        },
        {
          id: "12987122",
          content: "异常7",
          count: 10,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
        },
        {
          id: "12987122",
          content: "异常8",
          count: 7,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
        },
        {
          id: "12987122",
          content: "网络异常9",
          count: 4,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
          abnormalStack:
            "at d (https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2409723) \
at https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2410713",
        },
        {
          id: "12987122",
          content: "Not Found10",
          count: 9,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
        },
        {
          id: "12987122",
          content: "异常11",
          count: 10,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
        },
        {
          id: "12987122",
          content: "异常12",
          count: 7,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
        },
        {
          id: "12987122",
          content: "网络异常13",
          count: 4,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
          abnormalStack:
            "at d (https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2409723) \
at https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2410713",
        },
        {
          id: "12987122",
          content: "Not Found14",
          count: 9,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
        },
        {
          id: "12987122",
          content: "异常15",
          count: 10,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
        },
        {
          id: "12987122",
          content: "异常16",
          count: 7,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
        },
        {
          id: "12987122",
          content: "网络异常17",
          count: 4,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
          abnormalStack:
            "at d (https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2409723) \
at https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2410713",
        },
        {
          id: "12987122",
          content: "Not Found18",
          count: 9,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
        },
        {
          id: "12987122",
          content: "异常19",
          count: 10,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
        },
        {
          id: "12987122",
          content: "异常20",
          count: 7,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
        },
        {
          id: "12987122",
          content: "网络异常21",
          count: 4,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
          abnormalStack:
            "at d (https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2409723) \
at https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2410713",
        },
        {
          id: "12987122",
          content: "Not Found22",
          count: 9,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
        },
        {
          id: "12987122",
          content: "异常23",
          count: 10,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
        },
        {
          id: "12987122",
          content: "异常24",
          count: 7,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
        },
      ], //模板数据 适用于小批量数据 显示数组由次分割 初始化的时候添加进入
      templateList2: [],
      timeList: [],
      logDate: "",
      tableData1: [], //列表展示
      tableData2: [
        {
          id: "598113",
          content: "网络异常",
          count: 4,
          produceTime: "",
          pageUrl: "https://www.demo.com/antv/g6-editor",
          abnormalStack:
            "at d (https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2409723) \
at https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2410713",
          affectedUser: 5,
        },
        {
          id: "894894",
          content: "网络异常",
          count: 4,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
          abnormalStack:
            "at d (https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2409723) \
at https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2410713",
          affectedUser: 5,
        },
        {
          id: "13212",
          content: "网络异常",
          count: 4,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
          abnormalStack:
            "at d (https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2409723) \
at https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2410713",
          affectedUser: 5,
        },
        {
          id: "8948",
          content: "网络异常",
          count: 4,
          produceTime: "",
          pageUrl: "https://www.accc.com/cc/dd",
          abnormalStack:
            "at d (https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2409723) \
at https://gw.myobjects.com/os/douknow/skylark/common.e7634e5b.async.js:1:2410713",
          affectedUser: 5,
        },
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
        //错误发生次数 影响用户数
        {
          js_error: 12,
          key: "2022-08-11 15:36:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 10,
          key: "2022-08-11 15:37:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 15,
          key: "2022-08-11 15:38:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 8,
          key: "2022-08-11 15:39:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 4,
          key: "2022-08-11 15:40:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 2,
          key: "2022-08-11 15:41:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 12,
          key: "2022-08-11 15:42:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 15,
          key: "2022-08-11 15:43:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 17,
          key: "2022-08-11 15:44:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 14,
          key: "2022-08-11 15:45:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 10,
          key: "2022-08-11 15:46:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 12,
          key: "2022-08-11 15:47:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 10,
          key: "2022-08-11 15:48:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 22,
          key: "2022-08-11 15:49:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 15,
          key: "2022-08-11 15:50:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 8,
          key: "2022-08-11 15:51:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 4,
          key: "2022-08-11 15:52:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 2,
          key: "2022-08-11 15:53:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 12,
          key: "2022-08-11 15:54:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 15,
          key: "2022-08-11 15:55:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 17,
          key: "2022-08-11 15:56:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 14,
          key: "2022-08-11 15:57:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 10,
          key: "2022-08-11 15:58:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 12,
          key: "2022-08-11 15:59:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 10,
          key: "2022-08-11 16:00:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 22,
          key: "2022-08-11 16:01:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 15,
          key: "2022-08-11 16:02:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 8,
          key: "2022-08-11 16:03:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 4,
          key: "2022-08-11 16:04:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 2,
          key: "2022-08-11 16:05:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 12,
          key: "2022-08-11 16:06:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 15,
          key: "2022-08-11 16:07:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 17,
          key: "2022-08-11 16:08:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 14,
          key: "2022-08-11 16:09:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 10,
          key: "2022-08-11 16:10:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 12,
          key: "2022-08-11 16:11:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 10,
          key: "2022-08-11 16:12:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 22,
          key: "2022-08-11 16:13:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 15,
          key: "2022-08-11 16:14:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 8,
          key: "2022-08-11 16:15:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 4,
          key: "2022-08-11 16:16:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 2,
          key: "2022-08-11 16:17:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 12,
          key: "2022-08-11 16:18:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 15,
          key: "2022-08-11 16:19:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 17,
          key: "2022-08-11 16:20:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 14,
          key: "2022-08-11 16:21:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 10,
          key: "2022-08-11 16:22:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 12,
          key: "2022-08-11 16:23:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 10,
          key: "2022-08-11 16:24:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 22,
          key: "2022-08-11 16:25:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 15,
          key: "2022-08-11 16:26:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 8,
          key: "2022-08-11 16:27:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 4,
          key: "2022-08-11 16:28:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 2,
          key: "2022-08-11 16:29:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 12,
          key: "2022-08-11 16:30:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 15,
          key: "2022-08-11 16:31:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 17,
          key: "2022-08-11 16:32:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 14,
          key: "2022-08-11 16:33:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 10,
          key: "2022-08-11 16:34:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 12,
          key: "2022-08-11 16:35:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 10,
          key: "2022-08-11 16:36:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 22,
          key: "2022-08-11 16:37:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 15,
          key: "2022-08-11 16:38:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 8,
          key: "2022-08-11 16:39:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 4,
          key: "2022-08-11 16:40:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 2,
          key: "2022-08-11 16:41:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 12,
          key: "2022-08-11 16:42:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 15,
          key: "2022-08-11 16:43:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 17,
          key: "2022-08-11 16:44:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 14,
          key: "2022-08-11 16:45:00",
          uv: 4,
          pv_percent: 1.0024,
          uv_percent: 0.89,
        },
        {
          js_error: 10,
          key: "2022-08-11 16:46:00",
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
      let temp1={
      logType: "jserror",
      kind: "stability",
      from: this.start,
      to: this.end,
      indicatorList: "['jserror']",
      row:true,
      timeInterval: this.timeInterval
      };
      let temp2={
      logType: "jserror",
      kind: "stability",
      from: "2022-8-4 00:00:00",
      to: "2022-8-20 00:00:00",
      indicatorList: "['jserror']",
      row:true,
      timeInterval: 60
      };
      getTemplate1(JSON.stringify(temp1)).then((res) => {
        //修改template1和total1
        console.log(res)
        that.getTableData1();
      });
      // getTemplate2().then((res) => {
      //   //修改template2和total2
      //   that.getTableData2();
      // });
    },
    //页面数据初始化 时间
    initTimeTable() {
      this.timeList = [];
      this.timeList.push(new Date());
      this.timeList.push(new Date());

      //日志时间初始化
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
      //根据请求回来的数据进行初始化图标
      var jserror_echarts = echarts.init(document.getElementById("jsEcharts"));
      var js_option = {
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
            nameKey.set("js异常数", "js_error");
            nameKey.set("异常次数PV比", "uv_percent");
            nameKey.set("影响用户比", "pv_percent");
            nameKey.set("影响用户数", "uv");
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
                case "uv":
                  break;
                case "js_error":
                  break;
              }
              if (key == "js_error" || key == "uv") {
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
        grid: {
          left: "1%", //默认10%
          right: "1%", //默认10%
          bottom: "12%", //默认60
          top: "12%",
          containLabel: true,
          //grid区域是否包含坐标轴的刻度标签
        },
        legend: {
          left: "2%",
        },
        xAxis: {
          type: "time",
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
            name: "js异常数",
            type: "bar",
            itemStyle: {
              normal: {
                opacity: 0.8,
              },
            },
            encode: {
              x: "key",
              y: "js_error",
            },
          },
          {
            name: "影响用户数",
            type: "scatter",
            encode: {
              x: "key",
              y: "uv",
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
      jserror_echarts.setOption(js_option);
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
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    goDetails1(item) {
      getDetailByContent().then((res)=>{

      })
      this.dialogVisible=true;
    },
    goDetails2(item) {
      getDetailByUrl().then((res)=>{
        
      })
      // console.log(item);
      this.dialogVisible=true;
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
    //监听日志时间 做出同步改变表格列表数据源
    logDate(newValue,oldValue)
    {
      //重新获取对应时间范围内的列表数据 并且需要重置当前页为第一页。
      this.initTableData();
      this.currentPage1=1;
      this.currentPage2=1;
    }
  },
  created() {
    this.getTableData1();
    //方法数据创建后就可以加载一下默认日期选择
    this.initTimeTable();
    console.log(getNextDay(this.logDate));
        let temp= {
      logType: "vueError",
      kind: "stability",
      from: "2022-8-3 00:00:00",
      to: "2022-8-22 00:00:00",
      indicatorList: "['vueError']",
      raw:true,
      timeInterval: 60
    };
    test(JSON.stringify(temp)).then((res)=>{
      console.log(res)
    })
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
.el-picker-panel__body-wrapper {
  height: 100px;
  width: 100px;
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

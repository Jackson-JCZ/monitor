<template>
  <div class="container">
    <div class="upload">
      <div class="l-con">
        <i><svg t="1660381239294" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2655" width="16" height="16">
            <path
              d="M949.638897 509.757936c0-241.799068-196.006116-437.805184-437.805184-437.805184-241.800092 0-437.806207 196.006116-437.806207 437.805184 0 241.811348 196.006116 437.817464 437.806207 437.817464 99.262748 0 190.149734-33.771151 263.59242-89.425705 3.015683-3.421936 4.999874-7.789407 4.999874-12.698207 0-10.717086-8.692986-19.407002-19.408025-19.407002-5.562692 0-10.513448 2.207271-14.048971 5.944386l-0.246617 0c-65.719794 48.358381-146.610102 77.313853-234.459916 77.313853-218.947618 0-396.469754-177.544649-396.469754-396.482033 0-218.97013 177.522136-396.470777 396.469754-396.470777 218.969107 0 396.469754 177.500647 396.469754 396.470777 0 66.865897-15.692401 129.814578-44.962028 185.110975l0 0.325411c-0.538259 1.845021-1.12359 3.645017-1.12359 5.627161 0 10.719132 8.688893 19.407002 19.407002 19.407002 8.353248 0 15.331173-5.357008 18.055215-12.742209l0 0.135076C931.289993 650.424676 949.638897 582.250994 949.638897 509.757936zM506.813373 276.017404c0-11.527544-9.367345-20.892843-20.917402-20.892843-11.527544 0-20.892843 9.365298-20.892843 20.892843l0 248.508887c0 0-2.520403 42.010813 41.786709 41.785685L731.994971 566.311976c0.068562 0 0.156566 0.045025 0.228197 0.045025 11.546987 0 20.914332-9.364275 20.914332-20.891819s-9.367345-20.892843-20.892843-20.938891L506.79086 524.526291 506.79086 276.153504C506.79086 276.108478 506.813373 276.06243 506.813373 276.017404z"
              p-id="2656" fill="#8a8a8a"></path>
          </svg></i>
        <span style="padding-left: 5px">数据更新于：{{ time }}</span>
      </div>
      <div class="r-con">
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="近一小时"></el-radio-button>
          <el-radio-button label="今日"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="main">
      <div class="box-card">
        <el-card body-style="padding:0">
          <div class="box-title">JS异常</div>
          <!-- <div class="statistics">
            <span></span>
            <span class="contrast"></span>
          </div> -->
          <div id="jsEcharts" style="height: 210px; width: 100%"></div>
        </el-card>
      </div>
      <div class="box-card">
        <el-card body-style="padding:0">
          <div class="box-title">Api成功率</div>
          <!-- <div class="statistics">
            <span></span>
            <span class="contrast"></span>
          </div> -->
          <div id="apiEcharts" style="height: 210px; width: 100%"></div>
        </el-card>
      </div>
      <div class="box-card">
        <el-card body-style="padding:0">
          <div class="box-title">页面性能</div>
          <!-- <div class="statistics">
            <span></span>
            <span class="contrast"></span>
          </div> -->
          <div id="perfEcharts" style="height: 210px; width: 100%"></div>
        </el-card>
      </div>
      <div class="box-card">
        <el-card body-style="padding:0">
          <div class="box-title">白屏异常</div>
          <div id="blankEcharts" style="height: 210px; width: 100%"></div>
        </el-card>
      </div>
      <div class="box-card">
        <el-card body-style="padding:0">
          <div class="box-title">资源异常</div>
          <div id="sourEcharts" style="height: 210px; width: 100%"></div>
        </el-card>
      </div>
      <div class="box-card">
        <el-card body-style="padding:0">
          <div class="box-title">页面访问</div>
          <div id="pvuvEcharts" style="height: 210px; width: 100%"></div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getCurrentTime,
  getCurrentMinute,
  getLastHour,
} from "@/comfunciton/index";
import { test } from "@/api/home";
import * as echarts from "echarts";
export default {
  name: "",
  components: {},
  data() {
    return {
      radio1: "近一小时",
      time: "",
      start: "",
      end: "",
    };
  },
  watch: {},
  methods: {
    initTime() {
      this.start = getCurrentMinute();
      this.end = getLastHour(this.start);
    },
    initData() { },
  },
  created() {
    this.initTime();
    this.time = getCurrentTime();
  },
  mounted() {
    let temp1 = {
      logType: "jserror",
      kind: "stability",
      from: "2022-8-4 00:00:00",
      to: "2022-8-20 00:00:00",
      indicatorList: "['jserror','uv','pv','pv_percent','uv_percent']",
      timeInterval: 60
    };
    let temp2 = {
      logType: "api",
      kind: "stability",
      from: "2022-8-4 00:00:00",
      to: "2022-8-20 00:00:00",
      indicatorList: "['jserror']",
      timeInterval: 60,
    };
    let temp3 = {
      logType: "perf",
      kind: "stability",
      from: "2022-8-4 00:00:00",
      to: "2022-8-20 00:00:00",
      indicatorList: "['perf']",
      timeInterval: 60,
    };
    let temp4 = {
      logType: "blank",
      kind: "stability",
      from: "2022-8-4 00:00:00",
      to: "2022-8-20 00:00:00",
      indicatorList: "['blank']",
      timeInterval: 60,
    };
    let temp5 = {
      logType: "resloadfail",
      kind: "stability",
      from: "2022-8-4 00:00:00",
      to: "2022-8-20 00:00:00",
      indicatorList: "['resloadfail']",
      timeInterval: 60,
    };
    let temp6 = {
      logType: "pvuv",
      kind: "stability",
      from: "2022-8-4 00:00:00",
      to: "2022-8-20 00:00:00",
      indicatorList: "['pvuv','uv']",
      timeInterval: 60,
    };
    test(JSON.stringify(temp1)).then((res) => {
      console.log(res.data);
    });
    test(JSON.stringify(temp2)).then((res) => {
      console.log(res.data);
    });
    test(JSON.stringify(temp3)).then((res) => {
      console.log(res.data);
    });
    test(JSON.stringify(temp4)).then((res) => {
      console.log(res.data);
    });
    test(JSON.stringify(temp5)).then((res) => {
      console.log(res.data);
    });
    test(JSON.stringify(temp6)).then((res) => {
      console.log(res.data);
    });
    var jserror_echarts = echarts.init(document.getElementById("jsEcharts"));
    var jserror_option = {
      grid: {
        left: "1%", //默认10%
        right: "1%", //默认10%
        bottom: "2%", //默认60
        top: "10%",
        containLabel: true,
        //grid区域是否包含坐标轴的刻度标签
      },
      tooltip: {
        trigger: "axis",
        formatter: function (params, ticket, callback) {
          let time = new Date(params[0].axisValue); //时间戳转换时间
          let lable = `${("0" + (time.getMonth() + 1)).slice(-2)}-${(
            "0" + time.getDay()
          ).slice(-2)} ${("0" + time.getHours()).slice(-2)}:${(
            "0" + time.getMinutes()
          ).slice(-2)}`;
          let res =
            "<span>" +
            lable +
            "</span><br/>" +
            params[0].marker +
            params[0].seriesName +
            '：<span style="float:right;font-weight:600">' +
            params[0].value.js_error +
            "</span><br/>";
          return res;
        },
        backgroundColor: "rgba(40,42,54, 0.7)",
        borderColor: "rgba(40,42,54,0.5)",
        textStyle: {
          color: "#fff",
        },
      },
      xAxis: {
        type: "time",
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: "value",
        //刻度居中
      },
      dataset: {
        source: [
          { js_error: 12, key: "2022-08-11 15:36:00" },
          { js_error: 10, key: "2022-08-11 15:37:00" },
          { js_error: 22, key: "2022-08-11 15:36:00" },
          { js_error: 15, key: "2022-08-11 15:38:00" },
          { js_error: 8, key: "2022-08-11 15:39:00" },
          { js_error: 4, key: "2022-08-11 15:40:00" },
          { js_error: 2, key: "2022-08-11 15:41:00" },
          { js_error: 12, key: "2022-08-11 15:42:00" },
          { js_error: 15, key: "2022-08-11 15:43:00" },
          { js_error: 17, key: "2022-08-11 15:44:00" },
          { js_error: 14, key: "2022-08-11 15:45:00" },
          { js_error: 10, key: "2022-08-11 15:46:00" },
          { js_error: 12, key: "2022-08-11 15:47:00" },
          { js_error: 10, key: "2022-08-11 15:48:00" },
          { js_error: 22, key: "2022-08-11 15:49:00" },
          { js_error: 15, key: "2022-08-11 15:50:00" },
          { js_error: 8, key: "2022-08-11 15:51:00" },
          { js_error: 4, key: "2022-08-11 15:52:00" },
          { js_error: 2, key: "2022-08-11 15:53:00" },
          { js_error: 12, key: "2022-08-11 15:54:00" },
          { js_error: 15, key: "2022-08-11 15:55:00" },
          { js_error: 17, key: "2022-08-11 15:56:00" },
          { js_error: 14, key: "2022-08-11 15:57:00" },
          { js_error: 10, key: "2022-08-11 15:58:00" },
          { js_error: 12, key: "2022-08-11 15:59:00" },
          { js_error: 10, key: "2022-08-11 16:00:00" },
          { js_error: 22, key: "2022-08-11 16:01:00" },
          { js_error: 15, key: "2022-08-11 16:02:00" },
          { js_error: 8, key: "2022-08-11 16:03:00" },
          { js_error: 4, key: "2022-08-11 16:04:00" },
          { js_error: 2, key: "2022-08-11 16:05:00" },
          { js_error: 12, key: "2022-08-11 16:06:00" },
          { js_error: 15, key: "2022-08-11 16:07:00" },
          { js_error: 17, key: "2022-08-11 16:08:00" },
          { js_error: 14, key: "2022-08-11 16:09:00" },
          { js_error: 10, key: "2022-08-11 16:10:00" },
          { js_error: 12, key: "2022-08-11 16:11:00" },
          { js_error: 10, key: "2022-08-11 16:12:00" },
          { js_error: 22, key: "2022-08-11 16:13:00" },
          { js_error: 15, key: "2022-08-11 16:14:00" },
          { js_error: 8, key: "2022-08-11 16:15:00" },
          { js_error: 4, key: "2022-08-11 16:16:00" },
          { js_error: 2, key: "2022-08-11 16:17:00" },
          { js_error: 12, key: "2022-08-11 16:18:00" },
          { js_error: 15, key: "2022-08-11 16:19:00" },
          { js_error: 17, key: "2022-08-11 16:20:00" },
          { js_error: 14, key: "2022-08-11 16:21:00" },
          { js_error: 10, key: "2022-08-11 16:22:00" },
          { js_error: 12, key: "2022-08-11 16:23:00" },
          { js_error: 10, key: "2022-08-11 16:24:00" },
          { js_error: 22, key: "2022-08-11 16:25:00" },
          { js_error: 15, key: "2022-08-11 16:26:00" },
          { js_error: 8, key: "2022-08-11 16:27:00" },
          { js_error: 4, key: "2022-08-11 16:28:00" },
          { js_error: 2, key: "2022-08-11 16:29:00" },
          { js_error: 12, key: "2022-08-11 16:30:00" },
          { js_error: 15, key: "2022-08-11 16:31:00" },
          { js_error: 17, key: "2022-08-11 16:32:00" },
          { js_error: 14, key: "2022-08-11 16:33:00" },
          { js_error: 10, key: "2022-08-11 16:34:00" },
          { js_error: 12, key: "2022-08-11 16:35:00" },
          { js_error: 10, key: "2022-08-11 16:36:00" },
          { js_error: 22, key: "2022-08-11 16:37:00" },
          { js_error: 15, key: "2022-08-11 16:38:00" },
          { js_error: 8, key: "2022-08-11 16:39:00" },
          { js_error: 4, key: "2022-08-11 16:40:00" },
          { js_error: 2, key: "2022-08-11 16:41:00" },
          { js_error: 12, key: "2022-08-11 16:42:00" },
          { js_error: 15, key: "2022-08-11 16:43:00" },
          { js_error: 17, key: "2022-08-11 16:44:00" },
          { js_error: 14, key: "2022-08-11 16:45:00" },
          { js_error: 10, key: "2022-08-11 16:46:00" },
        ],
      },
      series: {
        name: "JS异常",
        type: "bar",
        encode: {
          x: "key",
          y: "js_error",
        },
      },
    };
    jserror_echarts.setOption(jserror_option);
    var api_echarts = echarts.init(document.getElementById("apiEcharts"));
    var api_option = {
      grid: {
        left: "1%", //默认10%
        right: "1%", //默认10%
        bottom: "2%", //默认60
        top: "10%",
        containLabel: true,
        //grid区域是否包含坐标轴的刻度标签
      },
      tooltip: {
        trigger: "axis",
        formatter: function (params, ticket, callback) {
          let time = new Date(params[0].axisValue); //时间戳转换时间
          let lable = `${("0" + (time.getMonth() + 1)).slice(-2)}-${(
            "0" + time.getDay()
          ).slice(-2)} ${("0" + time.getHours()).slice(-2)}:${(
            "0" + time.getMinutes()
          ).slice(-2)}`;
          let value = (params[0].value.succRate * 100).toFixed(2) + "%";
          let res =
            "<span>" +
            lable +
            "</span><br/>" +
            params[0].marker +
            params[0].seriesName +
            '：<span style="float:right;font-weight:600">' +
            value +
            "</span><br/>";
          return res;
        },
        backgroundColor: "rgba(40,42,54, 0.7)",
        borderColor: "rgba(40,42,54,0.5)",
        textStyle: {
          color: "#fff",
        },
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
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: function (val) {
            return val * 100 + "%";
          },
        },
      },
      dataset: {
        source: [
          { succRate: 0.14145002669321038, key: "2022-8-4 21:38:00" },
          { succRate: 0.26325489617880193, key: "2022-8-4 21:39:00" },
          { succRate: 0.5142059200160358, key: "2022-8-4 21:40:00" },
          { succRate: 0.9969506561721722, key: "2022-8-4 21:41:00" },
          { succRate: 0.6110415314176265, key: "2022-8-4 21:42:00" },
          { succRate: 0.6792145737930444, key: "2022-8-4 21:43:00" },
          { succRate: 0.5954372481842105, key: "2022-8-4 21:44:00" },
          { succRate: 0.8719065090313902, key: "2022-8-4 21:45:00" },
          { succRate: 0.40963234730288356, key: "2022-8-4 21:46:00" },
          { succRate: 0.993096147582484, key: "2022-8-4 21:47:00" },
          { succRate: 0.27960369803342733, key: "2022-8-4 21:48:00" },
          { succRate: 0.4797171072013273, key: "2022-8-4 21:49:00" },
          { succRate: 0.4934927537382383, key: "2022-8-4 21:50:00" },
          { succRate: 0.43677644957575623, key: "2022-8-4 21:51:00" },
          { succRate: 0.9222177255785726, key: "2022-8-4 21:52:00" },
          { succRate: 0.37989531575011304, key: "2022-8-4 21:53:00" },
          { succRate: 0.3435865466666088, key: "2022-8-4 21:54:00" },
          { succRate: 0.8472785867392991, key: "2022-8-4 21:55:00" },
          { succRate: 0.6722366972926861, key: "2022-8-4 21:56:00" },
          { succRate: 0.3263518994126393, key: "2022-8-4 21:57:00" },
          { succRate: 0.6016647096743462, key: "2022-8-4 21:58:00" },
          { succRate: 0.12960993155689726, key: "2022-8-4 21:59:00" },
          { succRate: 0.7342549566252536, key: "2022-8-4 21:60:00" },
          { succRate: 0.8045199323159282, key: "2022-8-4 21:61:00" },
          { succRate: 0.9266393907403245, key: "2022-8-4 21:62:00" },
          { succRate: 0.8909421883761317, key: "2022-8-4 21:63:00" },
          { succRate: 0.9899815266319221, key: "2022-8-4 21:64:00" },
          { succRate: 0.10728836155050825, key: "2022-8-4 21:65:00" },
          { succRate: 0.8404308786814774, key: "2022-8-4 21:66:00" },
          { succRate: 0.02504739641311393, key: "2022-8-4 21:67:00" },
          { succRate: 0.8684243034196959, key: "2022-8-4 21:68:00" },
          { succRate: 0.5494028723865727, key: "2022-8-4 21:69:00" },
          { succRate: 0.8796057346505288, key: "2022-8-4 21:70:00" },
          { succRate: 0.12106221330331701, key: "2022-8-4 21:71:00" },
          { succRate: 0.3144816976593545, key: "2022-8-4 21:72:00" },
          { succRate: 0.800704301580279, key: "2022-8-4 21:73:00" },
          { succRate: 0.06815845381368946, key: "2022-8-4 21:74:00" },
          { succRate: 0.3871451311638312, key: "2022-8-4 21:75:00" },
          { succRate: 0.8484572970144348, key: "2022-8-4 21:76:00" },
          { succRate: 0.32321952682344235, key: "2022-8-4 21:77:00" },
          { succRate: 0.7018784546034391, key: "2022-8-4 21:78:00" },
          { succRate: 0.7565356645444528, key: "2022-8-4 21:79:00" },
          { succRate: 0.9307779801407763, key: "2022-8-4 21:80:00" },
          { succRate: 0.2766654981401073, key: "2022-8-4 21:81:00" },
          { succRate: 0.689565550572194, key: "2022-8-4 21:82:00" },
          { succRate: 0.5680344585527817, key: "2022-8-4 21:83:00" },
          { succRate: 0.692505546216019, key: "2022-8-4 21:84:00" },
          { succRate: 0.18209017009912842, key: "2022-8-4 21:85:00" },
          { succRate: 0.31528494478642166, key: "2022-8-4 21:86:00" },
          { succRate: 0.05752294537177516, key: "2022-8-4 21:87:00" },
          { succRate: 0.6403191079817638, key: "2022-8-4 21:88:00" },
          { succRate: 0.7941319225907173, key: "2022-8-4 21:89:00" },
          { succRate: 0.8734349865673197, key: "2022-8-4 21:90:00" },
          { succRate: 0.2946635930462467, key: "2022-8-4 21:91:00" },
          { succRate: 0.7743780998490812, key: "2022-8-4 21:92:00" },
          { succRate: 0.9141003374544019, key: "2022-8-4 21:93:00" },
          { succRate: 0.770878662077888, key: "2022-8-4 21:94:00" },
          { succRate: 0.373035840758166, key: "2022-8-4 21:95:00" },
          { succRate: 0.8047066126710447, key: "2022-8-4 21:96:00" },
          { succRate: 0.07421821519115035, key: "2022-8-4 21:97:00" },
        ],
      },
      series: {
        name: "api成功率",
        type: "line",
        smooth: true,
        symbol: "none",
        areaStyle: {},
        encode: {
          x: "key",
          y: "succRate",
        },
      },
    };
    api_echarts.setOption(api_option);
    var perf_echarts = echarts.init(document.getElementById("perfEcharts"));
    var perf_option = {
      grid: {
        left: "1%", //默认10%
        right: "1%", //默认10%
        bottom: "2%", //默认60
        top: "10%",
        containLabel: true,
        //grid区域是否包含坐标轴的刻度标签
      },
      tooltip: {
        trigger: "axis",
        formatter: function (params, ticket, callback) {
          let time = new Date(params[0].axisValue); //时间戳转换时间
          let lable = `${("0" + (time.getMonth() + 1)).slice(-2)}-${(
            "0" + time.getDay()
          ).slice(-2)} ${("0" + time.getHours()).slice(-2)}:${(
            "0" + time.getMinutes()
          ).slice(-2)}`;
          let res =
            "<span>" +
            lable +
            "</span><br/>" +
            params[0].marker +
            params[0].seriesName +
            '：<span style="float:right;font-weight:600">' +
            params[0].value.t +
            "ms" +
            "</span><br/>";
          return res;
        },
        backgroundColor: "rgba(40,42,54, 0.7)",
        borderColor: "rgba(40,42,54,0.5)",
        textStyle: {
          color: "#fff",
        },
      },
      xAxis: {
        type: "time",
        boundaryGap: false,
        axisLabel: {
          showMinLable: "true",
          showMaxLable: "true",
          hideOverlap: "true",
        },
      },
      yAxis: {
        type: "value",
      },
      dataset: {
        source: [
          { t: 44, key: "2022-8-4 23:13:00" },
          { t: 842, key: "2022-8-4 23:14:00" },
          { t: 4087, key: "2022-8-4 23:15:00" },
          { t: 391, key: "2022-8-4 23:16:00" },
          { t: 3455, key: "2022-8-4 23:17:00" },
          { t: 3979, key: "2022-8-4 23:18:00" },
          { t: 3105, key: "2022-8-4 23:19:00" },
          { t: 1664, key: "2022-8-4 23:20:00" },
          { t: 4903, key: "2022-8-4 23:21:00" },
          { t: 4754, key: "2022-8-4 23:22:00" },
          { t: 814, key: "2022-8-4 23:23:00" },
          { t: 3960, key: "2022-8-4 23:24:00" },
          { t: 3539, key: "2022-8-4 23:25:00" },
          { t: 3298, key: "2022-8-4 23:26:00" },
          { t: 2982, key: "2022-8-4 23:27:00" },
          { t: 611, key: "2022-8-4 23:28:00" },
          { t: 3292, key: "2022-8-4 23:29:00" },
          { t: 4100, key: "2022-8-4 23:30:00" },
          { t: 1788, key: "2022-8-4 23:31:00" },
          { t: 4953, key: "2022-8-4 23:32:00" },
          { t: 2152, key: "2022-8-4 23:33:00" },
          { t: 1231, key: "2022-8-4 23:34:00" },
          { t: 1168, key: "2022-8-4 23:35:00" },
          { t: 2916, key: "2022-8-4 23:36:00" },
          { t: 2664, key: "2022-8-4 23:37:00" },
          { t: 2704, key: "2022-8-4 23:38:00" },
          { t: 3412, key: "2022-8-4 23:39:00" },
          { t: 144, key: "2022-8-4 23:40:00" },
          { t: 2396, key: "2022-8-4 23:41:00" },
          { t: 4951, key: "2022-8-4 23:42:00" },
          { t: 2903, key: "2022-8-4 23:43:00" },
          { t: 441, key: "2022-8-4 23:44:00" },
          { t: 4889, key: "2022-8-4 23:45:00" },
          { t: 496, key: "2022-8-4 23:46:00" },
          { t: 357, key: "2022-8-4 23:47:00" },
          { t: 450, key: "2022-8-4 23:48:00" },
          { t: 1142, key: "2022-8-4 23:49:00" },
          { t: 403, key: "2022-8-4 23:50:00" },
          { t: 1830, key: "2022-8-4 23:51:00" },
          { t: 1588, key: "2022-8-4 23:52:00" },
          { t: 4169, key: "2022-8-4 23:53:00" },
          { t: 3477, key: "2022-8-4 23:54:00" },
          { t: 2328, key: "2022-8-4 23:55:00" },
          { t: 1126, key: "2022-8-4 23:56:00" },
          { t: 4906, key: "2022-8-4 23:57:00" },
          { t: 1243, key: "2022-8-4 23:58:00" },
          { t: 3699, key: "2022-8-4 23:59:00" },
          { t: 3923, key: "2022-8-5 00:00:00" },
          { t: 2425, key: "2022-8-5 00:01:00" },
          { t: 1731, key: "2022-8-5 00:02:00" },
          { t: 4978, key: "2022-8-5 00:03:00" },
          { t: 4849, key: "2022-8-5 00:04:00" },
          { t: 190, key: "2022-8-5 00:05:00" },
          { t: 1867, key: "2022-8-5 00:06:00" },
          { t: 27, key: "2022-8-5 00:07:00" },
          { t: 1309, key: "2022-8-5 00:08:00" },
          { t: 2492, key: "2022-8-5 00:09:00" },
          { t: 615, key: "2022-8-5 00:10:00" },
          { t: 1114, key: "2022-8-5 00:11:00" },
          { t: 3447, key: "2022-8-5 00:12:00" },
        ],
      },
      series: {
        name: "页面完全加载时间",
        type: "line",
        smooth: true,
        symbol: "none",
        areaStyle: {},
        encode: {
          x: "key",
          y: "t",
        },
      },
    };
    perf_echarts.setOption(perf_option);
    var blank_echarts = echarts.init(document.getElementById("blankEcharts"));
    var blank_option = {
      grid: {
        left: "1%", //默认10%
        right: "1%", //默认10%
        bottom: "2%", //默认60
        top: "10%",
        containLabel: true,
        //grid区域是否包含坐标轴的刻度标签
      },
      tooltip: {
        trigger: "axis",
        formatter: function (params, ticket, callback) {
          let time = new Date(params[0].axisValue); //时间戳转换时间
          let lable = `${("0" + (time.getMonth() + 1)).slice(-2)}-${(
            "0" + time.getDay()
          ).slice(-2)} ${("0" + time.getHours()).slice(-2)}:${(
            "0" + time.getMinutes()
          ).slice(-2)}`;
          let value = (params[0].value.blankRate * 100).toFixed(2) + "%";
          let res =
            "<span>" +
            lable +
            "</span><br/>" +
            params[0].marker +
            params[0].seriesName +
            '：<span style="float:right;font-weight:600">' +
            value +
            "</span><br/>";
          return res;
        },
        backgroundColor: "rgba(40,42,54, 0.7)",
        borderColor: "rgba(40,42,54,0.5)",
        textStyle: {
          color: "#fff",
        },
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
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: function (val) {
            return val * 100 + "%";
          },
        },
      },
      dataset: {
        source: [
          { blankRate: 0.35610798235869456, key: "2022-8-11 23:53:00" },
          { blankRate: 0.8589236153476931, key: "2022-8-11 23:54:00" },
          { blankRate: 0.25394746744402386, key: "2022-8-11 23:55:00" },
          { blankRate: 0.6257685696815227, key: "2022-8-11 23:56:00" },
          { blankRate: 0.5533895998276932, key: "2022-8-11 23:57:00" },
          { blankRate: 0.45036797170889264, key: "2022-8-11 23:58:00" },
          { blankRate: 0.8282348117335043, key: "2022-8-11 23:59:00" },
          { blankRate: 0.5018279735158813, key: "2022-8-12 00:00:00" },
          { blankRate: 0.8631704489387819, key: "2022-8-12 00:01:00" },
          { blankRate: 0.966245135213345, key: "2022-8-12 00:02:00" },
          { blankRate: 0.3942345750109637, key: "2022-8-12 00:03:00" },
          { blankRate: 0.6608730827463949, key: "2022-8-12 00:04:00" },
          { blankRate: 0.7589396310719125, key: "2022-8-12 00:05:00" },
          { blankRate: 0.4744790876582654, key: "2022-8-12 00:06:00" },
          { blankRate: 0.7463015337478658, key: "2022-8-12 00:07:00" },
          { blankRate: 0.3679959291156367, key: "2022-8-12 00:08:00" },
          { blankRate: 0.1655500882050669, key: "2022-8-12 00:09:00" },
          { blankRate: 0.21396890402517954, key: "2022-8-12 00:10:00" },
          { blankRate: 0.7204418949717706, key: "2022-8-12 00:11:00" },
          { blankRate: 0.09315223686439467, key: "2022-8-12 00:12:00" },
          { blankRate: 0.22140796067893498, key: "2022-8-12 00:13:00" },
          { blankRate: 0.37005346352298774, key: "2022-8-12 00:14:00" },
          { blankRate: 0.8637073911054189, key: "2022-8-12 00:15:00" },
          { blankRate: 0.2664416765728388, key: "2022-8-12 00:16:00" },
          { blankRate: 0.21387561407511502, key: "2022-8-12 00:17:00" },
          { blankRate: 0.8817994088324959, key: "2022-8-12 00:18:00" },
          { blankRate: 0.7254058638524095, key: "2022-8-12 00:19:00" },
          { blankRate: 0.4731952106428108, key: "2022-8-12 00:20:00" },
          { blankRate: 0.5966606550678113, key: "2022-8-12 00:21:00" },
          { blankRate: 0.2820460394319275, key: "2022-8-12 00:22:00" },
          { blankRate: 0.6871663925132998, key: "2022-8-12 00:23:00" },
          { blankRate: 0.8426215874068677, key: "2022-8-12 00:24:00" },
          { blankRate: 0.8887084256247682, key: "2022-8-12 00:25:00" },
          { blankRate: 0.7142202271558094, key: "2022-8-12 00:26:00" },
          { blankRate: 0.44365324302304265, key: "2022-8-12 00:27:00" },
          { blankRate: 0.5991654834486602, key: "2022-8-12 00:28:00" },
          { blankRate: 0.004050125354662759, key: "2022-8-12 00:29:00" },
          { blankRate: 0.18902083115314405, key: "2022-8-12 00:30:00" },
          { blankRate: 0.447947772115034, key: "2022-8-12 00:31:00" },
          { blankRate: 0.5718772190915973, key: "2022-8-12 00:32:00" },
          { blankRate: 0.8639312078609513, key: "2022-8-12 00:33:00" },
          { blankRate: 0.617009618654975, key: "2022-8-12 00:34:00" },
          { blankRate: 0.37371374641472, key: "2022-8-12 00:35:00" },
          { blankRate: 0.5200445984922208, key: "2022-8-12 00:36:00" },
          { blankRate: 0.21418391744143173, key: "2022-8-12 00:37:00" },
          { blankRate: 0.762834005400082, key: "2022-8-12 00:38:00" },
          { blankRate: 0.6493554504732328, key: "2022-8-12 00:39:00" },
          { blankRate: 0.7015316294903149, key: "2022-8-12 00:40:00" },
          { blankRate: 0.6795295143348632, key: "2022-8-12 00:41:00" },
          { blankRate: 0.703341921056666, key: "2022-8-12 00:42:00" },
          { blankRate: 0.5453185524718394, key: "2022-8-12 00:43:00" },
          { blankRate: 0.5103894161278992, key: "2022-8-12 00:44:00" },
          { blankRate: 0.15584041868750886, key: "2022-8-12 00:45:00" },
          { blankRate: 0.8305030399174271, key: "2022-8-12 00:46:00" },
          { blankRate: 0.5140847493412921, key: "2022-8-12 00:47:00" },
          { blankRate: 0.40968611830940804, key: "2022-8-12 00:48:00" },
          { blankRate: 0.3395486760835116, key: "2022-8-12 00:49:00" },
          { blankRate: 0.6219783579954261, key: "2022-8-12 00:50:00" },
          { blankRate: 0.1806628591928019, key: "2022-8-12 00:51:00" },
          { blankRate: 0.6039251292179153, key: "2022-8-12 00:52:00" },
        ],
      },
      series: {
        name: "异常率",
        type: "line",
        smooth: true,
        symbol: "none",
        areaStyle: {},
        encode: {
          x: "key",
          y: "blankRate",
        },
      },
    };
    blank_echarts.setOption(blank_option);
    var source_echarts = echarts.init(document.getElementById("sourEcharts"));
    var source_option = {
      grid: {
        left: "1%", //默认10%
        right: "1%", //默认10%
        bottom: "2%", //默认60
        top: "10%",
        containLabel: true,
        //grid区域是否包含坐标轴的刻度标签
      },
      tooltip: {
        trigger: "axis",
        formatter: function (params, ticket, callback) {
          let time = new Date(params[0].axisValue); //时间戳转换时间
          let lable = `${("0" + (time.getMonth() + 1)).slice(-2)}-${(
            "0" + time.getDay()
          ).slice(-2)} ${("0" + time.getHours()).slice(-2)}:${(
            "0" + time.getMinutes()
          ).slice(-2)}`;
          let res =
            "<span>" +
            lable +
            "</span><br/>" +
            params[0].marker +
            params[0].seriesName +
            '：<span style="float:right;font-weight:600">' +
            params[0].value.resloadfail +
            "</span><br/>";
          return res;
        },
        backgroundColor: "rgba(40,42,54, 0.7)",
        borderColor: "rgba(40,42,54,0.5)",
        textStyle: {
          color: "#fff",
        },
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
      yAxis: {
        type: "value",
        //刻度居中
      },
      dataset: {
        source: [
          { resloadfail: 6, key: "2022-8-12 0:11:00" },
          { resloadfail: 19, key: "2022-8-12 0:12:00" },
          { resloadfail: 17, key: "2022-8-12 0:13:00" },
          { resloadfail: 8, key: "2022-8-12 0:14:00" },
          { resloadfail: 16, key: "2022-8-12 0:15:00" },
          { resloadfail: 12, key: "2022-8-12 0:16:00" },
          { resloadfail: 6, key: "2022-8-12 0:17:00" },
          { resloadfail: 11, key: "2022-8-12 0:18:00" },
          { resloadfail: 13, key: "2022-8-12 0:19:00" },
          { resloadfail: 10, key: "2022-8-12 0:20:00" },
          { resloadfail: 15, key: "2022-8-12 0:21:00" },
          { resloadfail: 10, key: "2022-8-12 0:22:00" },
          { resloadfail: 13, key: "2022-8-12 0:23:00" },
          { resloadfail: 15, key: "2022-8-12 0:24:00" },
          { resloadfail: 17, key: "2022-8-12 0:25:00" },
          { resloadfail: 18, key: "2022-8-12 0:26:00" },
          { resloadfail: 9, key: "2022-8-12 0:27:00" },
          { resloadfail: 16, key: "2022-8-12 0:28:00" },
          { resloadfail: 9, key: "2022-8-12 0:29:00" },
          { resloadfail: 16, key: "2022-8-12 0:30:00" },
          { resloadfail: 9, key: "2022-8-12 0:31:00" },
          { resloadfail: 13, key: "2022-8-12 0:32:00" },
          { resloadfail: 17, key: "2022-8-12 0:33:00" },
          { resloadfail: 12, key: "2022-8-12 0:34:00" },
          { resloadfail: 19, key: "2022-8-12 0:35:00" },
          { resloadfail: 17, key: "2022-8-12 0:36:00" },
          { resloadfail: 7, key: "2022-8-12 0:37:00" },
          { resloadfail: 15, key: "2022-8-12 0:38:00" },
          { resloadfail: 16, key: "2022-8-12 0:39:00" },
          { resloadfail: 19, key: "2022-8-12 0:40:00" },
          { resloadfail: 12, key: "2022-8-12 0:41:00" },
          { resloadfail: 15, key: "2022-8-12 0:42:00" },
          { resloadfail: 6, key: "2022-8-12 0:43:00" },
          { resloadfail: 7, key: "2022-8-12 0:44:00" },
          { resloadfail: 7, key: "2022-8-12 0:45:00" },
          { resloadfail: 11, key: "2022-8-12 0:46:00" },
          { resloadfail: 8, key: "2022-8-12 0:47:00" },
          { resloadfail: 15, key: "2022-8-12 0:48:00" },
          { resloadfail: 10, key: "2022-8-12 0:49:00" },
          { resloadfail: 19, key: "2022-8-12 0:50:00" },
          { resloadfail: 16, key: "2022-8-12 0:51:00" },
          { resloadfail: 19, key: "2022-8-12 0:52:00" },
          { resloadfail: 8, key: "2022-8-12 0:53:00" },
          { resloadfail: 19, key: "2022-8-12 0:54:00" },
          { resloadfail: 13, key: "2022-8-12 0:55:00" },
          { resloadfail: 10, key: "2022-8-12 0:56:00" },
          { resloadfail: 13, key: "2022-8-12 0:57:00" },
          { resloadfail: 7, key: "2022-8-12 0:58:00" },
          { resloadfail: 6, key: "2022-8-12 0:59:00" },
          { resloadfail: 14, key: "2022-8-12 01:00:00" },
          { resloadfail: 18, key: "2022-8-12 01:01:00" },
          { resloadfail: 19, key: "2022-8-12 01:02:00" },
          { resloadfail: 12, key: "2022-8-12 01:03:00" },
          { resloadfail: 18, key: "2022-8-12 01:04:00" },
          { resloadfail: 17, key: "2022-8-12 01:05:00" },
          { resloadfail: 12, key: "2022-8-12 01:06:00" },
          { resloadfail: 11, key: "2022-8-12 01:07:00" },
          { resloadfail: 16, key: "2022-8-12 01:08:00" },
          { resloadfail: 18, key: "2022-8-12 01:09:00" },
          { resloadfail: 18, key: "2022-8-12 01:10:00" },
        ],
      },
      series: {
        name: "资源加载异常",
        type: "bar",
        encode: {
          x: "key",
          y: "resloadfail",
        },
      },
    };
    source_echarts.setOption(source_option);
    var pvuv_echarts = echarts.init(document.getElementById("pvuvEcharts"));
    var pvuv_option = {
      grid: {
        left: "1%", //默认10%
        right: "1%", //默认10%
        bottom: "2%", //默认60
        top: "10%",
        containLabel: true,
        //grid区域是否包含坐标轴的刻度标签
      },
      tooltip: {
        trigger: "axis",
        formatter: function (params, ticket, callback) {
          let time = new Date(params[0].axisValue); //时间戳转换时间
          let lable = `${("0" + (time.getMonth() + 1)).slice(-2)}-${(
            "0" + time.getDay()
          ).slice(-2)} ${("0" + time.getHours()).slice(-2)}:${(
            "0" + time.getMinutes()
          ).slice(-2)}`;
          let res =
            "<span>" +
            lable +
            "</span><br/>" +
            params[0].marker +
            params[0].seriesName +
            '：<span style="float:right;font-weight:600">' +
            params[0].value.pv +
            "</span><br/>" +
            params[1].marker +
            params[1].seriesName +
            '：<span style="float:right;font-weight:600">' +
            params[1].value.uv +
            "</span><br/>";

          return res;
        },
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
      yAxis: {
        type: "value",
      },
      dataset: {
        source: [
          { pv: 15, uv: 15, key: "2022-8-12 0:45:00" },
          { pv: 12, uv: 9, key: "2022-8-12 0:46:00" },
          { pv: 12, uv: 10, key: "2022-8-12 0:47:00" },
          { pv: 10, uv: 5, key: "2022-8-12 0:48:00" },
          { pv: 11, uv: 7, key: "2022-8-12 0:49:00" },
          { pv: 6, uv: 3, key: "2022-8-12 0:50:00" },
          { pv: 8, uv: 4, key: "2022-8-12 0:51:00" },
          { pv: 18, uv: 14, key: "2022-8-12 0:52:00" },
          { pv: 7, uv: 2, key: "2022-8-12 0:53:00" },
          { pv: 14, uv: 11, key: "2022-8-12 0:54:00" },
          { pv: 9, uv: 5, key: "2022-8-12 0:55:00" },
          { pv: 20, uv: 19, key: "2022-8-12 0:56:00" },
          { pv: 12, uv: 7, key: "2022-8-12 0:57:00" },
          { pv: 16, uv: 15, key: "2022-8-12 0:58:00" },
          { pv: 8, uv: 6, key: "2022-8-12 0:59:00" },
          { pv: 16, uv: 15, key: "2022-8-12 1:0:00" },
          { pv: 19, uv: 16, key: "2022-8-12 1:1:00" },
          { pv: 7, uv: 5, key: "2022-8-12 1:2:00" },
          { pv: 17, uv: 14, key: "2022-8-12 1:3:00" },
          { pv: 5, uv: 3, key: "2022-8-12 1:4:00" },
          { pv: 12, uv: 10, key: "2022-8-12 1:5:00" },
          { pv: 13, uv: 10, key: "2022-8-12 1:6:00" },
          { pv: 6, uv: 4, key: "2022-8-12 1:7:00" },
          { pv: 14, uv: 11, key: "2022-8-12 1:8:00" },
          { pv: 7, uv: 5, key: "2022-8-12 1:9:00" },
          { pv: 10, uv: 9, key: "2022-8-12 1:10:00" },
          { pv: 14, uv: 13, key: "2022-8-12 1:11:00" },
          { pv: 6, uv: 2, key: "2022-8-12 1:12:00" },
          { pv: 10, uv: 7, key: "2022-8-12 1:13:00" },
          { pv: 20, uv: 18, key: "2022-8-12 1:14:00" },
          { pv: 12, uv: 12, key: "2022-8-12 1:15:00" },
          { pv: 17, uv: 16, key: "2022-8-12 1:16:00" },
          { pv: 17, uv: 15, key: "2022-8-12 1:17:00" },
          { pv: 10, uv: 6, key: "2022-8-12 1:18:00" },
          { pv: 12, uv: 10, key: "2022-8-12 1:19:00" },
          { pv: 17, uv: 16, key: "2022-8-12 1:20:00" },
          { pv: 16, uv: 16, key: "2022-8-12 1:21:00" },
          { pv: 18, uv: 14, key: "2022-8-12 1:22:00" },
          { pv: 13, uv: 12, key: "2022-8-12 1:23:00" },
          { pv: 12, uv: 9, key: "2022-8-12 1:24:00" },
          { pv: 8, uv: 5, key: "2022-8-12 1:25:00" },
          { pv: 6, uv: 2, key: "2022-8-12 1:26:00" },
          { pv: 11, uv: 9, key: "2022-8-12 1:27:00" },
          { pv: 7, uv: 5, key: "2022-8-12 1:28:00" },
          { pv: 6, uv: 5, key: "2022-8-12 1:29:00" },
          { pv: 15, uv: 13, key: "2022-8-12 1:30:00" },
          { pv: 16, uv: 12, key: "2022-8-12 1:31:00" },
          { pv: 13, uv: 11, key: "2022-8-12 1:32:00" },
          { pv: 5, uv: 2, key: "2022-8-12 1:33:00" },
          { pv: 7, uv: 5, key: "2022-8-12 1:34:00" },
          { pv: 7, uv: 5, key: "2022-8-12 1:35:00" },
          { pv: 9, uv: 5, key: "2022-8-12 1:36:00" },
          { pv: 5, uv: 1, key: "2022-8-12 1:37:00" },
          { pv: 10, uv: 6, key: "2022-8-12 1:38:00" },
          { pv: 19, uv: 17, key: "2022-8-12 1:39:00" },
          { pv: 7, uv: 4, key: "2022-8-12 1:40:00" },
          { pv: 7, uv: 3, key: "2022-8-12 1:41:00" },
          { pv: 15, uv: 14, key: "2022-8-12 1:42:00" },
          { pv: 12, uv: 11, key: "2022-8-12 1:43:00" },
          { pv: 11, uv: 10, key: "2022-8-12 1:44:00" },
        ],
      },
      series: [
        {
          name: "pv",
          type: "line",
          symbol: "none",
          encode: {
            x: "key",
            y: "pv",
          },
        },
        {
          name: "uv",
          type: "line",
          symbol: "none",
          encode: {
            x: "key",
            y: "uv",
          },
        },
      ],
    };
    pvuv_echarts.setOption(pvuv_option);
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.upload {
  display: flex;
  justify-content: space-between;
  height: 30px;
  width: 100%;
  align-content: center;
  align-items: center;
}

.l-con {
  display: flex;
  font-size: 14px;
  color: #999;
}

.main {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.box-card {
  display: block;
  width: 33.3%;
  height: 250px;
  justify-content: flex-start;
  margin-bottom: 2px;
  margin-top: 8px;
}

.el-card {
  padding-left: 12px;
  padding-right: 12px;
  height: 95%;

  margin-left: 6px;
  margin-right: 6px;
}

.box-title {
  text-align: left;
  width: 100%;
  font-size: 13px;
  height: 24px;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
}
</style>

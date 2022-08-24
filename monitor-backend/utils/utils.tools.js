const db = require('../models')
const sequelize = db.sequelize;
let md5 = require("./utils.crypto");
let request = require('request');

let headers = {
    "Content-Type": "application/json;charset=UTF-8",
    "X-Bce-Signature": "AppCode/0658cf6ba73046d39b52b5288f6c956b",
}
let options = {
    method: 'POST',
    headers: headers,
}

//时间格式化
Date.prototype.Format = function (fmt) { 
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").sub(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

const utilsTools = {
    // 生成id
    createRandomId: ()=>{
        return md5((new Date()).getTime() + '-' + Math.random().toString().substring(2, 5)).toString()
    },
    // 获取实时时间
    getDate: ()=>{
        return new Date().format("yyyy-MM-dd hh:mm:ss")
    },
    // 对象参数为空删除属性
    deleteNullObj: (keywords) => {
        if(!keywords) {
            return keywords
        }
        for(let key in keywords) {
            if(keywords[key] === '') {
                delete keywords[key]
            }
        }
        return keywords;
    },
    // 生成请求记录 获取ip和解析地址
    generateRequestRecord: function(req) {
        let that = this
        request(
            `http://pv.sohu.com/cityjson`,
            {method: 'GET'},
            function(error, response, bodys) {
                let ip = JSON.parse(bodys.slice(bodys.indexOf('{'),bodys.indexOf('}')+1)).cip
                let u = new UAParser(req.headers['user-agent'])
            }
        )
    },
    removeProperty: function(obj) {
        Object.keys(obj).forEach(item => {
          if (obj[item] === '' || obj[item] === undefined || obj[item] === null || obj[item] === 'null') delete obj[item]
        })
        return obj
    },

    formatDate: function(msec) {
        let datetime = new Date(msec);
        let year = datetime.getFullYear();
        let month = datetime.getMonth();
        let date = datetime.getDate();
        let hour = datetime.getHours();
        let minute = datetime.getMinutes();
        let second = datetime.getSeconds();
    
        let result1 = year + 
                    '-' + 
                    ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + 
                    '-' + 
                    ((date + 1) < 10 ? '0' + date : date) + 
                    ' ' + 
                    ((hour + 1) < 10 ? '0' + hour : hour) +
                    ':' + 
                    ((minute + 1) < 10 ? '0' + minute : minute);
                    /* + 
                    ':' + 
                    ((second + 1) < 10 ? '0' + second : second);
                    */
    
        let result2 = year + 
                    '-' + 
                    ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + 
                    '-' + 
                    ((date + 1) < 10 ? '0' + date : date) + 
                    ' ' + 
                    ((hour + 1) < 10 ? '0' + hour : hour) + ":00";
    
        let result = {
            hasMin: result1,
            withoutMin: result2
        };
        return result;
    },
    // 聚合函数
    groupBy: function(ary){
        let map = {};
        let uv_map = {};
        for(let i=0; i<ary.length; i++) {
            let oldData = ary[i];
            let data = {pv: 0, uv: 0};
            if(map[this.formatDate(oldData.timestamp).hasMin]==null) {
                data.timestamp = this.formatDate(ary[i].timestamp).hasMin;
                data.pv++; data.uv++;
                uv_map[oldData.ip] = data; 
                map[oldData.timestamp] = data;
            } else {
                data = map[oldData.timestamp];
                data.pv++;
                if(uv_map[oldData.ip]==null) {
                    data.uv++;
                    uv_map[oldData.ip] = data; 
                }
            }
        }
        //组装新数组
        var relDatas = [];
        for (var i in map) {
            relDatas.push(map[i]);
        }
        return relDatas;
    },
    filterAryToJson: function(ary, attribute) {
        let result = [];
        ary.sort((x,y)=>x.timestamp - y.timestamp); // 按照时间排序
        // 遍历每条查询结果
        ary = this.groupBy(ary);
        // 修改键名
        result = ary.map((item)=>{
            return {
                [attribute]: item['pv'],
                key: item['timestamp'],
                uv: item['uv']
            }
        })
        return result;
    },

    // 解析body为字符串
    parseBody: function(body) {
        let ary_body = JSON.stringify(body).slice(3, -6).split(',');
        let obj = {};
        for(let ele of ary_body) {
            let tmp = ele.split(':');
            if(tmp.length>2) {
                tmp_copy = tmp.concat([]);
                tmp_copy.shift();
                tmp[1] = tmp_copy.join(':');
            }
            // 去除单引号
            if(tmp[1][0]=="'" && tmp[1][tmp[1].length-1]=="'"){
                tmp[1] = tmp[1].slice(1, -1);
            }
            obj[tmp[0]] = tmp[1];
        }
        return obj;
    }
}

module.exports = utilsTools
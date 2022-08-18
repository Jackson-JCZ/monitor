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
    }
}

module.exports = utilsTools
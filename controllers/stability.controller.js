const db = require('../models')
// 引入表模型
const stability = db.stability
const behavior = db.behavior
const experience = db.experience

const curd = require('../curd');
const { Sequelize } = require('../models');
const {Op} = require('sequelize')
// 解析body为字符串
function parseBody(body) {
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

function parseStringAry(str) {
    str = str.slice(1,-1);
    str = str.replace(/'|"/g, '');
    console.log(str)
    return str.split(',');
}
exports.findAll = (req, res) => {
    const pm = req.body;
    // console.log(req)
    // pm.indicatorList = parseStringAry(pm.indicatorList);
    console.log('pm', pm)
    // console.log(Array.from(pm.indicatorList))

    console.log(new Date(pm.to))
    /*
    // 原生查询
    curd.doQuery('select * from stability', list=>{
        res.send(list);
    })
    */
    let model = {stability: stability, behavior: behavior, experience: experience}
    let con = {
        params: {
            timestamp:{
               [Op.gte]: new Date(pm.from),
               [Op.lte]: new Date(pm.to)
           },
        },
        raw: true
    }
    let conditions = {
       params:{
            timestamp:{
                [Op.gte]: new Date(pm.from),
                [Op.lte]: new Date(pm.to)
            },
            errorType: { 
                [Op.like]: pm.logType   // 忽略大小写查询
            }
       },
        raw: true
   }
   curd.list(stability, pm, model[pm.kind], conditions, con, list=>{
       res.send(list);
   })
}
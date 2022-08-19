const db = require('../models')
const stability = db.stability
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



exports.findAll = (req, res) => {
    const pm = parseBody(req.body);
    console.log('pm', pm)
    console.log(new Date(pm.to))
    /*
    // 原生查询
    curd.doQuery('select * from stability', list=>{
        res.send(list);
    })
    */
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
   curd.list(pm, stability, conditions, list=>{
       res.send(list);
   })
}
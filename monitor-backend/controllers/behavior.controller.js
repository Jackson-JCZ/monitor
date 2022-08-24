const db = require('../models')
const stability = db.stability
const curd = require('../curd');
const { Sequelize } = require('../models');
const {Op} = require('sequelize')


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
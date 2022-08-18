const db = require('../models')
const stability = db.stability
const curd = require('../curd')

exports.findAll = (req, res) => {
    const pm = req.body;
    console.log('pm', pm)
    /*
    // 原生查询
    curd.doQuery('select * from stability', list=>{
        res.send(list);
    })
    */
   curd.list(stability, {raw: true}, list=>{
        console.log(list);
        res.send(list);
   })
}
const db = require('../models')
const stability = db.stability
const curd = require('../curd')

exports.findAll = (req, res) => {
    const pm = req.body;
    console.log('pm', pm)
    curd.doQuery('select * from stability', list=>{
        res.send(list);
    })
}
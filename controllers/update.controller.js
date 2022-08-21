const db = require('../models')
// 引入表模型
const stability = db.stability
const behavior = db.behavior
const experience = db.experience

const curd = require('../curd');
const {Op} = require('sequelize')
// const utils = require('../utils/utils.tools')


function get_client_ip(req) {
    var ipStr = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    var ipReg = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    if (ipStr.split(',').length > 0) {
        ipStr = ipStr.split(',')[0]
    }
    var ip = ipReg.exec(ipStr);
    return ip[0];
};

exports.updateData = (req, res) => {
    try{
        // console.log(req)
        // console.log('nondy', req.body)
        const pm = req.body;
        console.log(typeof pm)
        // console.log('req: ',req.rawTrailers)
        // console.log('pm', pm)
        // console.log()
        pm.ip = get_client_ip(req);
        let model = {stability: stability, behavior: behavior, experience: experience}
        console.log('model', model[pm.kind])
        curd.create(model[pm.kind], pm, list=>{
            res.send(list);
        })
    } catch(e) {
        console.log(e);
        res.send(e)
    }
}         
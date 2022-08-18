const sequelize = require('../routes/config')
const Sequelize = require('sequelize')
const {Op} = require('sequelize')

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;

// stability表
db.stability = require('./stability.model')(sequelize, Sequelize);

module.exports = db;
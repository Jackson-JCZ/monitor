const sequelize = require('../routes/config')
const Sequelize = require('sequelize')
const {Op} = require('sequelize')

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;

// stability表
db.stability = require('./stability.model.js')(sequelize, Sequelize);
db.behavior = require('./behavior.model.js')(sequelize, Sequelize);
db.experience = require('./experience.model.js')(sequelize, Sequelize);

module.exports = db;
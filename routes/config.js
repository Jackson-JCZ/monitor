/*
// 常规连接配置
module.exports = {
    port: 3000,
    // 数据库相关配置
    db: {
        host: '47.103.139.192',
        port: 3306, // mysql默认3306
        user: 'root',
        password: 'root',
        database: 'moni_db'
    }
}
*/
// sequelize连接
const Sequelize = require('sequelize')
// 创建实例对象并配置连接信息
const sequelize = new Sequelize({
    host: '47.103.139.192',
    username: 'root',
    password: 'root',
    database: 'moni_db',
    timezone: '+08:00',
    dialect: 'mysql'
})
module.exports = sequelize
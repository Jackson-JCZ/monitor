var express = require('express');
var router = express.Router();
var stability = require('../controllers/stability.controller');

/**
 * @route POST /home_data2
 * @group 关于js Error查询管理
 * @param {string} 输入时间和errorType
 * @returns {object} 200 - An array of visitor info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */

router.post('/', stability.findAll);

module.exports = router;
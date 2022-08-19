var express = require('express');
var router = express.Router();

// const connection = require('./db')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello, welcome to monitor backend.')
});

// post方法请求返回的数据
router.post('/', function(req, res, next) {
  res.send('hello, welcome to monitor backend.')
});


module.exports = router;

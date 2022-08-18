var express = require('express');
var router = express.Router();

// const connection = require('./db')

/* GET home page. */
router.get('/', function(req, res, next) {
  // 对数据库某个特定的表进行查询
  connection.query('select * from stability', (err, users) => {
    if(err) {
      res.send('query error')
    } else {
      // 返回值处理：过滤值为空的属性
      let result = JSON.stringify(users).slice(1, -1);
      result = removeProperty(JSON.parse(result))
      // console.log(result)
      res.send(result)
    }
  })
  // res.render('index', { title: 'Express' });
});

// post方法请求返回的数据
router.post('/', function(req, res, next) {
  // 对数据库某个特定的表进行查询
  connection.query('select * from stability', (err, users) => {
    if(err) {
      res.send('query error')
    } else {
      // 返回值处理：过滤值为空的属性
      let result = JSON.stringify(users).slice(1, -1);
      result = removeProperty(JSON.parse(result))
      // console.log(result)
      res.send('test post')
    }
  })
  // res.render('index', { title: 'Express' });
});

function removeProperty(obj) {
  Object.keys(obj).forEach(item => {
    if (obj[item] === '' || obj[item] === undefined || obj[item] === null || obj[item] === 'null') delete obj[item]
  })
  return obj
}

module.exports = router;

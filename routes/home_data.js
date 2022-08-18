var express = require('express');
var router = express.Router();
const connection = require('./db')

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
    // 将req.body格式转为正常的对象数据
    let res1 = JSON.stringify(req.body).slice(2, -5)
    console.log(res1)
    res1 = JSON.parse(res1)
    console.log(res1)
    res.send('test post')
    /*
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
    */
});

function removeProperty(obj) {
  Object.keys(obj).forEach(item => {
    if (obj[item] === '' || obj[item] === undefined || obj[item] === null || obj[item] === 'null') delete obj[item]
  })
  return obj
}

function parseBody(body) {
    let res1 = JSON.stringify(body).slice(3, -6)
}
module.exports = router;

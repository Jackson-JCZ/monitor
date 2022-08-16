var express = require('express');
var router = express.Router();

const connection = require('./db')

/* GET home page. */
router.get('/', function(req, res, next) {
  // 对数据库某个特定的表进行查询
  connection.query('select * from stability', (err, users) => {
    if(err) {
      res.render('index', { title: 'query error' });
      // res.send('query error')
    } else {
      res.render('index', { title: users });
      // res.send(users)
    }
  })
  // res.render('index', { title: 'Express' });
});

module.exports = router;

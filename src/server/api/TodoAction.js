const models = require('../db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')

// 连接数据库
const conn = mysql.createConnection(models.mysql)
conn.connect()
const jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1', msg: '操作失败'
    })
  } else {
    res.json(
      ret
    )
  }
}

// 接口：当前list查询
router.get('/getlist', (req, res) => {
  const params = req.query
  const sql = 'select * from todolist where status='0' order by level asc'
  limit ${(params.pageIndex-1) * params.pageSize},${params.pageSize}`
  const sql2 = `select count(*) as total from todolist`
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      conn.query(sql2,function(err, result2) {
        if(err){
          console.log(err)
        }
        if(result2){
          let ret = {
            data:result,
            total:result2[0].total
          }
          jsonWrite(res, ret)
        }
      })
    }
  })
})


// 接口：添加功能
router.post('/handleAdd', (req, res) => {
  const md5 = crypto.createHash('md5')
  const params = req.body
  const sql = `insert into todo(content,level,status,op_date) values('".$data["content"]."','".$data["level"]."','0',current_date) `
  md5.update(params.pwd)
  db.query(sql, [params.content,params.level,params.status,params.op_date], (err, data) => {
          if(err) {
              return res.send('错误：' + err.message)
          }
          res.send(data)
      })

})

// 接口：删除功能
router.post('/del', (req, res) => {
  const params = req.body
  const sql = `delete from todolist where content=${params.content}`
  conn.query(sql, params, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})


// 接口：选中功能
router.get('/handleSelect', (req, res) => {
  const params = req.body
  const sql = `select from todolist where content=${params.content}`
  conn.query(sql, params, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：全选功能
router.get('/handleAllSelect', (req, res) => {
  const md5 = crypto.createHash('md5')
  const params = req.body
  md5.update(params.password)
  const sql = `select * from todolist where status='0' or status='1'`
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：判断是否输入完成
router.get('/handleBlur',(req, res) => {
  const params = req.query
  const sql= `select * from todolist where content=${params.content}`
  conn.query(sql,params,function(err, result){
    if(err){
      console.log(err)
    }
    if(result){
      jsonWrite(res,result)
    }
  })
})



module.exports = router


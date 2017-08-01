const express = require('express')
const path = require('path')
var app = express();
var mysql      = require('mysql');
var env = require('./env')
var config = require('./project_config')[env].mysql
var connection = mysql.createConnection(config);
var redis = require("./redis")
var wx = require("./wx")//微信🇭相关


var send = (res,data)=>{
    res.send({
        code:200,
        data:data,
        err:null
    })
}
var sendError = (res,err)=>{
    res.send({
        code:0,
        data:null,
        err:err
    })
}
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

var query = (res,sql,callback)=>{
    connection.query(sql, function (error, results, fields) {
        if (error) {
            sendError(res,error)
            return 
        }
        callback&&callback(results)
    });
}


app.use(express.static('dist'));
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname,'./dist/index.html'))
});
app.get('/MP_verify_PBmcx1jauuWGYH9s.txt', function (req, res) {
    res.sendFile(path.resolve(__dirname,'./static/MP_verify_PBmcx1jauuWGYH9s.txt'))
});


app.get('/record', function (req, res) {
    var q = req.query
    if(!q.name){
        sendError(res,'缺少name')
        return 
    }
    var result = q.result||null
    var type = q.type||1
    var sql = `INSERT INTO activity (name,type,result) VALUES ('${q.name}',${type},${result})`
    query(res,sql, function ( results) {
        // connected! 
        res.end("success")
    });
});

//获取微信参数
app.get('/getwx', function (req, res) {
    var q = req.query
    if(!q.url){
        sendError(res,'缺少url')
        return 
    }
    wx.getJSSDK(q.url,params=>{
        send(res,params)
    })
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
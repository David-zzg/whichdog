// wx 相关
var env = require('./env')
var config = require('./project_config')[env].wx
var axios = require('axios')
var redis = require("./redis")
var sha1 = require("./util/sha1")
console.log(sha1)
var _getAccesstoken = function (callback) {
    var url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${config.secret}`
    axios.get(url).then(res=>{
        var token = res.data
        var obj = {
            token:token.access_token,
            expire:Date.now()+(token.expires_in*1000)
        } 
        redis.set(ACCESSTOKEN,JSON.stringify(obj))
        callback&&callback(obj)
    })
}
const ACCESSTOKEN = "accesstoken"
const TICKET = "ticket"


function getAccesstoken(callback,refresh=false){
    if(refresh){
        _getAccesstoken(token=>callback(token.token))
        return 
    }
    redis.get(ACCESSTOKEN,(token)=>{
        if(!token){
            console.log('缺少token')
            _getAccesstoken(token=>callback(token.token))
            //缺少token
        }else{
            console.log('有token')
            var tokenObj = JSON.parse(token)
            if(Date.now()>tokenObj.expire||!tokenObj.token){
                //过期
                console.log('token过期')
                _getAccesstoken(token=>callback(token.token))
            }else{
                callback(tokenObj.token)
            }
        }
    })
    
}


function _getTicketByToken(callback,token,err) {
    var url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`
    axios.get(url).then(res=>{
        var data = res.data
        if(data.errcode==40001){
            //token过期
            err&&err()
            return
        }
        var obj = {
            ticket:data.ticket,
            expire:Date.now()+(data.expires_in*1000)
        } 
        redis.set(TICKET,JSON.stringify(obj))
        callback&&callback(obj)
    })
}

//获取jssdk的ticket
function _getTicket(callback){
    getAccesstoken(token=>{
        _getTicketByToken(callback,token,()=>{
            getAccesstoken(token=>{
                _getTicketByToken(callback.token)
            },true)
        })
    })
}


//获取jssdk的ticket
function getTicket(callback){
    redis.get(TICKET,ticket=>{
        if(!ticket){
            console.log('没有ticket')
            _getTicket(ticket=>callback(ticket.ticket))
        }else{
            var ticketObj = JSON.parse(ticket)
            if(Date.now()>ticketObj.expire||!ticketObj.ticket){
                _getTicket(ticket=>callback(ticket.ticket))
            }else{
                callback(ticketObj.ticket)
            }
        }
    })
}

function createWXParams(addpid,jsapi_ticket,url) {
    var timestamp = Math.floor(Date.now()/1000)
    var nonceStr = 'petzman'
    var arr = []
    arr.push(`jsapi_ticket=${jsapi_ticket}`)
    arr.push(`noncestr=${nonceStr}`)
    arr.push(`timestamp=${timestamp}`)
    arr.push(`url=${url}`)
    var value = arr.join('&')
    return {
        appId: config.appid, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: sha1(value),// 必填，签名，见附录1
    }
}

function getJSSDK(url,callback){
    getTicket(ticket=>{
        callback(createWXParams(config.appid,ticket,url))
    })
}

module.exports = {
    getAccesstoken,getTicket,getJSSDK
}
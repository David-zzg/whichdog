var redis = require("redis"),
client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

module.exports = {
    set(key,value){
        return client.set(key,value)
    },
    get(key,callback){
        return client.get(key,(err,result)=>{
            callback&&callback(result)
        })
    }
}
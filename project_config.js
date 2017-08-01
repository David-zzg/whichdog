module.exports = {
    dev:{
        mysql:{
            host     : 'localhost',
            user     : 'root',
            password : '123456',
            database : 'activity'
        },
        wx:{
            appid:"wx3eeb82a51a498126",
            secret:"afed8988dd8e9af297980bb4ea402600"
        }
    },
    production:{
        mysql:{
            host     : '120.24.212.47',
            user     : 'syin',
            password : 'syin@20150328',
            database : 'activity'
        },
        wx:{
            appid:"wx3eeb82a51a498126",
            secret:"afed8988dd8e9af297980bb4ea402600"
        }
        
    }
}
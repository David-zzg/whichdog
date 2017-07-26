var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var yaml = require('js-yaml');
const path = require('path')
const fs = require('fs')
function sprite(p,cb) {
    var spriteData = gulp.src('src/assets/sprite/'+p+'/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css',
        imgPath:'/static/'+p+'/sprite.png',
        padding:10,
        retinaSrcFilter:'src/assets/sprite/'+p+'/*@2x.png',
        retinaImgName:"sprite@2x.png",
        retinaImgPath:'/static/'+p+'/sprite@2x.png'
    }));
    spriteData.pipe(
        gulp.dest('static/'+p)
        // cb()
    ).on('end',function (params) {
        cb()
    })
}
function rem(p) {
    const file = path.resolve(__dirname,'./static/'+p+'/sprite.css')
    var content = fs.readFileSync(file,{
        encoding:'utf-8'
    })
    var newFileContent=content.replace(/(\d+)px/g,function () {
        console.log(arguments[0])
        // return 
        return pixel(parseInt(arguments[0]))+'rem'
    })
    var newFileContent=newFileContent.replace(/\.icon/g,function () {
        // return 
        return '.ricon'
    })
    function pixel(pixel,radio=750) {
        return (pixel*20/radio)
    }
    fs.writeFile(path.resolve(__dirname,'./static/'+p+'/sprite_rem.css'),newFileContent)
}
gulp.task('default',['sprite','rem'])

gulp.task('sprite', function (cb) {
    var p = process.argv[2].slice(1)
    sprite(p,cb)
});
gulp.task('rem',['sprite'],function (params) {
    var p = process.argv[2].slice(1)
    rem(p)
})


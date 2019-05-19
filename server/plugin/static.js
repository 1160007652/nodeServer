const fs = require('fs');
const path = require('path');
const mime = require('./../config/mime_config');

class mStatic {
    constructor(path, staticDir){
        // 传入 static 路径
        this.path = path;
        // 资源文件夹目录名
        this.staticDir = `/${staticDir}`;
    }
    render(){
        return  async (ctx,next)=>{
            const extension = path.extname(ctx.url).split(".")[1];
            const extname = mime.mime_type[extension];
            if(extname) {
                const isStatic = this.staticDir === ctx.url.substr(0, this.staticDir.length);
                if(isStatic){
                    try{
                        const realPath = path.join(this.path.replace(this.staticDir, ''), ctx.url);
                        const isExitsPath= fs.existsSync(realPath);
                        try{
                             if(isExitsPath){
                                let _data = fs.readFileSync(realPath, 'utf-8');
                                ctx.res.writeHead(200, {"Content-Type": extname});
                                if(['jpg'].includes(extension)) {
                                    _data = fs.readFileSync(realPath, 'binary', 'utf-8');
                                    ctx.res.write(_data, 'binary');
                                    ctx.res.end();
                                } else {
                                    ctx.body=_data;
                                }
                             }
                        } catch(e) {
                             ctx.res.writeHead(500, {"Content-Type": extname});
                             ctx.res.end();
                        }
                     } catch(e) {
                         ctx.res.writeHead(404, {"Content-Type": extname});
                         ctx.res.end();
                     }
                }
            }
            await next();
        }
    }
}
module.exports=mStatic;
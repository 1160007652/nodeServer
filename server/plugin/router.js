const url = require('url');
class Router {
    constructor(){
        this.path={}
    }
    get(path,callback){
        this.path[path]=callback
    }
    routers(){
        return async (ctx,next)=>{
            const pathname =  url.parse(ctx.url).pathname;
            const fn = this.path[pathname];
            // 绑定 get查询数据
            ctx.params = url.parse(ctx.url,true).query;

            fn && await fn(ctx,next);
        }
    }
}
module.exports=Router
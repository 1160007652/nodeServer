const ejs = require('ejs');
const fs = require('fs');

class Views {
    constructor(path){
        this.path = path;
    }
    renderFile(filePath, data){
        return new Promise(function (resolve, reject){
            ejs.renderFile(filePath, data, function(err, src){
                if(err){
                    reject(err);
                } else {
                    resolve(src);
                }
            });
        })
    }
    ejsRender(ctx) {
        return async (fileName, data) => {
            let _html = await this.renderFile(`${this.path}/${fileName}`, data);
            ctx.body = _html;
        }
    }
    render(){
        return  async (ctx,next)=>{
            ctx.render = this.ejsRender(ctx); // ejs.renderFile();
            await next();
        }
    }
}
module.exports=Views
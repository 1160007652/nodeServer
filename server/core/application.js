const http = require('http')

let request = {
    get url () {
        return this.req.url
    }
}
let response = {
    get body () {
        return this._body
    },
    set body (val) {
        this._body = val
    }
}

let context = {
    get url () {
        return this.request.url
    },
    get body () {
        return this.response.body
    },
    set body (val) {
        this.response.body = val
    }
}

class Application {
    constructor(){
        this.context = context
        this.request = request
        this.response = response
        this.middlewares = []
    }
    use ( callback ){
        this.middlewares.push(callback)
    }
    compose (middlewares) {
        return function(context){
            function dispatch(i){
                const fn = middlewares[i]
                if(!fn && !context.body){
                    return Promise.resolve()
                }
                return Promise.resolve(fn(context,function next(){
                    return dispatch(i+1)
                }))
            }
            return dispatch(0)
        }
    }
    listen (...args){
        const server = http.createServer( async (req, res)=>{
            let ctx = this.createCtx(req,res)
            await this.compose(this.middlewares)(ctx);
            // ctx.res.write(ctx.body, 'binary');
            ctx.res.end(ctx.body);
        });
        server.listen(...args)
    }
    createCtx (req, res) {
        let ctx = Object.create(this.context)
        ctx.request = Object.create(this.request)
        ctx.response = Object.create(this.response)
        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
}

module.exports = Application
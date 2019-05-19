const path = require('path')
const Munzi = require('./server/core/application');
const MStatic = require('./server/plugin/static.js');
const Views = require('./server/plugin/views.js');
const router = require('./controller/router');
const app = new Munzi();

const mStatic = new MStatic(path.join(__dirname, './static'), 'static');
const views = new Views(path.join(__dirname, './views'));

app.use(mStatic.render())
app.use(views.render())
app.use(router.routers())

app.listen(8888,()=>{
    console.log('Muniz 服务：http://127.0.0.1:8888');
})
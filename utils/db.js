const mysql      = require('mysql');

const pool  = mysql.createPool( {
    connectionLimit : 50,
    host     : 'localhost',
    user     : 'root', // 数据库用户名
    password : '123456', // 数据库密码
    database : 'school',
    multipleStatements : true  //是否允许执行多条sql语句
} );

//将结果以对象数组返回
const query=( sql , ...params )=>{
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
                return; 
            }
            connection.query( sql , params , function(error,res){
                connection.release();
                if(error){
                    reject(error);
                    return;
                }
                resolve(res);
            });
        });
    });
};

// 添加数据
const insert=( sql , ...params )=>{
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
                return; 
            }
            connection.query( sql , params , function(error,res){
                connection.release();
                if(error){
                    reject(error);
                    return;
                }
                resolve(res);
            });
        });
    });
};

// 导出 DB 类
const DB = {
    query, insert
}
//模块导出
module.exports = DB;
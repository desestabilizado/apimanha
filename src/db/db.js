const mysql = require('mysql2/promisse')
 require ('dotenv').config();//Carrega as variaveis do ambiente

 //cria um pool de conexôes com promisses
 const db = mysql.createPool({
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process. wnv.DB_PASSWORD,
    database:process.env.DB_NAME
 })

 //testando a conexão ao iniciar a aplicação 
 (async()=>{
    try{
        const connection=await db.getConection();
        console.log('Conexão com o banco de dados estabelecidade com sucesso!');
        connection.release();//Libera a conexão de volta para o poll
    }catch(err){
        console.error('Erro ao conectar ao banco de dados',err);
    }
    })

    module.exports=db
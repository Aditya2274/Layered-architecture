const app=require('./app')
const config=require('./config')
const DatabaseConfig=require('./config/database')

const startsever=async()=>{
try{
    await DatabaseConfig.connect();
    app.listen(config.port,()=>{
        console.log("Server is running at port ",config.port)
    })
}
catch(err){
    console.log("Error at connecting to mongodb ",err.message);
    process.exit(1);
}
}
startsever();
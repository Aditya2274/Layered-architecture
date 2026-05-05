const mongoose=require('mongoose')

class DatabaseConfig{
    static async connect(){
        try{
            const mongoURI=process.env.MONGODB_CONNECT_URI;
            const options={
                maxPoolSize : 10,//Maintain upto 10 socket connections
                serverSelectionTimeoutMS: 5000,// keep trying to send operations for every 5 second
                socketTimeoutMS: 45000,// close socket after 45 sec of inactivity
            }
            await mongoose.connect(mongoURI,options);
            console.log("MongoDb connected successfully");
        }
        catch(err){
            console.log("Error connecting to MongoDB:",err.message)
            process.exit(1);
        }
    }
    static async disconnect(){
        try{
            await mongoose.disconnect();
            console.log("Successfully diconnected from mongodb")
        }
        catch(err){
            console.log("Error disconnecting mongodb",err);
        }
    }
}
module.exports=DatabaseConfig;
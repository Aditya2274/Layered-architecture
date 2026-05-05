require("dotenv").config()

const config={
    port: process.env.PORT,
    mongodb:{
        uri: process.env.MONGODB_CONNECT_URI
    },
    api:{
        prefix: "/api",
        version: "v1"
    },
    cors:{
        origin:process.env.CORS_ORIGIN || '*',
        credentials: true
    }
}
module.exports=config
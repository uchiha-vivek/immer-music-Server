const mongoose = require('mongoose')

const dbConnection = async() =>{

    try{
        const MONGO_LINK= process.env.DB_URI
        await mongoose.connect(MONGO_LINK,{useUnifiedTopology:true})
        console.log(`Database connected successfully`)
    }catch(e){
        console.log(`Error while connecting to the Database`,e.message)
    }
}

module.exports = dbConnection
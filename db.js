const mongoose = require('mongoose')
const db = 'mongodb+srv://nitesh:Siu33005@cluster0.etasl.mongodb.net/devconnector?retryWrites=true&w=majority'

const connectDB = async () =>{
      try{

           await mongoose.connect(db,
            { useNewUrlParser: true ,
             useUnifiedTopology: true ,
             
            } 
            
            )
           console.log('Mongodb is connected')

      }catch(err){

            console.error(err.message)
            process.exit(1)

      }
}

module.exports = connectDB;

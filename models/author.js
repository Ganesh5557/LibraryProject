// This will be singular of things inside views eg author

const mongoose= require('mongoose')
//Setting up the Schema
const authorSchema = new mongoose.Schema({

    name:{

        type: String,
        required: true
    }
})

//Exporting the Schema , Setting Author as a model 
module.exports= mongoose.model('Author',authorSchema)
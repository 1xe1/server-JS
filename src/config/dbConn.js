const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        await mongoose.connect(URI,{useNewUrlParser:true});
    } catch (error) {
        console.log(error);
    }
}
import mongoose from 'mongoose';
const Userschema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 6,
        max: 255
    } ,
   
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    }
});

export default mongoose.model('Users', Userschema);


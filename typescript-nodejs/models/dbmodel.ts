import mongoose from 'mongoose';
const Postschema = new mongoose.Schema({
    orderNo:{
        type: Number,
        required: true
    } ,
    date:{
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    },
    item: {
        type: String,
        required: true
    }
});

export default mongoose.model('posts', Postschema);


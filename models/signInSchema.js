const mongoose=require('mongoose');

const signInSchema=new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registrationDate:{
        type:Date
    }
});

const signIn = mongoose.model('signIn', signInSchema);

module.exports=signIn; 
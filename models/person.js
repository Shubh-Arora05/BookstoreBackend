const mongoose = require("mongoose");
const bcrypt = require('bcrypt') ;
const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique :true,
  },
  password: {
    type: String,
    required: true,
  },
});

PersonSchema.pre('save' , async function(next){
    const person = this ;
    if(!person.isModified('password')){
        return next() ;
    }
    try{
        const salt = await bcrypt.genSalt(10) ;
        const hashedPassword = await bcrypt.hash(person.password,salt) ;
        person.password = hashedPassword ;
        next() ;
    }
    catch(err){
        return next(err) ;
    }
})


PersonSchema.methods.comparePassword = async function(password){
    try{
        const isMatch = await bcrypt.compare(password,this.password)
        return isMatch ;
    }catch(err){
        throw err ;
    }
}


const Person = mongoose.model("Person", PersonSchema);

module.exports = Person;

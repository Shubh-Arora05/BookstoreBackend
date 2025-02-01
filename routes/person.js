const express = require('express') ;
const routes = express.Router() ;
const Person = require('../models/person') ;

const passport = require('../auth.js');
routes.use(passport.initialize()) ;
const localAuthMiddleware = passport.authenticate('local', {session: false})
routes.post('/signup', async (req,res)=>{

    try{
        const data = req.body ;
        const check = await Person.findOne({name :data.name}) ;
        if(check){
            return res.status(404).send('Username already exit') ;
        }   
        const newperson = new Person(data) ;
        const response =  await newperson.save() ;
        return res.status(200).json({message : 'person created',data : response}) ;

    }catch(err){
        // console.log(err.message) ; 
        return res.status(500).send(err.message) ;
    }
    
})

routes.post('/signin' ,  localAuthMiddleware,async (req,res)=>{

    try{
        // const data = req.body;
        // const name = data.name ;
        // const password = data.password ;
        // console.log("name" , name) ;
        // const response = await Person.findOne({name}) ;
        // if(!response){
        //    return res.status(404).json({message : 'Username not found', response: response}) ;
        // }
        // console.log( "response", response) ;
        // const isMatch = await response.comparePassword(password);

        // if (!isMatch) {
        //     return res.status(404).json({ message: "Password incorrect" , isMatch : isMatch});
        // }
        return res.status(200).json({message : 'Person signin'}) ;

    }catch(err){
        console.log(err.message) 
        return res.status(500).send(err.message) ;
    }
    
})







module.exports = routes ;
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
            return res.status(201).send('Username already exit') ;
        }   
        const newperson = new Person(data) ;
        const reponse =  await newperson.save() ;
        res.status(201).json({message : 'person created',data : reponse}) ;

    }catch(err){
        console.log(err.message) ; 
        res.status(500).send(err.message) ;
    }
    
})

routes.post('/signin' ,localAuthMiddleware,async (req,res)=>{

    try{
        const data = req.body ;
        const name = data.name ;
        // const response = await Person.findOne({name}) ;
        // if(!response){
        //     res.status(404).json({message : 'person not found'}) ;
        // }
        // if(data.password != response.password){
        //     res.status(401).json({message : 'password incorrect'}) ;
        // }
        res.status(201).json({message : 'person signin'}) ;

    }catch(err){
        console.log(err.message) 
        res.status(500).send(err) ;
    }
    
})







module.exports = routes ;
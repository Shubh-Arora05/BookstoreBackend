
const cors = require('cors')
const express = require('express') ;
const app = express() ;
const db = require('./db') ;
app.use(express.json());


app.use(cors()) ;









// app.use(passport.initialize()) ;
// const localAuthMiddleware = passport.authenticate('local', {session: false})
const port = process.env.PORT || 3000 ;

const person_routes = require('./routes/person');
const book_routes = require('./routes/book');

app.use('/person' , person_routes) ;
app.use('/book' , book_routes) ;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
}) ;




// mongoose
//   .connect('mongodb://localhost:27017/BookStore')
//   .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(3000, () => {
//       console.log(`Server is running on port ${3000}`);
//     });
//   })
//   .catch((error) => {
//     console.log("error" , error.message);
    
//   });
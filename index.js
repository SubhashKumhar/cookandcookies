const express = require("express");
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const backendApi = require('./Backend/routes/api');
const port = process.env.PORT || 5001;
const {MONGOURI} = require('./Backend/key')

// const http = require("http").Server(app);


app.use(morgan('dev'))
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
}).then(() => {
    console.log('Database connection successful')
  })
  .catch(err => {
    console.error(err,'Database connection error');
  });



  
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);

// mongoose.connection.on('connected',()=>
// console.log("hurry! database connected")
// )

// mongoose.connection.on('error',(error)=>
// console.log("oops ! something went wrong",error)
// )



require("./Backend/Models/Product")
require("./Backend/Models/Banner")
require("./Backend/Models/Category")
require("./Backend/Models/Order")


app.use(cors());  

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/',backendApi);
// if (process.env.NODE_ENV === "production") {
  //Express will serve up production assets like our main.js file or main.css file
  app.use(express.static("build"));

  //Express will serve up the index.html file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "build", "index.html")
    );
  });
// }

app.listen(port, () => console.log("Listening"));
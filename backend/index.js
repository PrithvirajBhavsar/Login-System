const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

  // backend\router\index.js
  const routes = require("./router/index.js");
  // const errorController = require("./controllers/errorController.js");
  // import routes from "./routes/routes.js";
  // console.log(routes);
  
  const app = express();
  
  app.use(bodyParser.json({limit:"30mb",extended:true}));
  app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
//   app.use(csrfProtection)
app.use(cookieParser(
    {
        SameSite:"strict"
    }
))

app.use(cors());
app.use(('/'),routes);
// app.use(errorController);

const CONNECTION_URL = 'mongodb://localhost:27017/Practise';

const port = process.env.PORT;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}).
then(app.listen(port,()=>{console.log(`server started at ${port}`)}))
.catch((e)=>{console.log(e);})

mongoose.set("useFindAndModify",false);
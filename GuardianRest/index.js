const dotenv = require('dotenv');

dotenv.config();

global.__basedir  = __dirname;

const ExpressLoader = require("./src/config/express.loader");

const app  = new ExpressLoader().Server;


app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server on port 5000");
});





const dns=require("dns");
dns.setServers(["0.0.0.0" , "8.8.8.8"]);


require("dotenv").config();
 const app = require("./app");
const connectDB = require("./config/db");

connectDB();


 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
 });

import app from "./app/app.js";
import { config } from "./config/config.js";
import { connectDB } from "./config/database.js";

await connectDB()

let port = config.port || 4000

app.listen(port , ()=>{
    console.log(`server is running on port : ${port}`)
})
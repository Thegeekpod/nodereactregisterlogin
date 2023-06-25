import http from "http";
import dotenv from "dotenv";
import app from "./index.js";
dotenv.config({ path: './config/.env' });

const PORT = process.env.PORT || 5001
const server = http.createServer(app);

server.listen(PORT,()=>{
    console.log('server started '+`${PORT}`)
});

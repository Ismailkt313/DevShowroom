import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import { router } from "./routes/routes";
import cors from "cors";

console.log('he heylloo')
dotenv.config();

connectDB();

console.log(process.env.ORIGIN_URL)
 
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: `${process.env.ORIGIN_URL}`,
    credentials: true,
}));
app.use("/api", router);

const server = ()=>{
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}
server()
export default app;
 
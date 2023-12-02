import express from "express";
import dotenv from "dotenv";

dotenv.config();

//import router
import mongoRouter from "../routes/mongoDBRoutes.mjs";


//create server instance
const app = express();
const PORT = process.env.PORT;

//use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//use routers

app.use("/createmongodb", mongoRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

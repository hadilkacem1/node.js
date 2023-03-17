const express= require("express");
const logger= require("morgan");
const createError= require("http-errors");
const mongoose= require("mongoose");
const dbconfig= require("./database/mongodb.json");
const http=require("http");
var path =require("path");
const ChatRouter=require("./routes/chat.js");

const studentsRouter = require("./routes/students.js");

const app= express();


app.set("views",path.join(__dirname,"views"));
app.set("view engine","twig");
app.use("/chat",ChatRouter);


const server=http.createServer(app);
const io=require("socket.io")(server);
io.on('connection',(socket)=>{
    console.log('User Connected');
    io.emit('msg',"A new user is connected ");
    socket.on("msg",(data)=>{
        io.emit("msg",data)
    })


socket.on("disconnect",()=>{
    io.emit("msg","A user has been disconnected");
})
});


server.listen(3000,()=>console.log("server is run"));



app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/student", studentsRouter);

app.use((req,res,next)=>{
    next(createError(404));
})

mongoose.connect(dbconfig.mongo.uri);

module.exports=app;
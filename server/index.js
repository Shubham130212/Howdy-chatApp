const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const authRoutes=require("./routes/auth");
const messageRoute=require("./routes/messages");
const socket=require("socket.io");

const app=express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("api/auth",messageRoute);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("DB connection successfull")
}).catch((err)=>{
    console.log("err.message");
});

const server=app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`);
});

//socket connection
const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

//map user from global online users & grab their user_id & socket_id
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
});

//send msg
socket.on("send-msg", (data) => {
    
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
  
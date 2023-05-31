const express = require("express");
const app = express();

//http라이브러리 인스턴스 생성
//소켓io는 http서버에 생성되므로 사용.
const http = require("http");

//소켓라이브러리에서server클래스가져옴
const { Server } = require("socket.io");

const cors = require("cors");
app.use(cors());

//실제 http서버 생성->앱전달
const server = http.createServer(app);

//server클래스 인스턴스 http서버 전달
const io = new Server(server, {
  //관련정보 입력 => 새서버라고 말하는 이유
  cors: {
    origin: "http://localhost:3000", //프론트엔드가 있는 위치의 출처를 입력
    methods: ["GET", "POST"], //어떤종류의 메소드를 허용하는지
  },
});

//프런트에서 설정한 이벤트를 듣는방식을 io.이라고 말한다.
io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    //send message라는 이벤트를 듣고 일부 데이터를 반환할것
    console.log(data); //터미널에 메세지 뜬걸 확인할수 있음
    //여기주소에 연결된 모든사람들에게 알릴거임, 여기서 전달하는 메시지는 프런트에서 받은 메세지임
    socket.broadcast.emit("receive_message", data);
  });
});

//서버생성
server.listen(3001, () => {
  console.log("서버작동중");
});

//--------------------------------------
// const express = require('express')
// const socketio = require('socket.io')
// const http = require('http')

// const PORT = process.env.PORT || 5000

// const app = express();
// const server = http.createServer(app)
// const io = socketio(server)
// server.listen(PORT,()=>console.log(`서버가 ${PORT} 에서 시작되었어요`))

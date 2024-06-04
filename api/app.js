const fs = require('fs');
const path = require('path');
const express = require('express');
const http = require('http');
const cors = require('cors');
const conn = require('./connect/mariadb');
const app = express();

// 설정 파일의 경로
//const configPath = path.join(__dirname, '.', 'config.json');

// 설정 파일 읽기
//const configData = fs.readFileSync(configPath, 'utf8');
//const config = JSON.parse(configData);

// 서버 설정 가져오기
//const serverConfig = config.server;

// CORS 설정
//app.use(cors({ origin: serverConfig.host+':'+serverConfig.port }));
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const test = {
  "message": "test",
  "status": "successs"
};

app.get('/', (req, res) => {
  res.json(test); // JSON 객체를 응답으로 보냄
});

server.listen(3000, () => {
  console.log(`Server running`);
});



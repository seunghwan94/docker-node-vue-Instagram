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

app.post('/login', (req, res) => {
  const { id, pw } = req.body;

  const query = 'select * from tb_user where user_id = ? and user_pw = ?';
  conn.query(query, [id, pw], (err, result) => {
    if (err) {
      console.error("Database select error:", err);
      res.status(500).send('Error select data into database');
    } else {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(300).send('아이디 or 비밀번호가 없습니다.');
      }
    }
  });
});

app.post('/signup', (req, res) => {
  const { id, pw, name, birth } = req.body;
  const currentDate = new Date();
  const query1 = 'select * from tb_user where user_id = ?';
  conn.query(query1, [id], (err, result) => {
    if (err) {
      console.error("Database select error:", err);
      res.status(500).send('Error select data into database');
    } else {
      if (result.length > 0) {
        res.status(300).send('중복된 아이디 입니다.');
      } else {
        const query2 = 'INSERT INTO tb_user (user_id, user_pw, name, birth, insert_date) VALUES (?, ?, ?, ?, ? )';
        conn.query(query2, [id, pw, name, birth, currentDate], (err, result) => {
          if (err) {
            console.error("Database insert error:", err);
            res.status(500).send('Error inserting data into database');
          } else {
            res.status(200).send('User data inserted successfully');
          }
        });
      }
    }
  });
});

app.post('/findIdPw', (req, res) => {
  const { name, birth } = req.body;
  const query = 'select * from tb_user where name = ? and birth = ?';
  conn.query(query, [name, birth], (err, result) => {
    if (err) {
      console.error("Database select error:", err);
      res.status(500).send('Error select data into database');
    } else {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(300).send('가입된 아이디가 없습니다.');
      }
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/load_post', (req, res) => {
  const { user_id } = req.body;
  const query = 'select * from tb_post where user_id = ? DESC';
  conn.query(query, [user_id], (err, result) => {
    if (err) {
      console.error("Database select error:", err);
      res.status(500).send('Error select data into database');
    } else {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(300).send('올린 게시글이 없습니다');
      }
    }
  });
});

app.post('/create_post', (req, res) => {
  const { user_id, maintext,subtext } = req.body;
  const currentDate = new Date();
  const query2 = 'INSERT INTO tb_post (user_id, maintext, subtext, insertdate) VALUES (?, ?, ?, ? )';
      conn.query(query2, [user_id, maintext, subtext,currentDate], (err, result) => {
      if (err) {
      console.error("Database insert error:", err);
      res.status(500).send('Error inserting data into database');
      } else {
      res.status(200).send('Post created successfully');
      }
  });
});

app.post('/delete_post', (req, res) => {
  const { id } = req.body;
  const query2 = 'UPDATE tb_post SET is_delete = "Y" WHERE id = ?';
      conn.query(query2, [id], (err, result) => {
      if (err) {
      console.error("Database insert error:", err);
      res.status(500).send('Error UPDATE data into database');
      } else {
        res.status(200).send('Post deleted successfully');
      }
  });
});

app.post('/modify_post', (req, res) => {
  const { id,maintext,subtext } = req.body;
  const query2 = 'UPDATE tb_post SET maintext = ?, subtext = ? WHERE id = ?';
      conn.query(query2, [maintext, subtext,id], (err, result) => {
      if (err) {
      console.error("Database insert error:", err);
      res.status(500).send('Error UPDATE data into database');
      } else {
        res.status(200).send('Post deleted successfully');
      }
  });
});

app.post('/load_like', (req, res) => {
  const { user_id,post_id } = req.body;
  const query = 'select * from tb_likes where user_id = ? and where post_id = ? and is_set = "Y"  DESC';
  conn.query(query, [user_id,post_id], (err, result) => {
    if (err) {
      console.error("Database select error:", err);
      res.status(500).send('Error select data into database');
    } else {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(300).send('올린 게시글이 없습니다');
      }
    }
  });
});


app.post('/like_on', (req, res) => {
  const { user_id,post_id } = req.body;
  const query2 = 'INSERT INTO tb_likes (user_id, post_id,is_set) VALUES (?, ? , "Y")';
      conn.query(query2, [user_id, post_id], (err, result) => {
      if (err) {
      console.error("Database insert error:", err);
      res.status(500).send('Error INSERT data into database');
      } else {
        res.status(200).send('Like inserted successfully');
      }
  });
});
app.post('/like_off', (req, res) => {
  const { user_id,post_id } = req.body;
  const query2 = 'UPDATE tb_likes SET is_set = "N" where user_id = ? and post_id = ?';
      conn.query(query2, [user_id, post_id], (err, result) => {
      if (err) {
      console.error("Database insert error:", err);
      res.status(500).send('Error updated data into database');
      } else {
        res.status(200).send('Like offed successfully');
      }
  });
});




/////////////////////////////////////////////////////////////////////////////////////////////////////////




server.listen(3000, () => {
  console.log(`Server running`);
});

//test




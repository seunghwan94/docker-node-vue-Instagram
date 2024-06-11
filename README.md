# 풀스택 개발 능력을 향상시키기 위해, Vue를 이용하여 SNS (instagram) 개발

### docker 실행하여 CentOS 설치
```
docker run -it -p 5222:22 -p 8080:8080 -p 3000:3000 -p 3306:3306 -p 5000:5000 --privileged -d --name insta centos:centos7 /sbin/init
```

### filezila 연동
```
yum install -y net-tools
yum install -y vim
yum install -y openssh-server

vim /etc/ssh/sshd_config => PermitRootLogin YES 바꾸기

passwd root - > 비번 설정하면 됨 (1234)
systemctl start sshd
systemctl enable sshd.service

# FTP
프로토콜 : SFTP - SSH
호스트 : 127.0.0.1
포트 : 5222
로그온 유형 : 일반
사용자 : root
비번 : 1234
```

### MariaDB 연동
```
yum -y install mariadb
yum -y install mariadb-server
systemctl status mariadb
systemctl start mariadb
systemctl enable mariadb
mysqladmin -u root -p password "1234" -> 치고 enter 그냥 누르면됨(이상한 말떠도 그냥 enter
누를것)


# insta에 root 권한 생성
mysql -u root -p -> 접속완료 (비번 1234)
CREATE USER 'insta'@'%' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON *.* TO 'insta'@'%';

# HeidiSQL
host : 127.0.0.1
사용자 : insta
암호 : 1234
포트 : 3306
```

### Node.js 설치
```
//epel 저장소 확인
yum repolist 

//epel 없는 경우 설치
yum install epel-release

//node.js 설치
curl -sL https://rpm.nodesource.com/setup_16.x | bash -
yum -y install nodejs
```

### 아무 위치에다가 git clone
```
git clone https://github.com/seunghwan94/DockerVueInsta.git
```

### npm 실행
```
npm i
```

### config.json 생성 (ipconfig 해서 나온 ip 주소로 수정할 것)
```
{
    "database": {
      "host" :"127.0.0.1",
        "port":"3306",
        "user":"root",
        "password":"1234",
        "database":"insta"
    },
    "backServer": {
      "host": "http://172.20.10.3",
      "port": 3000
    },
    "frontServer": {
        "host": "http://172.20.10.3",
        "port": 8080
    }
}
```

### 실행 방법
```
//front
npm rum serve

//back
node api/app.js
```



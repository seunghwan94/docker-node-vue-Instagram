<template>
    <img alt="Vue logo" src="../assets/test.png">
      <div class="login">
        <div class="login-group">
            <span>ID</span>
            <input v-model="userId" type="text" class="login-id" placeholder="UserID" aria-label="UserID">
        </div>
        <div class="login-group">
            <span>PW</span>
            <input v-model="userPw" type="password" class="login-pw" placeholder="UserPW" aria-label="UserPW">
        </div>
        <div class="login-group">
            <button @click="login">로그인</button>
        </div>
        <div class="login-group" style="justify-content:space-between;font-size: 13px;">
            <a href="#" @click="is_set=1" style="color:gray">아이디/비밀번호 찾기</a>
            <a href="#" @click="is_set=2" style="color:gray">회원 가입</a>
        </div>
      </div>
</template>
<script>
export default {
    data() {
        return{
            userId: '',
            userPw: '',
        }
    },
    methods:{
        login(){
            this.$emit('login',this.userId,this.userPw);
        }
    },  
    props:{
        id:String,
        pw:String,
    }
}
</script>
<style>
    .contain {
  margin: 20px auto;
  background: white;
  border: 2px solid gray;
  border-radius: 15px;
  height: calc(93vh - 44px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  max-width: 800px; 
  min-width: 360px; 
}
.contain img {
  width: 25%;
}



.login-group {
    display: flex;
    align-items: center;
    margin: 5px;
    width: 100%; /* 부모 요소의 너비에 맞게 조정 */
    max-width: 300px; /* 최대 너비 설정 */
    justify-content: flex-end;
    color: #fff;
}
.login-group span {
    background: gray;
    padding: 5px;
    font-size: 17px;
    border-radius: 5px 0 0 5px;
    display: inline-block;
    width: 50px;
    text-align: center;
    font-weight: bold;
}
.login-group input {
    padding: 3px;
    font-size: 17px;
    border-radius: 0 5px 5px 0;
    /* border: 1px solid transparent; */
    border: 2px solid gray;
    width: calc(100% - 50px - 2px); /* 부모 요소의 너비에서 span 너비와 여백을 뺀 값 */
    margin-left: -1px; /* 테두리가 겹치지 않도록 조정 */
}
.login-group button {
    width: 100%;
    font-size: 17px;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid transparent;
    cursor: pointer; /* 커서 변경 */
    background:  gray;
    color: #fff;
    font-weight: bold;
    margin-top: 20px;
}
</style>
<template>
      <div class="login">
        <div class="login-group">
            <span>ID</span>
            <input type="text" v-model="userId" class="login-id" placeholder="아이디" aria-label="UserID">
        </div>
        <div class="login-group">
            <span>PW</span>
            <input type="password" v-model="userPw" class="login-pw" placeholder="비밀번호" aria-label="UserPW">
        </div>
        <div class="login-group">
            <span style="width: 60px;">Name</span>
            <input type="text" v-model="userName" class="login-name" placeholder="이름">
        </div>
        <div class="login-group">
            <span style="width: 90px;">BirthDay</span>
            <input type="text" v-model="userBirth" class="login-birth" placeholder="생년월일 (ex. 940327)">
        </div>
        <div class="login-group">
            <button @click="signUp">회원가입</button>
        </div>
        <div class="login-group" style="justify-content:center;font-size: 13px;">
            <a href="#" @click="$emit('isLogin',0)" style="color:gray">뒤로가기</a>
        </div>
      </div>
</template>
<script>
export default {
    data() {
        return{
            userId: '',
            userPw: '',
            userName: '',
            userBirth: '',
        }
    },
    methods:{
        signUp(){
            // 유효성 검사
            if (!this.userId) {
                alert('아이디를 입력하세요.');
                return;
            }
            if (!this.userPw) {
                alert('비밀번호를 입력하세요.');
                return;
            }
            if (!this.userName) {
                alert('이름을 입력하세요.');
                return;
            }
            const birthPattern = /^\d{6}$/;
            if (!birthPattern.test(this.userBirth)) {
                alert('생년월일은 6자리 숫자여야 합니다 (예: 940327).');
                return;
            }
            this.$emit('signUp',this.userId,this.userPw,this.userName,this.userBirth);
        }
    },  
}
</script>
<style>



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
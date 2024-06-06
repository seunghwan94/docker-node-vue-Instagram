<template>
  <div v-if="!login" class="contain">
    <img class="logo" alt="insta logo" src="./assets/img/logo.png">
    <div></div>
    <transition name="slide-fade" mode="out-in">
      <div :key="is_login">
        <LoginSignIn v-if="is_login==0" :id="id" :pw="pw" @signIn="signIn" @isLogin="isLogin"/>
        <LoginSignUp v-if="is_login==1" @signUp="signUp"  @isLogin="isLogin"/>
        <LoginSearch v-if="is_login==2" @isLogin="isLogin"/>
      </div>
    </transition>
  </div>
  <div v-else class="contain">
    <MainContain />
  </div>
</template>

<script>
import LoginSignIn from './components/LoginSignIn.vue';
import LoginSignUp from './components/LoginSignUp.vue';
import LoginSearch from './components/LoginSearch.vue';
import MainContain from './components/MainContain.vue';
import axios from 'axios';

export default {
  name: 'App',
  data(){
    return{
      login: false,
      is_login: 0,
      id: '',
      pw: '',
      // error:''
    }
  },
  methods: {
    // 로그인 화면 전환
    isLogin(n){
      this.is_login=n;
    },
    // 로그인
    signIn(userId,userPw){

      if (!userId) {
        this.error = '아이디를 입력하세요.';
        return;
      }
      if (!userPw) {
        this.error = '비밀번호를 입력하세요.';
        return;
      }
        const userData = {
            id: this.id,
            pw: this.pw,
        };

        axios.post(BackURL+'/login', userData)
        .then(response => {
            console.log(response.data[0].id)
            sessionStorage.setItem('id', response.data[0].id);
            sessionStorage.setItem('user_id',this.id);
            sessionStorage.setItem('user_pw',this.pw);
        
            this.$router.push('/chat/main');
        })
        .catch(error => {
            // 회원가입 실패 처리
            console.error('로그인 실패:', error);
            this.error = error.response.data
            return;
        });
      this.login=true;
    },
    // 회원가입
    signUp(a,b){
      console.log(a);
      console.log(b);
      this.is_login=0;
    }
  },
  components: {
    LoginSignIn,
    LoginSignUp,
    LoginSearch,
    MainContain,
  }
}
</script>

<style>
body{
  margin:0px;
  padding: 20px;
  box-sizing: border-box;
  background: gray;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
.contain {
  margin: 0 auto;
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
  position: relative; 
}
.contain .logo {
  width: 25%;
}

/* Transition Styles */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.logo {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  max-width: 225px; /* 원하는 크기로 조정 */
  min-width: 195px;
  z-index: 1000; /* 다른 요소 위에 표시되도록 설정 */
}
</style>

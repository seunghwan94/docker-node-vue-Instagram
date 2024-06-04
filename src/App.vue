<template>
  <div v-if="is_login==0" class="contain">
      <loginMain :id="id" :pw="pw" @login="login"/>
  </div>
  
</template>

<script>
import loginMain from './components/loginMain.vue';
export default {
  name: 'App',
  data(){
    return{
      is_login: 0,
      id: '',
      pw: '',

    }
  },
  methods: {
    login(a,b){
      console.log(a);
      console.log(b);
    }
  },
  components: {
    loginMain,
  }
}
</script>

<style>
body{
  margin:0px;
  padding: 0px;
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

</style>

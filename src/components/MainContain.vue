<template>
    <div class="main-header">
        <div class="main-button">Cancel</div>
        <div><img class="header-logo" alt="insta logo" src="../assets/img/logo.png"></div>
        <div class="main-button">Next</div>
    </div>
    <div class="main-body">
        <MainPost />
    </div>
    <div class="main-footer" style="justify-content: space-around;">
        <font-awesome-icon class="icon" :icon="['fas', 'house']" style="color:gray" size="2xl"  />
        <font-awesome-icon class="icon" :icon="['fas', 'plus-square']" flip="horizontal" size="2xl" @click="is_set=1"/>
        <font-awesome-icon class="icon" :icon="['fas', 'user']" size="2xl" @click="is_set=3"/>
    </div>
</template>
<script>
import MainPost from './MainPost.vue';

export default {
    components:{
        MainPost,
    }
}
</script>
<style >
.main-header, .main-footer{
    display:flex;
    /* background: rgb(200, 200, 200); */
    height: 55px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}
.main-header {
    border-radius: 13px 13px 0 0 ;
}
.main-footer {
    border-radius: 0 0 13px 13px ;
}

.main-button {
    padding: 17px;
    cursor: pointer;
    font-weight: bold;
    color:rgb(129, 129, 132);
}
.main-header div img{
    width: 30px;
}
.main-body {
    height: 100%;
    width: 100%;
}
.icon{
    color: gray;
    cursor: pointer;
}
</style>
<template>
    <div class="post-header">
        <img class="post-logo" alt="insta logo" src="../assets/img/cat.png">
        <h3>test</h3>
    </div>
    <div class="post-body"></div>
    <div class="post-footer">
        <div class="post-like" style="">
            <font-awesome-icon class="icon" :icon="['fas', 'heart']"  @click="is_set=0"/>
            <font-awesome-icon class="icon" :icon="['far', 'heart']"  @click="is_set=0"/>
            8 likes</div>
        <div class="post-main">main-text</div>
        <div class="post-sub">내용</div>
        <div class="post-date">May 15</div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
.post-header {
    display: flex;
    align-items: center;
}
.post-logo {
    padding:20px;
    border-radius: 50%;
    width: 50px;
}
.post-body {
  background-image: url("../assets/img/dog.png");
  height: 450px;
  background-position: center;
  background-size: cover;
}
.post-footer {
    margin-left: 20px;
    padding-top:15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.post-main, .post-sub, .post-date, .post-like {
    margin:0;
}
.post-main {
    font-weight: bold;
}
.post-sub {
    padding:5px;
    font-size: 15px;
}
.post-date {
    padding:5px;
    font-size: 13px;
    color: gray;
}
.post-like{
    display: flex;
    width: 90%;
    justify-content: flex-end;
    padding:5px;
    font-size: 13px;
    color: gray;
}
</style>
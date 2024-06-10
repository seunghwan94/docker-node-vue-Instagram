<template>
    <div class="post-header">
        <!-- {{post}} -->
        <img v-if="post.post_img" class="post-user-img" alt="post user img" :src="require(`../assets/img/${post.post_img}`)">
        <h3>{{ post.user_name }}</h3>
    </div>
    <div class="post-body">
        <img v-if="post.post_img" class="post-image" :class="post.post_filter" :src="require(`../assets/img/${post.post_img}`)" alt="Post Image">
    </div>
    <div class="post-footer">
        <div class="post-like" style="">
            <font-awesome-icon class="icon" :icon="['fas', 'heart']"  @click="is_set=0"/>
            <font-awesome-icon class="icon" :icon="['far', 'heart']"  @click="is_set=0"/>
            8 likes</div>
        <div class="post-main">{{post.post_maintext}}</div>
        <div class="post-sub">{{ post.post_subtext }}</div>
        <div class="post-date">{{ post.post_insertdate }}</div>
    </div>
</template>
<script>
export default {
    props:{
        post:Object
    },
}
</script>
<style>
.post-header {
    display: flex;
    align-items: center;
}
.post-user-img {
    padding:20px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    object-fit: cover;
}
.post-body {
  /* background-image: url("../assets/img/dog.png"); */
  height: 450px;
  background-position: center;
  background-size: cover;
}
.post-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
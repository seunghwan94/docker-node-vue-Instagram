<template>
    <div class="post-header">
        <!-- {{post}} -->
        <div style="display: flex; align-items: center;">
            <img v-if="post.post_img" class="post-user-img" alt="post user img" :src="require(`../assets/img/${post.user_img}`)">
            <h3>{{ post.user_name }}</h3>
        </div>
        <div style="position: relative; width: 50px; cursor: pointer;">
            <font-awesome-icon class="icon" :icon="['fas', 'ellipsis-vertical']" @click="toggleMenu"/>
            <div v-if="showMenu" class="menu">
                <div @click="editPost">수 정</div>
                <div @click="deletePost">삭 제</div>
            </div>
        </div>
    </div>
    <div class="post-body">
        <img v-if="post.post_img" class="post-image" :class="post.post_filter" :src="require(`../assets/img/${post.post_img}`)" alt="Post Image">
    </div>
    <div class="post-footer">
        <div class="post-like" style="">
            <font-awesome-icon class="icon" :icon="['fas', 'heart']" @click="is_set=0"/>
            <font-awesome-icon class="icon" :icon="['far', 'heart']" @click="is_set=0"/>
            8 likes
        </div>
        <div class="post-main">{{ post.post_maintext }}</div>
        <div class="post-sub">{{ post.post_subtext }}</div>
        <div class="post-date">{{ formattedDate }}</div>
    </div>
</template>

<script>
export default {
    props: {
        post: Object
    },
    data() {
        return {
            showMenu: false
        };
    },
    computed: {
        formattedDate() {
            if (this.post && this.post.post_insertdate) {
                const date = new Date(this.post.post_insertdate);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}.${month}.${day}`;
            }
            return '';
        }
    },
    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        editPost() {
            this.showMenu = false;
            this.$emit('modify_post',this.post);
            alert('수정하기 클릭됨');
        },
        deletePost() {
            this.showMenu = false;
            this.$emit('delete_post',this.post);
            alert('삭제하기 클릭됨');
        }
    }
}
</script>

<style>
.post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.post-user-img {
    padding: 20px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    object-fit: cover;
}
.post-body {
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
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.post-main, .post-sub, .post-date, .post-like {
    margin: 0;
}
.post-main {
    font-weight: bold;
}
.post-sub {
    padding: 5px;
    font-size: 15px;
}
.post-date {
    padding: 5px;
    font-size: 13px;
    color: gray;
}
.post-like {
    display: flex;
    width: 90%;
    justify-content: flex-end;
    padding: 5px;
    font-size: 13px;
    color: gray;
}
.menu {
    position: absolute;
    top: 20px;
    right: 0;
    width: 60px;
    background: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
    display: flex;
    flex-direction: column;    
    border-radius: 5px;
}
.menu div {
    padding: 10px;
    cursor: pointer;
}
.menu div:hover {
    background: #f0f0f0;
}
</style>

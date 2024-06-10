<template>
    <div class="main-profile-contain">
        
        <img :src="require(`../assets/img/${profile[0].img}`)" style="width:40%; border-radius: 50%; cursor: pointer;">


        <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="login-group">
                <span>ID</span>
                <input v-model="profile[0].user_id" type="text" class="login-id" placeholder="UserID" aria-label="UserID" readonly>
            </div>
            <div class="login-group">
                <span>PW</span>
                <input v-model="profile[0].user_pw"  type="text" class="login-pw" placeholder="UserPW" aria-label="UserPW">
            </div>
            <div class="login-group">
                <span style="width: 70px;">Name</span>
                <input v-model="profile[0].name"  type="text" class="login-name" placeholder="name" aria-label="name">
            </div>
            <div class="login-group">
                <span>Birth</span>
                <input v-model="profile[0].birth" type="text" class="login-birth" placeholder="birth" aria-label="birth">
            </div>
            <div class="login-group">
                <span style="width: 90px;">Comments</span>
                <input v-model="profile[0].comments" type="textarea" class="login-comments" placeholder="comments" aria-label="comments">
            </div>

            <div class="login-group">
                <button @click="$emit('profileEdit', profile[0])">회원 정보 수정</button>
            </div>
        </div>
    </div>
</template>

<script>


export default {
 props:{
    myProfile:Object,
 },
 data() {
        return {
            profile: { ...this.myProfile },
        };
    },
}
</script>

<style>
.main-profile-contain {
    background: #ffffff;
    padding: 15px;
    align-items: center;
    height: 95%;
}
</style>
<template>
    <div class="main-header">
        <div v-if="is_main==1" class="main-button" @click="is_main=0" >Cancel</div>
        <div v-else-if="is_main==2" class="main-button" @click="is_main=1" >Back</div>
        <div v-else ></div>

        <div><img class="header-logo" alt="insta logo" src="../assets/img/logo.png"></div>
        <div v-if="is_main==1" class="main-button" @click="is_main=2" >Next</div>
        <div v-else-if="is_main==2" class="main-button" @click="updatePost" >Complet</div>
        <div v-else ></div>
    </div>
    <div class="main-body">
        <div v-if="is_main==0" >
            <div v-if="postList[0]">
                <MainPost v-for="(a,i) in postList" :key="i" :post="a"/>
            </div>
            <div v-else style="display: flex;align-items: center;justify-content: center;height: 75vh;color: gray;font-weight: bold;">게시글이 없습니다.</div>
        </div>
        <MainPostCreateImg v-if="is_main==1" :updateImg="updateImg" :filter="filter" @updateFilter="updateFilter"/>
        <MainPostCreateText v-if="is_main==2" :updateImg="updateImg" :filter="filter" @updateText="updateText"/>
        <MainProfile v-if="is_main==3" :myProfile="myProfile" @click="load_profile" @profileEdit="profileEdit"/>
    </div>
    <div class="main-footer" style="justify-content: space-around;">
        <font-awesome-icon class="icon" :icon="['fas', 'house']" style="color:gray" size="2xl"  @click="is_main=0"/>

        <font-awesome-icon class="icon" :icon="['fas', 'plus-square']" flip="horizontal" size="2xl" @click="uploadButton"/>
        <input @change="upload" type="file" id="file" ref="fileInput" style="display: none;" />

        <font-awesome-icon class="icon" :icon="['fas', 'user']" size="2xl" @click="load_profile"/>
    </div>
</template>
<script>
import MainPost from './MainPost.vue';
import MainPostCreateImg from './MainPostCreateImg.vue';
import MainPostCreateText from './MainPostCreateText.vue';
import MainProfile from './MainProfile.vue';
import axios from 'axios';
import { BackURL } from '../main.js';

export default {
    data(){
        return{
            id: sessionStorage.getItem('id'),

            postList:[],
            myProfile:[],
            is_main: 0,

            updateImg : '',
            filter: '',
            mainText: '',
            subText: '',
            
            file: '',
        }
    },
    mounted() {
        this.loadPost();
    },
    methods:{
        load_profile() {
            const userData = {
                id: this.id
            };

            axios.post(`${BackURL}/load_profile`, userData)
                .then(response => {
                    this.myProfile = response.data;
                    this.is_main = 3;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        loadPost() {
            axios.post(`${BackURL}/load_post`, {}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                this.postList = [];
                this.postList = this.postList.concat(response.data);
                
            })
            .catch(error => {
                console.error(error);
            });
        },
        profileEdit(updatedUser) {
            // 업데이트된 사용자 정보를 처리
            console.log(updatedUser);
            alert('회원 정보를 변경 하시겠습니까?');
            
            axios.post(BackURL+'/updateProfile', updatedUser)
                .then(response => {
                    console.log('Profile updated successfully', response);
                    this.is_set=0;
                    alert('회원 정보가 변경 되었습니다.');
                    this.loadProfile();
                })
                .catch(error => {
                    console.error('Error updating profile:', error);
                });
        },
        uploadButton() {    
            this.$refs.fileInput.click();
        },
        upload(event) {
            
            const file = event.target.files[0];
            let url = URL.createObjectURL(file);
            this.file=file;
            if (url) {
                // 파일 업로드 로직 추가
                this.updateImg = url
                this.is_main = 1;
            }
        },
        updateFilter(filter){
            this.filter = filter;
        },
        updateText({ mainText, subText }) {
            this.mainText = mainText;
            this.subText = subText;
        },
        postImgDown() {
            const formData = new FormData();
            formData.append('image', this.file);

            axios.post(BackURL+'/postImgDown', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                
                console.log(response.data.split('/').pop());
                this.updateImgName = response.data.split('/').pop();
                
            })
            .catch(error => {
                console.error(error);
            });
        },


        updatePost() {
            const formData = new FormData();
            formData.append('image', this.file);

            axios.post(BackURL+'/postImgDown', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {                
                const userData = {
                    user_id: this.id,
                    updateImg: response.data.split('/').pop(),
                    maintext: this.mainText,
                    subtext: this.subText,
                    filter: this.filter
                };

                axios.post(BackURL+'/create_post', userData)
                .then(response => {
                    console.log(response.data[0].id)
                    alert('포스팅 성공');
                    
                    setTimeout(() => {
                        this.loadPost();
                        this.is_main = 0;
                    }, 1000);
                    
                    
                })
                .catch(error => {
                    // 회원가입 실패 처리
                    console.log( error.response.data);
                    alert('포스팅 오류 \n' +error.response.data);
                    return;
                });

            })
            .catch(error => {
                console.error(error);
                alert('게시글 업로드 error');
            });
        },
    },
    components:{
        MainPost,
        MainPostCreateImg,
        MainPostCreateText,
        MainProfile,
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
    overflow-y: auto;
}
.icon{
    color: gray;
    cursor: pointer;
}
</style>
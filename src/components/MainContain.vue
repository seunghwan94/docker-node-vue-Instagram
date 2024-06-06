<template>
    <div class="main-header">{{updateImg}}
        <div v-if="is_main==1" class="main-button" @click="is_main=0" >Cancel</div>
        <div v-else-if="is_main==2" class="main-button" @click="is_main=1" >Back</div>
        <div v-else ></div>

        <div><img class="header-logo" alt="insta logo" src="../assets/img/logo.png"></div>
        <div v-if="is_main==1" class="main-button" @click="is_main=2" >Next</div>
        <div v-else-if="is_main==2" class="main-button" @click="updatePost" >Complet</div>
        <div v-else ></div>
    </div>
    <div class="main-body">
        <MainPost v-if="is_main==0"/>
        <MainPostCreateImg v-if="is_main==1" :updateImg="updateImg" :filter="filter" @updateFilter="updateFilter"/>
        <MainPostCreateText v-if="is_main==2" :updateImg="updateImg" :filter="filter" @updateText="updateText"/>
        <MainPost v-if="is_main==3"/>
    </div>
    <div class="main-footer" style="justify-content: space-around;">
        <font-awesome-icon class="icon" :icon="['fas', 'house']" style="color:gray" size="2xl"  @click="is_main=0"/>

        <font-awesome-icon class="icon" :icon="['fas', 'plus-square']" flip="horizontal" size="2xl" @click="uploadButton"/>
        <input @change="upload" type="file" id="file" ref="fileInput" style="display: none;" />

        <font-awesome-icon class="icon" :icon="['fas', 'user']" size="2xl" @click="is_main=2"/>
    </div>
</template>
<script>
import MainPost from './MainPost.vue';
import MainPostCreateImg from './MainPostCreateImg.vue';
import MainPostCreateText from './MainPostCreateText.vue';
import axios from 'axios';
import { BackURL } from '../main.js';

export default {
    data(){
        return{
            id: sessionStorage.getItem('id'),

            postList:[],
            is_main: 0,

            updateImg : '',
            filter: '',
            mainText: '',
            subText: '',
            
            file: '',
        }
    },
    methods:{
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
                
                    this.login=true;
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
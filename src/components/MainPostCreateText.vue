<template >
    <div class="upload-image" :class="filter" :style="{ backgroundImage: `url(${updateImg})`}" ></div>
    <div class="write">
        <textarea class="write-box" v-model="mainText" @input="emitText">제목</textarea>
        <textarea class="write-box" v-model="subText" @input="emitText">내용</textarea>
    </div>
</template>
<script>
export default {
    data() {
        return {
            mainText: '',
            subText: '',
        };
    },
    props: {
        filter:String,
        updateImg: String,
    },
    methods: {
        emitText() {
            this.$emit('updateText', { mainText: this.mainText, subText: this.subText });
        },
    },
}
</script>
<style>
    .write-box {
    border: none;
    width: 90%;
    height: 100px;
    padding: 15px;
    margin: auto;
    display: block;
    outline: none;
}
</style>

<template>
    <div>
        <div class="upload-image" :class="filter" :style="{ backgroundImage: `url(${computedImgUrl})`}"></div>
        <div class="write">
            <div style="margin: 10px 0 10px 25px; font-weight: bold;">제목</div>
            <textarea class="write-box-main" v-model="mainText" @input="emitText"></textarea>
            <div style="margin: 10px 0 10px 25px; font-weight: bold;">내용</div>
            <textarea class="write-box-sub" v-model="subText" @input="emitText"></textarea>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mainText: this.initialMainText || '',
            subText: this.initialSubText || '',
        };
    },
    computed: {
        computedImgUrl() {
            if (this.updateImg.startsWith('blob:')) {
                return this.updateImg;
            } else {
                try {
                    return require(`../assets/img/${this.updateImg}`);
                } catch (e) {
                    console.error('Failed to require image:', e);
                    return '';
                }
            }
        }
    },
    props: {
        filter: String,
        updateImg: String,
        initialMainText: String,
        initialSubText: String
    },
    methods: {
        emitText() {
            this.$emit('updateText', { mainText: this.mainText, subText: this.subText });
        },
    },
}
</script>

<style>
.write {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.write-box-main {
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 90%;
    height: 20px;
    padding: 10px;
    margin: 0 0 0 25px;
    resize: none;
    outline: none;
    font-size: 16px;
}
.write-box-sub {
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 90%;
    height: 150px;
    padding: 10px;
    margin: 0 0 0 25px;
    resize: none;
    outline: none;
    font-size: 16px;
}
</style>

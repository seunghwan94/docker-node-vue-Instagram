<template >
    <div class="upload-image" :class="filter" :style="{ backgroundImage: `url(${updateImg})`}" ></div>
    <div class="write">
        <div style="margin: 10px 0 10px 25px;font-weight: bold;">제목</div>
        <textarea class="write-box-main" v-model="mainText" @input="emitText">제목</textarea>
        <div style="margin: 10px 0 10px 25px;font-weight: bold;">내용</div>
        <textarea class="write-box-sub" v-model="subText" @input="emitText">내용</textarea>
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
.write {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.write-box-main {
  border: 1px solid #ccc; /* 테두리 스타일 지정 */
  border-radius: 5px; /* 테두리 둥글게 만듦 */
  width: 90%; /* 너비 100% */
  height: 20px; /* 높이 150px */
  padding: 10px; /* 안쪽 여백 설정 */
  margin: 0 0 0 25px;
  resize: none; /* 크기 조절 비활성화 */
  outline: none; /* 포커스 시 테두리 제거 */
  font-size: 16px; /* 폰트 크기 설정 */
}
.write-box-sub {
  border: 1px solid #ccc; /* 테두리 스타일 지정 */
  border-radius: 5px; /* 테두리 둥글게 만듦 */
  width: 90%; /* 너비 100% */
  height: 150px; /* 높이 150px */
  padding: 10px; /* 안쪽 여백 설정 */
  margin: 0 0 0 25px;
  resize: none; /* 크기 조절 비활성화 */
  outline: none; /* 포커스 시 테두리 제거 */
  font-size: 16px; /* 폰트 크기 설정 */
}
</style>

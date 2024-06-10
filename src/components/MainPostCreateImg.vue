<template >
    <div class="upload-image" :class="filter" :style="{ backgroundImage: `url(${computedImgUrl})`}"></div>
    <div class="filters">
        <div v-for="(a, i) in filters" :key="i" class="filter-item" :class="a" @click="selectFilter(a)" :style="{ backgroundImage: `url(${computedImgUrl})`}"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            filters: ["", "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson",
                      "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua",
                      "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],
        }
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
    methods: {
        selectFilter(filter) {
            this.$emit('updateFilter', filter);
        }
    },
    props: {
        updateImg: String,
        filter: String,
    }
}

</script>
<style >
.upload-image{
    width: 100%;
    height: 450px;
    background-size : cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}
.filters{
    overflow-x:scroll;
    white-space: nowrap;
}
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color : white;
  background-size: cover;
  background-position : center;
}

.filters::-webkit-scrollbar {
    height: 5px;
}
.filters::-webkit-scrollbar-track {
    background: #f1f1f1; 
}
.filters::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
    background: #555; 
}

</style>
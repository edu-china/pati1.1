<template>
  <div class="contentText" ref="hidewrap" :class="{cut:isCut}">
    <div v-html="html" ref="textwrap" class="textwrap"></div>
    <div class="slideopen" @click="slideopen" v-show="isCut">展开阅读更多<i></i></div>
  </div>
</template>

<script>
  export default {
    name:'contenter',
    data() {
      return {
        isCut:true
      }
    },
    props:{
      html:String
    },
    created() {
    },
    methods: {
      slideopen(){
        this.isCut = false;
      }
    },
    mounted(){
      var imgs = this.$refs.textwrap.querySelectorAll('img');
      for (let i=0;i< imgs.length;i++) {
        imgs[i].style="max-width:100%"
      }
      let a = this.$refs.hidewrap.clientHeight;
      let b = this.$refs.textwrap.clientHeight;
      if(a>=b) this.slideopen();
    }
  }
</script>

<style scoped>
.contentText{  position: relative; }
.textwrap img{ max-width: 100%; width: 100px;}
.cut{max-height: 8rem; overflow: hidden;}
.slideopen{ position: absolute; background:-webkit-linear-gradient(rgba(255, 255, 255, .2),rgba(255, 255, 255, .8), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1)); height: .9rem; line-height: .9rem; text-align: center; bottom: 0; width: 100%; left:0; padding-top: .9rem;}
</style>

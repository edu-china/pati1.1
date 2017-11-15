<template>
  <div class="headportrait">
    <img :src="getframe()" class="headframe" v-if="getframe()"/>
    <img :src="this.src" class="headimg"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props:{
    src:String
  },
  created() {},
  methods: {
    getframe() {
      if(this.src.indexOf("?")>=0){
        var reg = new RegExp("(^|&)frame=([^&]*)(&|$)", "i");
        var r = this.src.split("?")[1].match(reg);
        if (r != null) return unescape(r[2]);
      }
      return null;
    }
  }
}
</script>

<style scoped>
.headportrait{font-size: 0; position:absolute;}
.headportrait img{position: absolute; top: 0; left: 0}
.headimg{ width: 100%; height: 100%;border-radius:50%;}
.headframe{ width:152%; height: 152%;transform:translate(-20%,-20%); z-index: 1}
</style>

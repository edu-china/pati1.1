<template>
  <div>
    <div class="imgw">
      <img :src="imgs[0]" />
    </div>
    <div class="imgw info">
      <img :src="imgs[1]" />
      <div class="codew">
        <div class="tit px30">我的邀请码</div>
        <div class="code">
          <span>{{myInviteCode}}</span>
        </div>
        <div class="desc">
          填写邀请码，赠送1爬梯币！
        </div>
      </div>
    </div>
    <div class="imgw">
      <img :src="imgs[2]" />
    </div>
    <div class="imgw">
      <img :src="imgs[3]" />
    </div>
    <div class="imgw">
      <img :src="imgs[4]" />
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import img1 from '../../../assets/images/inv/1.png'
import img2 from '../../../assets/images/inv/2.png'
import img3 from '../../../assets/images/inv/3.png'
import img4 from '../../../assets/images/inv/4.png'
import img5 from '../../../assets/images/inv/5.png'
import bottom from '../../base/footer_load.vue'
export default {
  data() {
    return {
      imgs:[img1,img2,img3,img4,img5],
      myInviteCode:'-------'
    }
  },
  components:{bottom},
  props:{},
  created() {
    this.$http.get('Member/inviteCode/userId/'+this.$route.params.uid).then(response=>{
      //response.data;
      this.myInviteCode = response.data.myInviteCode;
    });
  },
  methods: {}
}
</script>

<style scoped>
.imgw img{width: 100%;}
.info{ position: relative;}
.info .codew{ position: absolute; width: 100%; height: 100%; left: 0; top: 0; text-align:center; overflow: hidden;}
.code{padding-top:.2rem}
.code span{ font-size: .52rem; color: #f65050; font-weight: bold;}
</style>

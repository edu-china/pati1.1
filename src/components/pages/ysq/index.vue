<template>
  <div class="bg">
    <div class="index" v-if="showIndex">
      <img :src="imgs.topic1" class="topic1"/>
      <div class="form">
        <dl>
          <dt><input type="tel" class="textinput" placeholder="输入您的手机号" v-model.lazy="tel"/></dt>
          <dd><input type="button" class="btn" value="领取你的压岁钱" @click="getYsq"/></dd>
        </dl>
      </div>
    </div>
    <div class="res" v-if="showRes">
      <div class="resw">
        <div style="text-align:center">
          <img :src="imgs.topic2" class="topic2"/>
        </div>
        <dl class="resbox">
          <dd class="restop">
            <div class="jiang"><big>{{yasuiqian}}</big>爬梯币</div>
            <div>已放入爬梯朗读app我的宝箱中</div>
          </dd>
          <dt><img :src="imgs.spline"/></dt>
          <dd class="resbot">
            <div style="text-align:center" v-show="showbtns">
              <input class="ybtn" type="button" value="花压岁钱" v-show="iswx" @click="godown"/>
            </div>
            <div style="text-align:center" v-show="showbtns">
              <input class="sbtn" type="button" value="分享给朋友再领一份" @click="showshare=true"/>
            </div>
            <div class="over" v-show="!showbtns">
              今日机会已用完，明日再来
            </div>
          </dd>
        </dl>
      </div>
    </div>
    <div>
      <img :src="imgs.bottom" class="bottom"/>
    </div>
    <div class="sharecover" v-show="showshare" @click="showshare=false">
      <img :src="imgs.share" alt="">
    </div>
  </div>
</template>

<script>
// import myhead from '@/components/base/header'
import topic1 from '../../../assets/images/ysq/topic1.png'
import topic2 from '../../../assets/images/ysq/topic.png'
import bottom from '../../../assets/images/ysq/botom.png'
import spline from '../../../assets/images/ysq/split.png'
import share from '../../../assets/images/ysq/share.png'
export default {
  data() {
    return {
      imgs:{topic1:topic1,topic2:topic2,bottom:bottom,spline:spline,share:share},
      showshare:false,
      showIndex:true,
      showRes:false,
      tel:'',
      yasuiqian:'--',
      showbtns:true,
      iswx:/MicroMessenger/.test(window.navigator.userAgent),
      token:this.$route.query.token
    }
  },
  components:{
  },
  props:{},
  created() {
    this.$http.get('yasuiqian/index?token='+this.token).then(resp=>{
      console.log('首页');
    })
  },
  methods: {
    godown(){
      location.href="http://pati.edu-china.com/weixin"
    },
    showSuc(num){
        this.showIndex=false;
        this.showRes = true;
        this.yasuiqian = num;
    },
    getYsq(){
      let vtel = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(this.tel);
      if(vtel){
        App.showToast({
          icon:'loading',
          title:'正在领取'
        });
        this.$http.get('/weixin/yasuiqian/recv?mobile='+this.tel+'&token='+this.token).then(resp=>{
          let data = resp.data;
          let yasuiqian = data.yasuiqian;
          switch(data.left_share_times-0){
            case 1:
              this.showSuc(yasuiqian);
            break;
            case 2:
              this.showSuc(yasuiqian);
            default:
              App.showToast({
                icon:'warning',
                title:'领取失败'
              });
          }
        });
      }else{
        App.showToast({
          icon:'warning',
          title:this.tel?'手机号码有误':'请出入手机号'
        })
      }
    }
  }
}
</script>

<style scoped>
.bg{
  background-color: #e60100;
  height: 100%;
}

.index, .res{
  position: relative;
  height: 100%;
  background-size: 100% auto;
  background-position: top center;
  background-repeat: no-repeat;
}
.index{background-image: url(../../../assets/images/ysq/bg1.png); }
.res{background-image: url(../../../assets/images/ysq/bg2.png); }

.topic1{
  width: 2.59rem;
  position: absolute;
  left: 50%;
  margin-left: -.83rem;
  top: 7%
}
.topic2{
  width: 5.58rem;
}
.form{
  position: absolute;
  width: 100%;
  background: url(../../../assets/images/ysq/botop.png) top center no-repeat;
  background-size: 100% auto;
  bottom:0;
  padding-top: .8rem;
}
.form dl{
  background-color: #c20100;
  text-align: center;
  padding-bottom: 1.2rem;
  padding-top: .2rem;
}
.form dl dt{ padding: .15rem 0;}
.form .textinput{ 
  height: .78rem;
  border-radius: .39rem; 
  width: 4.95rem; 
  font-size: .34rem;
  text-align: center;
}
.form .btn{
  height: .78rem;
  border-radius: .39rem; 
  width: 4.95rem;
  background-color: #ff9f00;
  color: #fff;
  font-size: .34rem;
}
.bottom{
  position: absolute;
  left: 50%;
  bottom: .4rem;
  margin-left:-2.24rem;
  width: 4.48rem;
  height:.49rem;
}
.resw{
  padding-top: 2rem;

}
.restop{
  text-align: center; 
}
.resbox{
  width: 5.3rem;
  margin: 0 auto;
  border-radius: .5rem;
  overflow: hidden;
  font-size: .26rem;
  color: #e75f00;
  margin-top: .54rem;
}
.resbox dd{
  background-color: #ffe1c8;
  padding: .3rem 0;
}
.resbox dt{ 
  line-height: 0;
}
.resbox dt img{ width: 100%;}
/* .resbox dd.restop{
  
} */
.resbox dd.resbot input{
  height: .76rem;
  text-align: center;
  width: 4.8rem;
  border-radius: .38rem;
  
}
.resbox .ybtn{
   background-color: #ff6900;
   color: #fff;
   font-size: .26rem;
}
.resbox .sbtn{
   background-color: #fff;
   border: 2px solid #ff6900;
   color:  #ff6900;
   font-size: .34rem;
   margin-top: .26rem;
}
.jiang{
  color: #c20100
}
.jiang big{font-size: .86rem;}
.sharecover{
  position: fixed;
  background-color: rgba(0, 0, 0, .7);
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}
.sharecover img{
  width: 3.59rem;
  height: 3.64rem;
  position: absolute;
  right: .4rem;
  top: .17rem;
}
.over{
  padding-right:1rem;
  background: url(../../../assets/images/ysq/fail.png) right center no-repeat;
  background-size:auto .9rem; 
  min-height: .9rem;
  margin:0 .4rem; 
}
</style>

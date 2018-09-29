<template>
 <div class="page">
   <div class="imgs" v-for="i in 3" :key="i">
     <img :src="require('../../../assets/images/distribution/'+i+'.png')" alt="">
     <a href="javascript:;" @click="downloadApp" v-if="i==3" class="downlink">查看更多请下载爬梯朗读APP</a>
   </div>
   <div class="login" v-show="showlogin">
     <div class="form">
       <img :src="imgs.login" alt="">
       <dl>
        <dd><input type="number" name="tel" id="tel" placeholder="请输入手机号" v-model="formdata.mobile"></dd>
          <dd>
            <input type="number" name="" id="" maxlength="6" max="6" placeholder="请输入验证码" v-model="formdata.sms_verifycode">
            <input type="button" :value="sendbtn.text" class="send" @click="sendcode" :disabled="sendbtn.disabled"/>
          </dd>
          <dt><input type="button" alt="" value="立即购买" @click="submit"/></dt>
       </dl>
     </div>
     <span class="close" @click="showlogin=false"></span>
   </div>
   <div class="cover" v-show="showlogin"></div>
   <div class="footer">
     <div class="fix">
       <img src="../../../assets/images/distribution/bot.png" alt="" class="bot">
       <span>超值特惠 ￥{{price}}元/年</span> 
       <a href="javascript:;" class="buy" @click="buy"><em>立即购买</em><img :src="imgs.arrow" alt=""></a>
     </div>
   </div>
 </div>
</template>

<script>

import {downloadApp} from '@/assets/scripts/utils.js'
export default {
  data () {
    return {
      imgs:{
        arrow:require('../../../assets/images/distribution/enter.png'),
        login:require('../../../assets/images/distribution/loginbg.png')
      },
      sendbtn: {
        disabled: false,
        text: "发送验证码"
      },
      formdata:{
        mobile:'',
        pic_verifycode:'',
        sms_verifycode:'',
        class_id:''
      },
      showlogin:false,
      price:0,
      item_id:0,
      online:false,
      channelid:0
    };
  },
  components: {},

  created(){
    let {id,wxuser} = this.$route.params;
    let wxuri = wxuser?'&wxuser='+wxuser:'';
    this.$http.get('itemDistribution/index?id='+id+wxuri).then(res=>{
      if(res.status==1){
        let ai = res.activityInfo;
        this.channelid = 'distribution_'+ai.id;
        this.price = ai.price;
        this.item_id = ai.item_id;
        this.online = ai.status==1;
      }else{
        App.showModal({
          title:res.message
        })
      }
    });
  },
  mounted() {

  },
  
  computed:{},

  methods: {
    downloadApp,
    timedown() {
      let total = 60;
      return new Promise((reslove, reject) => {
        let inv = setInterval(() => {
          this.sendbtn.text = --total + "s 重新发送";
          if (total <= 0) {
            clearInterval(inv);
            reslove();
          }
        }, 1000);
      });
    },
    verifytel(){
      let fd = this.formdata;
      if(!/^1[3456789]\d{9}$/.test(fd.mobile)){
        let msg = '手机号码有误！'
        if(!fd.mobile) msg = '请输入手机号码！'
        App.showToast({
          icon:'none',
          title:msg
        });
        return false;
      }
      return true;
    },
    verifyimg(v){
      if(/^[\dA-Za-z]{5}$/.test(v)){
        return true;
      }else{
        let msg = '图形验证码输入有误！';
        if(!v) msg = '请输入图形验证码'
        App.showToast({
          icon:'none',
          title:msg
        });
        return false;
      }
    },
    verify(){
      if(!this.verifytel()){
        return false;
      }
      let fd = this.formdata;
      if(!/^\d{6}$/.test(fd.sms_verifycode)){
        let msg = '短信验证码错误'
        if(!fd.sms_verifycode) msg = '请输入验证码'
        App.showToast({
          icon:'none',
          title:msg
        });
        return false;
      }
      return true;
    },
    sendcode() {
      if(!this.verifytel()) return;
      
      let resetbtn =()=>{
        this.sendbtn.disabled = false;
        this.sendbtn.text = "重新发送";
      }

      let send = ()=>{
        this.sendbtn.disabled = true;
        this.sendbtn.text = '正在发送';
        this.$http({
          url:'/public/sendSmsVerifycode',
          data:this.formdata,
          method:'POST',
          showLoading:false
        }).then(res=>{
          if(res.status==1){
            App.showToast({title:'验证码已发送'})
            this.timedown().then(resetbtn);
          }else{
            wx.showToast({title:res.message});
            resetbtn();
          }
        },resetbtn);
      }

      App.showModal({
        title:'请输入验证码',
        content:'<img title="'+this.host+'public/picVerifycode?" src="'+this.host+'public/picVerifycode" onclick="this.src=this.title+Math.random()"/>',
        showInput:true,
        showCancel:false,
        success:(b,v)=>{
          if(this.verifyimg(v)){
            this.formdata.pic_verifycode = v;
            send();
          }
        }
      });
      // this.axios.post('')
    },
    submit(){
      if(this.verify()){
        this.$http.post('account/mobileSmsLogin',this.formdata).then(res=>{
          let state = res.status;
          if(state==1){
            this.buy();
          }else{
            App.showToast({title:res.message})
          }
        });
      }
    },
    notLogin(status){
      if(status==512){
        this.showlogin = true;
      }
    },
    wxPay(){
      this.$router.push({
        name:'distribution',
        params:{channel:'distribution'},
        query:{
          itemId:this.item_id,
          channel:channelid
        }
      });
    },
    aliPay(){
      this.$http.get('trade/alipayInit?itemId='+this.item_id+'&channel='+this.channelid).then(data=>{
        if(data.status==1){
          window.location.href = data.payInfo;
        }else{
          App.showToast({title:res.message})
        }
      },this.notLogin);
    },
    buy(){
      if(!this.online){
        App.showToast({
          title:'该活动已下线',
          icon:'none'
        })
        return;
      }
      let ua = window.navigator.userAgent;
      if(/MicroMessenger/i.test(ua)){
        this.wxPay();
      }else{
        this.aliPay();
      }
    }
  }
}

</script>
<style>
::-webkit-input-placeholder {
  color :#C5CCCF;
}
:-moz-placeholder{
  color:#C5CCCF
}
::-moz-placeholder{
  color:#C5CCCF
}
:-ms-input-placeholder {
  color:#C5CCCF
}
</style>

<style lang='stylus' scoped>
@import '../../../assets/stylus/fun.stylus'

.page
  background-color #00c4ff
.login
  position fixed
  top 50%
  left 50%
  width 5.6rem
  height 5.4rem
  transform translate(-50%,-50%)  
  z-index 2
.form
  width 100%
  height 100%
  background-color #ffffff
  border-radius .2rem
  overflow hidden
  dl
    padding .35rem .4rem 0 .4rem
    input
      font-size .28rem
      height .80rem
      border-radius .4rem
    dd
      padding-bottom .3rem
      position relative
      input
        &[type=number]
          width 100%
          borderbox(0 .38rem)
          background-color #DEF6FE
          color #0B9AF4
      .send
        position absolute
        padding 0 .20rem
        right 0
        top 0
        background-color rgba(39, 170, 253,0)
        color #00B2FF
        &:disabled
          background-color #BCEEFF
          color #27AAFD
    dt
      padding-top .1rem
      input
        font-size .34rem
        width 100%
        btn(4.8rem,0.9rem)
.imgs
  position relative
.downlink
  position absolute
  bottom 15%
  left 50%
  white-space nowrap
  transform translateX(-50%)
  background-color #47C0FF
  height .6rem
  padding 0 .45rem
  font-size .26rem
  color #DBF3FF
  border-radius .3rem
  line-height .6rem
  box-shadow:0 .04rem .06rem rgba(71,192,255,0.4);
.footer
  height 1.24rem
  .fix
    box-sizing border-box
    padding 0 .32rem
    font-size .32rem
    position fixed
    height 1.24rem
    width 100%
    max-width 7.5rem
    min-width 3.2rem
    bottom 0
    background-color #0D8DDE
    color #FFF
    span 
      line-height 1.24rem
    .bot
      position absolute
      width 1.64rem
      height .54rem
      bottom 1.24rem
    .buy
      btn(2.42rem,0.8rem)
      position absolute
      right .32rem
      top 50%
      transform translateY(-50%)
      fon-size 0
      em 
        font-size .34rem
      img 
        width .12rem
        height .25rem
        vertical-align baseline
        margin-left .12rem
.cover
  position fixed
  width 100%
  height 100%        
  background-color rgba(0,0,0,.6)
  top 0
  max-width 7.5rem
  min-width 3.2rem
  z-index 1
.close
  position absolute
  width .8rem
  height .8rem
  border-radius .42rem
  border .04rem solid #ffffff
  bottom -1.4rem
  left 50%
  transform translateX(-50%) rotate(45deg)
  &:after
    position absolute
    content ' '
    width .4rem
    height .04rem
    background #ffffff
    left 50%
    top 50%
    transform translate(-50%,-50%)
    border-radius .02rem
  &:before
    position absolute
    content ' '
    width .04rem
    height .4rem
    background #ffffff
    left 50%
    top 50%
    transform translate(-50%,-50%)
    border-radius .02rem
</style>
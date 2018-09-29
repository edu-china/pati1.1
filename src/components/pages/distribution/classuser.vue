<template>
 <div class="page">
   <div class="imgs" v-for="i in 3" :key="i">
     <img :src="require('../../../assets/images/distribution/cu'+i+'.png')" alt="">
     <a href="javascript:;" @click="downloadApp" v-if="i==3" class="downlink">了解更多请下载"爬梯朗读APP"查看</a>
   </div>
   <div class="login" v-show="showForm">
     <div class="form">
       <img :src="imgs.cubg" alt="">
       <dl>
        <dd><input type="text" id="school" placeholder="请输入学校名称" v-model="formdata.schoolName"></dd>
        <dd><input type="text" id="className" placeholder="请输入班级名称" v-model="formdata.className"/></dd>
        <dd><input type="number" id="tel" placeholder="请输入老师手机号" v-model="formdata.teacherPhone"></dd>
        <dt><input type="button" @click="submit" value="提 交"></dt>
       </dl>
     </div>
     <span class="close" @click="showForm=false"></span>
   </div>
   <div class="cover" v-show="showForm"></div>
   <div class="footer">
    <div class="bar">
      <img :src="imgs.slogen" alt="">
      <a href="javascript:;" @click="join"><span>立即申请</span></a>
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
        cubg:require('../../../assets/images/distribution/cubg.png'),
        slogen:require('../../../assets/images/distribution/slogen.png')
      },
      formdata:{
        teacherPhone:'',
        schoolName:'',
        className:''
      },
      showForm:false,
      online:true
    };
  },
  components: {},

  created(){
    this.$http.get('/classUserVip/shareInfo');
  },
  mounted() {

  },
  
  computed:{},

  methods: {
    downloadApp,
    verify(){
      let fd = this.formdata;
      if(!fd.schoolName){
        App.showToast({
          icon:'none',
          title:'请输入学校名称'
        });
        return false;
      }
      if(!fd.className){
        App.showToast({
          icon:'none',
          title:'请输入班级名称'
        });
        return false;
      }
      if(!/^1[3456789]\d{9}$/.test(fd.teacherPhone)){
        let msg = '手机号码有误！'
        if(!fd.teacherPhone) msg = '请输入手机号码！'
        App.showToast({
          icon:'none',
          title:msg
        });
        return false;
      }
      return true;
    },
    submit(){
      if(this.verify()){
        this.showForm = false;
        App.showToast({
          icon:'loading',
          title:'正在提交'
        });
        this.$http.post('classUserVip/setMessage',this.formdata).then(res=>{
          let state = res.status;
          if(state==1){
            App.showToast({title:'提交成功'})
          }else{
            App.showToast({title:res.message})
          }
        });
      }
    },
   
    join(){
      if(!this.online){
        App.showToast({
          title:'该活动已下线',
          icon:'none'
        })
        return;
      }
      this.showForm = true;
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
@import url('../../../assets/styles/global2.css');
stick(){
  position absolute
  content ' '
  background #ffffff
  left 50%
  top 50%
  transform translate(-50%,-50%)
  border-radius .02rem
}

.page
  background-color #00c4ff
.login
  position fixed
  top 50%
  left 50%
  width 5.6rem
  transform translate(-50%,-50%)  
  z-index 2
.form
  width 100%
  height 100%
  background-color #ffffff
  border-radius .2rem
  overflow hidden
  dl
    padding .35rem .4rem .4rem .4rem
    input
      font-size .28rem
      height .80rem
      border-radius .4rem
    dd
      padding-bottom .3rem
      position relative
      input
        &[type=number],&[type=text]
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
  bottom 13%
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
  &::after
    stick()
    width .4rem
    height .04rem
  &::before
    stick()
    width .04rem
    height .4rem
.footer
  height 1.24rem    
.bar
  position: fixed;
  height: 1.3rem;
  background-color: #fff;
  bottom: 0;
  width: 100%;
  max-width: 7.5rem;
  min-width: 3.2rem;
  box-shadow 0 0 .2rem rgba(0,0,0,.1)
  img
    height: .8rem;
    position: absolute;
    left: .24rem;
    top: 50%;
    transform: translateY(-50%)
  a
    btn(2.42rem,0.8rem)
    position: absolute;
    right: .32rem;
    font-size: .34rem;
    top: 50%;
    transform: translateY(-50%);
    font-weight: bold
    span
      padding-right: .2rem;
      background: url(../../../assets/images/distribution/arr.png) center right no-repeat;
      background-size: .12rem auto;
</style>
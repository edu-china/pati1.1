<template>
  <div class="bg">
    <div class="banner">
        <img :src="imgs.banner" alt="">
    </div>
    <div class="info">
        <div class="ex">
            <ex src=""></ex>
        </div>
        <div>
            五大可  老师
        </div>
        <div>
            北京育英小学   1年级3班
        </div>
        <div class="invcode">
            填写班级邀请码：<span>00806080</span>  
        </div>
    </div>
    <div class="students">
        <div class="tit">已加入班级的小伙伴</div>
        <ul>
            <li>虚荣过<a href="">ta的主页</a></li>
            <li>虚荣过<a href="">ta的主页</a></li>
            <li>虚荣过<a href="">ta的主页</a></li>
        </ul>
    </div>
    <div class="banner" style="margin-top:.2rem;">
        <img :src="imgs.steps" alt="">
    </div>
    <dfooter></dfooter>
  </div>
</template>

<script>
// import myhead from '@/components/base/header'
import banner from '../../../assets/images/inv/class/classbanner.png'
import steps from '../../../assets/images/inv/class/step.png'
import ex from '../../base/portrait'
import dfooter from '../../base/footer_load.vue'

export default {
  data() {
    return {
      imgs:{banner:banner,steps:steps},
      
    }
  },
  components:{
      ex,dfooter
  },
  props:{},
  created() {},
  methods: {
    
  }
}
</script>

<style scoped>
.banner{ line-height: 0}
.banner img{ width: 100%}
.info{ 
    text-align: center; 
    background-color: #3289ca; 
    color: #fff;
    padding-bottom: .3rem;
}
.invcode{
    line-height: 2em;
    font-size: .28rem;
}
.students{
     margin-top: .2rem;
     background-color: #fff;

}
.students .tit{
    color: #186ba1;
    font-size: .28rem;
    line-height: 3em;
    text-align: center
}
.students li{
    line-height: .66rem;
    border-bottom: 1px solid #eee;
    margin-left: .16rem;
    padding-right: .16rem;
}
.students li a{ 
    float: right;
    color:#3289ca;
}
</style>

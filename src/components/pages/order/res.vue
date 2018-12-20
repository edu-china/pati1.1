<template>
  <div class="page">
    <div class="wrapbox suc" v-if="state=='suc'">
      <dl class="form">
        <dd>
          <h1>支付成功</h1>
          <div class="tips">
            恭喜您成为尊贵的会员用户，海量会员书籍已向您打开！赶快下载爬梯朗读APP，开启你的会员之旅吧！
          </div>
        </dd>
        
        <dt>
          <input type="submit" value="下载APP" @click="downloadApp">
        </dt>
      </dl>

      <dl class="desc">
        <div>书山有路勤为径，学海无涯苦作舟！</div>
        <div>客服电话：400-706-7131</div> 
      </dl>
    </div>
    <div class="wrapbox fail" v-if="state=='fail'">
      <dl class="form">
        <dd>
          <h1>支付失败</h1>
          <div class="tips">
            您的支付未成功，请重新支付。<br> 如支付遇到问题，请联系官方客服电话：400-706-7131
          </div>
        </dd>
        
        <dt>
          <input type="submit" value="下载APP" @click="downloadApp">
        </dt>
      </dl>

      <dl class="desc">
        <div>书山有路勤为径，学海无涯苦作舟！</div>
      </dl>
    </div>
  </div>
</template>

<script>
import {downloadApp} from '@/assets/scripts/utils.js'
export default {
  data () {
    return {
      state:''
    };
  },
components: {},

created(){
  // this.$http.get('teacher/shareInfo');
  let tradeNo = this.$route.query.out_trade_no;
  this.$http.get('/trade/payRes?tradeNo='+tradeNo).then(data=>{
    if(data.status==1){
      this.state = 'suc'
    }else{
      this.state = 'fail'
    }
  });
},

mounted(){},

updated(){},

destroyed(){},

methods: {downloadApp},

computed: {},

watch:{}
}
</script>

<style>
.wrap{
background-color:#00C4FF
}
</style>

<style lang='stylus' scoped>
@import '../../../assets/stylus/fun.stylus'

.page
  background-color #00C4FF
  overflow hidden
.wrapbox
  box-shadow 0rem 0rem .24rem rgba(39, 170, 253, 0.44) inset,0rem 0rem .1rem rgba(10,127,202,0.31)
  margin .40rem  
  border-radius .2rem
  background-color #F1FAFF
  padding .3rem .22rem
  height 11.8rem
.form
  padding 0 .2rem
  dt
    padding-top .5rem
    text-align center
  input 
    btn(4.8rem,.9rem)
    font-size .34rem
  dd
    margin-top .5rem
    text-align center
    padding-top 2.30rem
    h1
      font-size .4rem
      padding-bottom .4rem
    h3
      color #7A8186
      font-weight normal
      font-size .2rem
    .tips
      padding .42rem .5rem
      border-radius .2rem
      
.suc
  dd
    background url('../../../assets/images/distribution/suc.png') no-repeat top center
    background-size 3.8rem 2.2rem
  .tips 
    background-color #E3F7FE
  h1
    color #FEB11C
.fail
  dd
    background url('../../../assets/images/distribution/payfail.png') no-repeat top center
    background-size 5.56rem 2.07rem
  .tips
    background-color #F6F0E5
    color #FEB11C
  h1
    color #F52626
.desc
  text-align center
  padding-top .5rem
  color #869295
</style>
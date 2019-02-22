<template>
  <div class="page">
    <div style="text-align:center; line-height:2em; padding:3rem 0;">
      <div>微信支付</div> 
      <div><a href="javascript:history.go(-1);" style="color:#47c0ff">返回上一页</a></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  components: {},

  created(){
    this[this.$route.query.channelname](this.$route.query);
  },

  mounted(){ },

  updated(){},

  destroyed(){},

  methods: {
    getWx(fun){
      if(window.wx){
        fun(window.wx);
      }else{
        var intv = setInterval(function(){
          if(window.wx){
            clearInterval(intv);
            fun(window.wx);
          }
        },200);
      }
    },
    distribution(q){
      let itemId = q.itemId;
      let channel = q.channel;
      this.$http.get('trade/wxpayInit?itemId='+itemId+'&channel='+channel).then(data=>{
        let {timeStamp,nonceStr,paySign} = data.payInfo;
        if(data.status==1){
          this.getWx(wx=>{
            console.log(wx);
            wx.ready(()=>{
              wx.chooseWXPay({
                timestamp:timeStamp,
                nonceStr,
                paySign,
                package:data.payInfo.package,
                signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                success:res=>{
                  console.log(res);
                  this.$router.replace({
                    name:'payRes',
                    query:{
                      out_trade_no:data.tradeNo
                    }
                  });
                },
                fail:err=>{
                  console.log(err)
                  App.showToast({
                    icon:'warning',
                    title:'支付失败',
                    complete:()=>{
                      history.go(-1);
                    }
                  });
                },
                cancel(){
                  history.go(-1);
                }
              });
            });
          });
        }else{
          App.showToast({icon:'none',title:data.message})
        }
      });
    }
  },

  computed: {},

  watch:{}
}

</script>
<style lang='stylus' scoped>
</style>
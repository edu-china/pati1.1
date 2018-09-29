<template>
    <div style="text-align:center; line-height:6rem">
      微信支付
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
    this[this.$route.params.channel](this.$route.query);
  },

  mounted(){ },

  updated(){},

  destroyed(){},

  methods: {
    distribution(q){
      let item_id = q.item_id;
      let channelid = q.channelid;
      this.$http.get('trade/wxpayInit?itemId='+item_id+'&channel='+channelid).then(data=>{
        let {timeStamp,nonceStr,paySign} = data.payInfo;
        if(data.status==1){
          wx.chooseWXPay({
            timestamp:timeStamp,
            nonceStr,paySign,
            package:data.payInfo.package,
            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            success:res=>{
              console.log(res);
              this.$router.replace({
                name:'payRes',
                params:{
                  state:data.tradeNo
                }
              });
            },
            fail:err=>{
              App.showToast({
                icon:'warning',
                title:'支付失败',
                complete:function(){
                  this.$router.go(-1);
                }
              });
            }
          });
        }else{
          App.showToast({title:res.message})
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
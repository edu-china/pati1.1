<template>
    <div class="bg">
      <div class="wb">
        <dl class="enjoy">
          <dt v-if="showlist">
            <ol v-for="(ns,i) in amountList" v-bind:key="i">
              <li v-for="(n,j) in ns"  v-bind:key="i+'-'+j" :data-num="n" @click="pay(n)">{{n}}<small>元</small> </li>
            </ol>
            <div class="change">
              <a @click="showlist=false">其他金额</a>
            </div>
          </dt>
          <dd v-if="!showlist">
            <div style="color: #ccc;padding-bottom: .4rem;">打赏金额最低1元，最高888.88元</div>
            <div>
              <small>￥</small> 
              <input  v-focus type="text" placeholder="0.00" v-model="diynum" @input="Numchange" :style="'width:'+iw+'rem'" maxlength="6">
            </div>
            <div class="change">
              <a @click="showlist=true">固定金额</a>
            </div>
            <div style="padding-top:.5rem">
              <input type="button" value="打赏" class="btn" @click="pay(diynum)"/>
            </div>
          </dd>
        </dl>
        <dl class="enjoyli" v-if="total>0">
          <dt>{{total}}人已打赏</dt>
          <dd>
            <img v-for="(rl,i) in rewardList" :key="i" :src="rl.avator">
          </dd>
        </dl>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      diynum:'',
      iw:1.7,
      showlist:true,
      q:{},
      rewardList:[],
      total:'',
      amountList:[]
    };
  },
  components: {},

  created(){
    // var vConsole = new VConsole();
    this.q = this.$route.params;
    let {readId,wxuser} = this.q;
    let wxuri = wxuser?'&wxuser='+wxuser:'';
    this.$http.get('/trade/rewardList?readId='+readId+wxuri).then(res=>{
      if(wxuser){
        location.href = '/m/wxpay/enjoy/'+readId
      }else{
        this.amountList = res.amountList;
        this.rewardList = res.rewardList;
        this.total = res.total
      }
    });
  },

  mounted(){
    
  },

  updated(){},

  destroyed(){},

  methods: {
    Numchange(e){
      let diynum = this.diynum;
      
      if(diynum-0>888.88){
        diynum = '888.88'
      }
      diynum = diynum.replace('..','.');
      let arr = diynum.match(/[\d\.]/g);
      diynum = arr?arr.join(''):'';
      
      let pices = diynum.split('.');
      let hasdot = pices.length>1;
      let dec = hasdot?pices[1]:'';
      
      if(pices.length>2){
        diynum = pices[0]+'.'+pices[1]
      }
      if(diynum=='.'){
        diynum = '1.'
      }
      if(diynum<1 && diynum!=''){
        diynum = '1'
      }

      let len = diynum.length;
      // if(len>1 && diynum==0 && !hasdot){
      //   diynum = '1'
      // }
      if(dec.length>2){
        diynum = diynum.substr(0,--len)
      }
      
      if(diynum=='') diynum=''
      
      this.diynum = diynum;
      let iw = len*0.4
      if(diynum==='') iw = 1.2
      this.iw = iw===0?.4:iw + .5;
    },
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
    pay(num){
      if(!num){
        App.showToast({
          icon:'none',
          title:'金额必须大于1元'
        });
        return;
      }
      let rid = this.q.readId;
      this.$http.get('/trade/wxRewardInit?amount='+num+'&readId='+rid).then(data=>{
        if(data.status==1){
          let {timeStamp,nonceStr,paySign} = data.payInfo;
          this.getWx(wx=>{
            // console.log(wx);
            wx.ready(()=>{
              wx.chooseWXPay({
                timestamp:timeStamp,
                nonceStr,
                package:data.payInfo.package,
                signType: 'MD5',  
                paySign,
                success:res=>{
                  console.log(res);
                  App.showModal({
                    title:'打赏成功',
                    content:'感谢您的鼓励！',
                    showCancel:false,
                    success(){
                      location.href = '/Weixin/Read/detail/read_id/'+rid
                    }
                  })
                },
                fail:err=>{
                  console.log(err);
                  App.showToast({
                    icon:'none',
                    title:'支付失败,请重试'
                  });
                },
                cancel(){
                  // history.go(-1);
                }
              });
            });
          });
        }else{
          App.showToast({icon:'none',title:data.message})
        }
      })
    }
  },

  computed: {},
  directives:{
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  watch:{}
}

</script>
<style lang='stylus' scoped>
@import url('../../../assets/styles/global2.css');
.bg{
  overflow hidden
  background url('../../../assets/images/enjoybg.png') no-repeat
  background-size 100% auto
  background-position 0 -1rem
}
.wb{
  background-color #fff
  margin .3rem
  margin-bottom 0
  border-top-right-radius .12rem
  border-top-left-radius .12rem
  overflow hidden
  min-height 13.36rem
}
.change
  text-align center
  line-height 1rem
  a 
    color #27ABFD
.enjoy 
  height 5.8rem
  dt 
    padding .15rem
    ol
      width 100%
      display flex
      li
        flex 1
        border 1px solid #FEB11C
        margin .15rem
        color #FEB11C
        text-align center
        height 1rem
        line-height 1rem
        font-size .4rem
        border-radius .1rem
        small 
          font-size .22rem
  dd
    padding .8rem .3rem
    padding-bottom 0
    text-align center
    small 
      font-size .6rem
      vertical-align sub
    input 
      font-size .8rem
      width 3rem
      vertical-align middle
    .btn
      width 100%;
      background:linear-gradient(-90deg,rgba(254,177,28,1),rgba(254,203,28,1));
      box-shadow:0 .03rem .12rem 0 rgba(254,184,28,0.26);
      font-size .32rem
      color #fff
      height .8rem
      border-radius .4rem
.enjoyli
  text-align center
  dt
    padding .15rem .3rem
    background-color #fcfcfc  
  dd
    padding .3rem
    text-align center
    font-size 0
    img 
      width .6rem
      height .6rem
      display inline-block
      margin .05rem
</style>
<template>
  <div v-if="complate">
    <div class="goodsimg">
      <img :src="item.image_url" />
    </div>
    <div class="topic wbg">
      <h1>{{item.name}}</h1>
      <div class="vice">
        <span class="price px32">{{item.price}}<small>币</small></span>
        <span class="px18 sd">库存 {{item.inventory}}　 已售 {{item.trade_num}}</span>
      </div>
    </div>
    <div class="cw wbg">
      <div class="tit px26">商品详情</div>
      <div class="content" v-html="item.detail"></div>
    </div>
    <bottom loadtype="shop"></bottom>
  </div>
</template>

<script>
import bottom from '../../base/footer_load.vue'
export default {
  data() {
    return {
      item:{},
      complate:false
    }
  },
  components:{bottom},
  props:{},
  created() {
    this.axios.get("/weixin/item/detail/id/"+this.$route.params.id).then(response=>{
      this.item = response.data.itemInfo;
      this.complate = true;
      this.wxConfig(response.data.shareInfo);
    });
  },
  methods: {}
}
</script>

<style scoped>
.goodsimg img{ width: 100%;}
.wbg{ background-color: #fff;}
.topic{ padding:.26rem;}
.topic h1{ font-weight: normal; font-size: .32rem; padding-bottom: .2rem}
.vice{ line-height:1em}
.vice .price{ color: #ff4242}
.vice .sd{color:#9b9b9b; float: right;}
.cw{ margin-top: .24rem; padding: 0 .25rem;}
.cw .tit{ height: .6rem; line-height: .6rem; padding-left: .22rem; position: relative;}
.cw .tit::before{ content:" "; position: absolute; height: .28rem; width: .06rem; background-color: #399ac8; top:50%; margin-top: -.14rem; left: 0; border-radius: .03rem;}
.content{ padding-bottom: .2rem;}
.content >>> img{ max-width: 100%;}
</style>

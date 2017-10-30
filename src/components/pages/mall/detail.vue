<template>
  <div>
    <div class="goodsimg">
      <img src="http://pubstatic.edu-china.com/upload/cardActivity/15089130822630.png" />
    </div>
    <div class="topic wbg">
      <h1>儿童保温杯带吸管两用防摔水杯小学生水壶幼儿园男女宝宝可爱杯子</h1>
      <div class="vice">
        <span class="price px32">1203<small>币</small></span>
        <span class="px18 sd">库存 2020　 已售2020</span>
      </div>
    </div>
    <div class="cw wbg">
      <div class="tit px26">商品详情</div>
      <div class="content" v-html="html"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      html:'<div>豆腐干豆腐干豆腐干地方感到反感地方大股东梵蒂冈的地方</div><div>豆腐干豆腐干地方</div>'
    }
  },
  props:{},
  created() {},
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

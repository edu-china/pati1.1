<template>
  <div>
    <div class="uhead bgw">
      <div class="uhtop">
        <div class="ex hideTxt">
          <img src="http://pubstatic.edu-china.com/upload/headportrait/7981981507342699.jpg"/>
          <span class="clblue px32">爱玩水的孩子</span>
        </div>
        <div class="wins px26">
          最高 <strong class="clred">5</strong> 连胜
        </div>
      </div>
      <div class="pkdata">
        <span><big class="clred">35</big> 胜</span>
        <span><big class="clblue">20</big> 负</span>
        <span><big class="clred">6.2</big><small class="clred">%</small> 胜率</span>
      </div>
    </div>
    <div class="titbar">
      最近PK场次记录
    </div>
    <div class="bgw">
      <ul class="pklist">
        <li>
          <img src="http://pubstatic.edu-china.com/upload/headportrait/7981981507342699.jpg"/>
          <dl>
            <dt class="px28 hideTxt">菲菲</dt>
            <dd class="hideTxt">2011-02-20</dd>
          </dl>
          <span class="pkres win px28">PK结果</span>
        </li>
        <li>
          <img src="http://pubstatic.edu-china.com/upload/headportrait/7981981507342699.jpg"/>
          <dl>
            <dt class="px28">菲菲</dt>
            <dd>2011-02-20</dd>
          </dl>
          <span class="pkres win px28">PK结果</span>
        </li>
        <li>
          <img src="http://pubstatic.edu-china.com/upload/headportrait/7981981507342699.jpg"/>
          <dl>
            <dt class="px28">菲菲</dt>
            <dd>2011-02-20</dd>
          </dl>
          <span class="pkres win px28">PK结果</span>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
    }
  },
  props:{},
  created() {},
  methods: {}
}
</script>

<style scoped>
.bgw{ background-color: #fff;}
.uhead{ padding: .2rem .3rem;}
.uhtop{ position: relative; padding-right: 2rem;}
.uhtop .wins{ position: absolute; right: 0; top:50%; height:.3rem; line-height: .3rem; margin-top: -.15rem; padding: 0 .1rem;background: url(../../../assets/images/line.png) no-repeat 0 .22rem; background-size: 100% auto;}
.ex img{width: 1rem; height: 1rem; border-radius:50%; margin-right: .3rem;}
.pkdata{ padding-top: .26rem;}
.pkdata span{ padding-right: 1rem}
.pkdata big{ font-weight: bold; font-size:.36rem;}
.titbar{ height: .76rem; line-height:.76rem;padding: 0 .3rem; color:#737c80}
.clblue{color:#0681b9}
.clred{color:#f65050}
.pklist li{padding:.2rem 0;margin-left:.3rem; padding-left: 1.24rem; position: relative; min-height: .8rem; border-bottom: 1px solid #e6e6e6;}
.pklist img{ width: .8rem; height: .8rem; border-radius: 50%; position: absolute; left: .08rem;}
.pklist dl{ padding-right: 1.8rem;}
.pklist dt{ font-weight: bold; line-height: 1.8em}
.pklist dd{ color: #b5bcbf}
.bgw .pkres{ position: absolute; right: .3rem; top: .3rem; color: #b5bcbf; padding-right: .55rem;}
.bgw .pkres::after{ width: .44rem; height: .44rem; position: absolute; border-radius:50%; line-height: .44rem; text-align: center; color: #fff; right: 0}
.bgw .pkres.win::after{ background-color: #f65050; content: "胜"}
.bgw .pkres.fail::after{ background-color: #bababa; content: "负"}
</style>

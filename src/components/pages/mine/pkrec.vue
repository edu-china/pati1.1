<template>
  <div>
    <div class="uhead bgw" v-if="complate">
      <div class="uhtop">
        <div class="ex hideTxt">
          <img :src="user.avator"/>
          <span class="clblue px28">{{user.nick}}</span>
        </div>
        <div class="wins px26">
          最高 <big class="clred">{{user.winstreak_max-0}}</big> 连胜
        </div>
      </div>
      <div class="pkdata">
        <span><big class="clred">{{user.win_num}}</big> 胜</span>
        <span><big class="clblue">{{user.fail_num}}</big> 负</span>
        <span><big class="clred">{{user.win_rate}}</big><small class="clred">%</small> 胜率</span>
      </div>
    </div>
    <div class="titbar">
      最近PK场次记录
    </div>
    <div class="bgw">
      <ul class="pklist">
        <li v-for="u in list">
          <img :src="u.avator"/>
          <dl>
            <dt class="hideTxt">{{u.nick}}</dt>
            <dd class="hideTxt">{{u.create_time}}</dd>
          </dl>
          <span class="pkres" :class="u.is_win-0?'win':'fail'">PK结果</span>
        </li>
      </ul>
      <loadlist @ondataupdate="getdata" :apiurl="'/Weixin/Member/getMyPkInfo/userId/'+this.$route.params.uid+'/p/@p'"></loadlist>
    </div>
  </div>

</template>

<script>
import loadlist from '../../base/loadlist.vue'
export default {
  data() {
    return {
      list:[],
      user:{},
      complate:false
    }
  },
  components:{loadlist},
  props:{},
  created() {
  },
  methods: {
    getdata(datas){
      this.list = datas.list;
      this.user = datas.userInfo;
      this.complate = true;
    }
  }
}
</script>

<style scoped>
.bgw{ background-color: #fff;}
.uhead{ padding: .2rem .25rem;}
.uhtop{ position: relative; padding-right: 2rem;}
.uhtop .wins{ position: absolute; right: 0; top:50%; height:.3rem; line-height: .3rem; margin-top: -.15rem; padding: 0 .1rem;background: url(../../../assets/images/line.png) no-repeat 0 .22rem; background-size: 100% auto;}
.uhtop .wins big{ font-weight: bold;}
.ex img{width: .86rem; height:.86rem; border-radius:50%; margin-right: .2rem;}
.pkdata{ padding-top: .26rem;}
.pkdata span{ padding-right: 1rem}
.pkdata big{font-size:.3rem;}
.titbar{ height:.66rem; line-height:.66rem;padding: 0 .25rem; color:#737c80}
.clblue{color:#0681b9}
.clred{color:#f65050}
.pklist li{padding:.2rem 0;margin-left:.3rem; padding-left: .94rem; position: relative; min-height: .68rem; border-bottom: 1px solid #e6e6e6;}
.pklist img{ width: .68rem; height: .68rem; border-radius: 50%; position: absolute; left: .08rem;}
.pklist dl{ padding-right: 1.8rem;}
.pklist dt{ font-weight: bold; line-height: 1.8em}
.pklist dd{ color: #b5bcbf; font-size: .2rem;}
.bgw .pkres{ position: absolute; right: .3rem; top: .3rem; color: #b5bcbf; padding-right: .4rem;}
.bgw .pkres::after{ width: .34rem; height: .34rem; position: absolute; border-radius:50%; line-height: .34rem; text-align: center; color: #fff; right: 0; font-size: .2rem}
.bgw .pkres.win::after{ background-color: #f65050; content: "胜"}
.bgw .pkres.fail::after{ background-color: #bababa; content: "负"}
</style>

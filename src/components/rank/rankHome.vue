<template>
  <div>
      
      <ul class="flexbox">
          <li>
              <router-link :to="{name:'Ranks',params:{type:'wealthRank'}}">
                  <div>财富榜</div>
              </router-link>
          </li>
          <li>
              <router-link :to="{name:'Ranks',params:{type:'victoryRank'}}">
                  <div>PK胜率榜</div>
              </router-link>
          </li>
          <li>
              <router-link :to="{name:'Ranks',params:{type:'scoreRank'}}">
                  <div>高分榜</div>
              </router-link>
          </li>
      </ul>

      <wealthRank v-if="this.$route.params.type=='wealthRank'"></wealthRank>
      <scoreRank v-if="this.$route.params.type=='scoreRank'"></scoreRank>
      <victoryRank v-if="this.$route.params.type=='victoryRank'"></victoryRank>

  </div>

</template>
<script>
import Vue from 'vue'
import wealthRank from '../rank/wealthRank.vue'
import scoreRank from '../rank/scoreRank.vue'
import victoryRank from '../rank/victoryRank.vue'

export default {
    components:{wealthRank,scoreRank,victoryRank}
  
}
</script>


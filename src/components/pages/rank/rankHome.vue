<template>
    <div>

        <ul class="flexbox nav-bar">
            <li :class="{active:this.$route.params.type=='wealthRank'}">
                <router-link :to="{name:'Ranks',params:{type:'wealthRank'}}">
                    <div>
                        <span>财富榜</span>
                    </div>
                </router-link>
            </li>
            <li :class="{active:this.$route.params.type=='victoryRank'}">
                <router-link :to="{name:'Ranks',params:{type:'victoryRank'}}">
                    <div><span>PK胜率榜</span></div>
                </router-link>
            </li>
            <li :class="{active:this.$route.params.type=='scoreRank'}">
                <router-link :to="{name:'Ranks',params:{type:'scoreRank'}}">
                    <div><span>高分榜</span></div>
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
    components: { wealthRank, scoreRank, victoryRank }

}
</script>
<style scoped>

.nav-bar {
    background: #ffcc00;
    height: .78rem;
    line-height: .78rem;
    text-align: center;
    padding: 0 .25rem;
    font-size: .26rem;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
}
.nav-bar div {
    color: #fff;
}

.nav-bar .active div {
    color: #0681b9;
}
.nav-bar  div span{
    padding: 0 .1rem;
}
.nav-bar .active div span{
    border-bottom:2px solid #0681b9;
    display: inline-block;
    height: .74rem;
    padding: 0 .1rem;
}
</style>



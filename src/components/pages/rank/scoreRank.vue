<template>
  <div>
    <ul class="wealth">
      <li class="fn_clear" v-for="(list, index) in lists" :key="index">
        <div class="fl  fn_clear">
          <div class="rank fl">{{index+1}}</div>
          <div class="name fl">
            <div class="elp">{{list.name}}</div>
            <div class="elp book-name">{{list.nick}}</div>

          </div>
        </div>
        <div class="fr elp">{{list.score}}</div>

      </li>

    </ul>
    <loadlist @ondataupdate="getdata" :apiurl="'/Weixin/Member/scoreRank/pageSize/20/p/@p'"></loadlist>
  </div>
</template>
<script >
import loadlist from '../../base/loadlist.vue'
export default {
  components: { loadlist },
  data() {
    return {
      lists: []

    }
  },
  methods: {
    getdata(datas) {
      this.lists = this.lists.concat(datas.list);

    }
  }

}
</script>

<style scoped>
.fl {
  float: left
}

.fr {
  float: right
}

.wealth {
  background: #fff;
  margin-top: .78rem
}

.wealth li {
  background: #fff;
  margin: 0 0 0 .25rem;
  height: 1rem;
  line-height: .88rem;
  border-bottom: 1px solid #eaeaea;
  padding: 0 .25rem 0 0;
  color: #7e7e7e
}


.wealth li .fr {
  max-width: 2.8rem;
}

.wealth li .fl .name {
  max-width: 2.2rem;
  margin-top: .18rem
}

.wealth li .fl .name .book-name {
  color: #b5bcbf;
  font-size: .2rem
}

.wealth li .name div {
  line-height: .35rem
}



.wealth li .rank {
  display: inline-block;
  width: .45rem;
  text-align: center;
  margin-right: .15rem;
  position: relative
}

.wealth li:last-child {
  border: none;
}

.wealth li:nth-of-type(1),
.wealth li:nth-of-type(2),
.wealth li:nth-of-type(3) {
  color: #4b585d;
}

.wealth li:nth-of-type(1) .fr,
.wealth li:nth-of-type(2) .fr,
.wealth li:nth-of-type(3) .fr {
  color: #ffcc00;
}

.wealth li:nth-of-type(1) .rank::before,
.wealth li:nth-of-type(2) .rank::before,
.wealth li:nth-of-type(3) .rank::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: .30rem;
  height: 100%;
  background: #fff;
  background-size: .3rem .38rem;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAmCAMAAADkx9tQAAABPlBMVEVMaXH/zAD/zAAGgbn/zAD/zAD/zAD/zAD/zAD/zAD/zAD/zAD/zAD/zAD/zAD/zAD/zAAGgbn/zAD/zAD/zAD/zAAGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbn/zAAGgbkGgbkGgbn/zAD/zAAGgbkGgbn/zAD/zAD/zAAGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbn/zAAGgbn/zAD/zAAGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbn7sRf/zAAGgbn/////89v/ywH7shb8txL9vA7+xwT9vgz8uBH7tBX8ug/9wAv8uw/+xQb+yAP/yQP8txH+wwj+wwf8uhD/ygL+yQP/5bD9wQr/yQL/ywD+xgb7shf+yAT/ygH/1F3/13P/24X/3pW9RJ9gAAAARXRSTlMAWAYM6UyA6gMQrZbokvmUVzPsk8UFdeYCT2MGEO+KGZj5OPqB8wnkkfhn8cf6xmjWxtXFfn95xHvrTTRsZqmozA3LNT/X+GTpAAAB00lEQVR42oWT51bbQBBGR1ZDYFMMpvfeIT0kQOp+sSTjIlywwSaUtPd/gexKZtdGCb6/9M3VmTPaHdGLb5IRChlRlWc0pcJipBdVZYomn8uwpgurr8nC4STRtHp5W+htlad5nJmQ8bPQH2WcmBF5vGu49yqNk2B2Lgw7p8dfPxHpX04+7ISFuVkKmefPGwc6SfSDDV6ab6eFpZW365QxN/eTW1vJ/U0zQ+uvV5YWqM2rZXIsG5Ijy6Hll6TQkkC+UCz5fqlYyANJjRR9A8DtBZNcVICBPmn74Z2xLs489D/4UfzI8ZIf1Jued18PfB5yVxiK7DA8YS+raFO9FN7DsLCOAdH5HB2ci/4wHK4t3D7Yluu6LekrsIgSNvjMAQRuNpt1ERLw9rATZCLPp6pB8Kcl9Xc+Xx4mpVBgrIw2UqPMWAGj9AZFxupx3WCsiDGyUWKsFtc1xkqwaRA+Y15ce3wiDPbQUfPqf5uPPTlajw9Tx6K0OpZ3lEgjJw41InaoZKGiLuzX75+dV6Iu9BodXIcXajv/XocgWgeNQoZwJbxfbjRvbpqNslymXquoFrkSX2SFZkS/wd1d9BsYGnXhrKYhSa869JiMmdo19vaM3ZSZkMW/Ah/tB6K1SbAAAAAASUVORK5CYII=);
}

.wealth li:nth-of-type(2) .rank::before {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAmCAMAAADkx9tQAAABR1BMVEVMaXHh4eHh4eEGgbnh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eEGgbnh4eHh4eHh4eHh4eEGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbnh4eEGgbkGgbkGgbkGgbkGgbkGgbnh4eHh4eHh4eHh4eHh4eEGgbkGgbkGgbkGgbkGgbkGgbkGgbnh4eEGgbnh4eHh4eEGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbnc3Nzh4eHDxMMGgbn////ExcTf39/LzMvm5ubZ2dnS0tLg4ODa2trKy8rLy8vGx8bt7e3P0M/b29vy8vLMzcz9/f3U1NTQ0dDY2djJysnKysr4+Pjr6+vY2Nj29vbT1NPR0dHo6Ojb3Nv7+/vR0tH09PTPz8/j4+O21qWBAAAARXRSTlMAWAYM6UyA6gMQrZbokvmUVzPsk8UFdeYCT2MGEO+KGZj5OPqB8wnkZ/FoxpH4x/rWxtXFfn95xHvrTTRsZqmozA3LNT9uiEe1AAACAElEQVR42oWTV3fiMBCFB7BxnEAKCem992ST7b1pFGFjQyABTArJpm35/8871lEkvA+b74GjO9dHuiMNcHikGQLJkKk8gwkj5kEybyoTMH6gxUoGiMyKLuyPA0yaj9eBWDd6kuTUmJZfgfis5dgUEKOJcO+MGoWY6RkpNj6+//6Fjv724dOGLMxMg2SW1mubGdBkNteoNKvU3MLS61Uo2ttbuZ2d3Na2XYTVl0sLc6B4sQhu1kHNm6wLi8/BkMohsrBWL5XqtZAh5lJg6OlDrB5zzXEVsa9Hu71YOeUJTivY++gPo3dJpZJ/EzQa1zd+icSlhwMgGcTKBRX8c6Y490leVHAQCNfCeOcz1sVZvD9aLtlZrCrXa0ZCiCYqv4pZgLSDlNlnREdIIo/WPuVHJw02MkoVUOVKiA4ifXNCIqB892hDHkPOW4w4EeKOsbvYJlqchzgMr7DGeVvZf+hX2W3OazgCDtY5D3RmL4rPJgLO6+hAP9IpDW3/EOJKLhqUCPuTttekxli3LTe/ZhLsKNdsPqKjsXKkYploujHZd1RWpm7MXMuDUDT1tbyFdEFdKoVW/DKX+vgktxS7rKC+b9WT6Af9yboIqfAbHfe/46DGcUANU6sdUKZ2Sw/T06P49CATKSv5N7BSkMBdLqCmsOzCvxTt/K61t2ft5u20Lv4F/+bxEdfseSMAAAAASUVORK5CYII=);
}

.wealth li:nth-of-type(3) .rank::before {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAmCAMAAADkx9tQAAABX1BMVEVMaXH8zYD8zYAGgbn8zYD8zYD8zYD8zYD8zYD8zYD8zYD8zYD8zYD8zYD8zYD8zYAGgbn8zYD8zYD8zYD8zYD8zYAGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbn8zYAGgbkGgbkGgbn8zYD8zYAGgbkGgbn8zYD8zYD8zYAGgbkGgbkGgbkGgbkGgbkGgbkGgbn8zYAGgbn8zYD8zYAGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbkGgbn3vWvloVAGgbn8zYD////rqlnlolH++/j5zJbwt2jnpVXrrFz97+L1umjqq1vrq1rvsF/xtGL0uWf3vGr2wnTmolH50aL+9/H4wnv738Dus2PrrFv7y37qqlr7zH74xXf4xXj6yn31uWj869r4x4nvsWDus2T61q32vGr2wnXxs2L62rf98+rusmP7yn3859LMPQsfAAAARXRSTlMAWAYM6UyA6gMQrZbo+ZJXM5Tsk8UFdeYCT2MGEO+KGZj5OPrzgQnkZ8f68WjGkfjWxtXFfn95xHvrTcs0bGapqMwNNT/EinR3AAACI0lEQVR42oWT51fbMBTFXxI7xhACBMLee9O9WzqweHLsbLITNqGU2fb/P32RXSlpz2l/X+x7r470JD3B031JPwj6lfMYxpSYBcGscsZg9IkUiyEgQovSeDQKMK4GrwKxqvQ4yYkRKd8C8UnKkQkghjuKe6fUMLSYnBJiY/f93mda+suHjxvCmJoEwTT9r2yGQBLaXCFr2lczcwuvliGub29FdnYiW9t6HJZfLMzNgM/zeTDDBkpeh02YfwaKQATxPJlOVSqpdPIcMRIARVcP4u0RkxyVEXu6ZNqNp4esg8NT7P6dD+KPHFkJ+65Zuine2QkSuQscAEEfHp+QYRctn6JN8uQY+4AwNfxG8sBq46A1P2omxWG89dN6w+HcadT9vIxhgKCBVLNtERnOazQgYxE2LY9GEHQ8o6qy5LicN6w6jflKIkv1naEOUUwylreIqgganLstlWcsiYPwEtOMFSyRk1+v8QchCoylcQgMTDGWtTzuMw5/cMVvlrEUGtCLFcZKfpzxKydKjFWw14tv/Nht/HS446rYm9w7MCpMLF5rm3xIlnbJL/0FVGlyYxSLLbkOr6mNyWMR++YZKp1fy2N5A8EY5vxDva5xwrlvP1QIY1lemFutVukjr0Rd6JXVxhUZ39Ew/9kOfjsO4IVopnyhWSo1C3nZTP9rRdXI5b8bWRHQvGeQSHjPQAtAB+ZSDCWxJRP+JK5H17T1dW0tqgel+QtpCPUJemDyygAAAABJRU5ErkJggg==);
}
</style>

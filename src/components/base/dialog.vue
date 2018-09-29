<template>
<div v-if="toastShow || modalShow">
  <div class="toastCover" v-if="toastShow">
    <div class="toast">
      <div class="toastIcon" v-if="toastIcon">
        <img :src="toastIcon" :class="toastIconClass"/>
      </div>
      <div class="toastTxt">
        {{toastTitle}}
      </div>
    </div>
  </div>
  <div class="modalCover" v-if="modalShow">
    <div class="modal">
      <dl class="maincon">
        <dt>
          {{modalOption.title}}
        </dt>
        <dd v-html="modalOption.content">

        </dd>
        <dd v-if="modalOption.showInput" class="input">
          <input type="text" name="" id="" v-model="userinput" v-focus>
        </dd>
      </dl>
      <ul class="btns flexbox">
        <li v-if="modalOption.showCancel" :style="{'color':modalOption.cancelColor}" @click="modalSuccess(false)">
          {{modalOption.cancelText}}
        </li>
        <li :style="{'color':modalOption.confirmColor}" @click="modalSuccess(true)">
          {{modalOption.confirmText}}
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import loadingIcon from "../../assets/images/loading.png";
import warningIcon from "../../assets/images/warning.png";
import successIcon from "../../assets/images/success.png";
var tmr = null;
export default {
  data() {
    return {
      toastIcon: loadingIcon,
      toastIconClass: "loading",
      toastShow: false,
      toastTitle: "",
      modalShow: false,
      isloading: false,
      modalShow: false,
      modalOption: {},
      userinput:''
    };
  },
  created() {
    window.App = this;
  },
  directives:{
    //自定义指令
    focus:{
      inserted(el){
        el.value=''
        el.focus();
      }
    }
  },
  methods: {
    showToast(options) {
      this.isloading = false;
      this.hideToast();
      let opts = this.extend(
        {
          icon: "",
          title: "",
          image: "",
          duration: 2000,
          fail: function() {},
          complete: function() {}
        },
        options
      );
      let show = () => {
        this.toastShow = true;
        this.toastTitle = opts.title;
        if (opts.duration) {
          tmr = setTimeout(() => {
            clearTimeout(tmr);
            this.hideToast();
            opts.complete();
          }, opts.duration);
        }
      };
      
      this.toastIconClass = opts.icon;
      let icons = {
        loading: loadingIcon,
        warning: warningIcon,
        success: successIcon,
        none: ""
      };

      if (opts.title) {
        show();
        this.toastIcon = icons[opts.icon];
      } else {
        opts.fail();
        this.showError("缺少title");
      }
    },
    hideToast() {
      if (tmr) clearTimeout(tmr);
      this.toastShow = false;
    },
    showModal(options) {
      let opts = this.extend(
        {
          title: "",
          content: "",
          confirmText: "确定",
          confirmColor: "#00c200",
          showCancel: true,
          cancelText: "取消",
          cancelColor: "#303030",
          showInput:false,
          success: function(comfirm) {},
          fail: function() {},
          complete: function() {}
        },
        options
      );
      this.modalOption = opts;
      if (!(opts.title + opts.content)) {
        this.showError("缺少参数title或content");
        opts.fail();
      } else {
        this.modalShow = true;
      }
      this.modalOption.complete();
    },
    modalSuccess(bl) {
      if(bl){
        this.modalOption.success(bl, this.userinput);
      }else{
        this.modalOption.success(bl);
      }
      this.modalShow = false;
    },
    showError(str) {
      console.error(str);
    },
    extend(target, source) {
      for (var v in source) {
        target[v] = source[v];
      }
      return target;
    }
  }
};
</script>

<style scoped>
@-webkit-keyframes gloading {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes gloading {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.toastCover {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.toast {
  padding:.2rem;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  text-align: center;
  border-radius: 0.1rem;
  color: #fff;
  overflow: hidden;
}
.toast .toastTxt {
  max-width: 3rem;
}
.toast .toastIcon {
  padding: .2rem 0;
  min-width:2rem
}
.toast .toastIcon .loading {
  -webkit-animation: gloading 1s steps(12, end) infinite;
  animation: gloading 1s steps(12, end) infinite;
  width: 1rem;
  height: 1rem;
}
.toast .toastIcon .success {
  width: 0.84rem;
  height: 0.6rem;
}
.toast .toastIcon .warning {
  width: 0.6rem;
  height: 0.6rem;
}

.modalCover {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal {
  width: 4.8rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  text-align: center;
  border-radius: 0.08rem;
  background-color: #fff;
  position: absolute;
  font-size: 0.3rem;
}
.modal .btns {
  border-top: #ddd 1px solid;
}
.modal .btns li {
  height: 0.85rem;
  line-height: 0.85rem;
}
.modal .btns li:nth-of-type(2) {
  border-left: 1px solid #ddd;
}
.modal .maincon {
  padding: 0.3rem;
}
.modal .maincon dt {
  line-height: 1.4em;
  padding: 0.2rem 0;
}
.modal .maincon dd {
  color: #999;
  font-size: 0.26rem;
  line-height: 1.4em;
}
.modal .maincon dd img {
  max-width: 100%;
}
.modal .input{
  margin-top: .2rem;
}
.modal .input input{
  height: .6rem;
  border:1px solid #ccc;
  width:100%;
  padding: 0 .2rem;
  font-size: .28rem;
  background-color: #fdfdfd;
  box-sizing: border-box
}
</style>

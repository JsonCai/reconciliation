<template>
  <section class="Popup-Page">
    <div>
      <div class="btn btn-plain-primary btn-radius" @click="showCenterVisible = true">中</div>
      <div class="btn btn-plain-primary btn-radius" @click="showLeftVisible = true">左</div>
      <div class="btn btn-plain-primary btn-radius" @click="showRightVisible = true">右</div>
      <div class="btn btn-plain-primary btn-radius" @click="showTopVisible = true">上</div>
      <div class="btn btn-plain-primary btn-radius" @click="showBottomVisible = true">下</div>

      <div class="btn btn-primary btn-radius" @click="showBeforeHideVisible = true">关闭拦截</div>
    </div>
    <s-popup custom-class="center-popup" position="center" v-model="showCenterVisible"></s-popup>
    <s-popup custom-class="left-popup" position="left" v-model="showLeftVisible"></s-popup>
    <s-popup custom-class="right-popup" position="right" v-model="showRightVisible"></s-popup>
    <s-popup custom-class="top-popup" position="top" v-model="showTopVisible"></s-popup>
    <s-popup custom-class="bottom-popup" position="bottom" v-model="showBottomVisible"></s-popup>

    <s-popup
      custom-class="center-popup"
      position="center"
      v-model="showBeforeHideVisible"
      :beforeHide="beforeHide"
    ></s-popup>
  </section>
</template>

<script>

import sPopup from '@/s-ui/s-popup';
export default {
  components: {
    sPopup
  },
  data () {
    return {
      showCenterVisible: false,
      showLeftVisible: false,
      showRightVisible: false,
      showTopVisible: false,
      showBottomVisible: false,
      showBeforeHideVisible: false
    };
  },
  methods: {
    beforeHide () {
      return new Promise((resolve, reject) => {
        uni.showModal({
          title: '提示',
          content: '确认关闭弹框吗',
          success: res => {
            if (res.cancel) {
              reject();
            } else {
              resolve();
            }
          }
        });
      });
    }
  }
};
</script>

<style lang="scss">
.Popup-Page {
  padding: 40rpx;
  .btn {
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    &:not(:first-child) {
      margin-top: 40rpx;
    }
  }
  .center-popup {
    .s-popup-wrapper {
      width: 500rpx;
      height: 500rpx;
    }
    // #ifdef H5
    /deep/ .s-popup-wrapper {
      width: 500rpx;
      height: 500rpx;
    }
    // #endif
  }
  .left-popup,
  .right-popup {
    .s-popup-wrapper {
      width: 200rpx;
    }
    // #ifdef H5
    /deep/ .s-popup-wrapper {
      width: 200rpx;
    }
    // #endif
  }
  .top-popup,
  .bottom-popup {
    .s-popup-wrapper {
      height: 200rpx;
    }
    // #ifdef H5
    /deep/ .s-popup-wrapper {
      height: 200rpx;
    }
    // #endif
  }
}
</style>

<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left clearfix">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
        </div>
        <div class="price">￥0</div>
        <div class="des">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay">￥20起送</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/mixin.scss";
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: rem(96px);
    .content {
      display: flex;
      background: #141d27;
      .content-left {
        flex: 1;
        >div {
          float: left;
        }
        .logo-wrapper {
          box-sizing: border-box;
          position: relative;
          top: rem(-20px);
          @include rem(margin, 0 24px 4px);
          @include rem(padding, 12px);
          width: rem(112px);
          height: rem(112px);
          border-radius: 50%;
          background: #141d27;
          .logo {
            width: 100%;
            height: 100%;
            background: #2b343c;
            border-radius: 50%;
            text-align: center;
            .icon-shopping_cart {
              font-size: rem(48px);
              line-height: rem(88px);
              color: #80858a;
            }
          }
        }
        .price,
        .des {
          line-height: rem(48px);
          font-size: rem(32px);
          color: rgba(255, 255, 255, 0.4);
        }
        .price {
          @include rem(margin-top, 24px);
          @include rem(padding-right, 24px);
          font-weight: 700;
          border-right: 2px solid rgba(255, 255, 255, 0.1);
        }
        .des {
          @include rem(margin, 24px);
        }
      }
      .content-right {
        width: rem(210px);
        .pay {
          font-size: rem(36px);
          line-height: rem(96px);
          color: rgba(255, 255, 255, 0.4);
          font-weight: 700;
          text-align: center;
        }
      }
    }
  }
</style>

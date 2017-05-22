<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title clearfix">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}
        </div>
        <div v-if="seller.supports" class="support clearfix">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" @click="showDetail" class="support-count clearfix">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div @click="showDetail" class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" @click="hideDetail" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <v-star :size="48" :score="3.4"></v-star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div @click="hideDetail" class="detail-close">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '@/components/star/star.vue';

  export default {
    name: 'header',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    components: {
      'v-star': star
    }
  };
</script>

<style lang="scss">
  @import "../../common/scss/mixin.scss";
  .header{
    position: relative;
    color: #fff;
    background: rgba(7, 17, 27, 0.5);
    .content-wrapper{
      display: flex;
      position: relative;
      @include rem(padding, 48px 24px 36px 48px);
      .avatar{
        width: rem(128px);
        height: rem(128px);
        img{
          width: 100%;
          height: 100%;
          border-radius: rem(4px);
        }
      }
      .content{
        flex: 1;
        color: #fff;
        margin-left: rem(32px);
        .title{
          @include rem(margin, 4px 0 16px 0);
          span{
            float: left;
          }
          .brand{
            width: rem(60px);
            height: rem(36px);
            @include bg-image('brand');
            background-size: rem(60px) rem(36px);
            background-repeat: no-repeat;
          }
          .name{
            @include rem(margin-left, 12px);
            line-height: rem(36px);
            font-size: rem(32px);
            font-weight: bold;
          }
        }
        .description{
          @include rem(margin-bottom, 20px);
          line-height: rem(24px);
          font-size: rem(24px);
          font-weight: 400;
        }
        .support{
          @include rem(margin-bottom, 4px);
          span{
            float: left;
          }
          .icon{
            width: rem(24px);
            height: rem(24px);
            @include rem(margin-right, 8px);
            background-size: rem(24px);
            background-repeat: no-repeat;
            &.decrease{
              @include bg-image('decrease_1');
            }
            &.discount{
              @include bg-image('discount_1');
            }
            &.guarantee{
              @include bg-image('guarantee_1');
            }
            &.invoice{
              @include bg-image('invoice_1');
            }
            &.special{
              @include bg-image('special_1');
            }
          }
          .text{
            line-height: rem(24px);
            font-size: 20px;
            font-weight: 400;
          }
        }
      }
      .support-count{
        position: absolute;
        right: rem(24px);
        bottom: rem(28px);
        @include rem(padding, 0 16px);
        height: rem(48px);
        line-height: rem(48px);
        border-radius: rem(28px);
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
        span{
          float: left;
        }
        .count{
          font-size: rem(20px);
        }
        .icon-keyboard_arrow_right{
          @include rem(margin-left, 4px);
          line-height: rem(48px);
          font-size: rem(30px);
          font-weight: 400;
        }
      }
    }
    .bulletin-wrapper{
      display: flex;
      height: rem(56px);
      line-height: rem(56px);
      align-items: center;
      @include rem(padding, 0 24px);
      background: rgba(7, 17, 27, 0.2);
      .bulletin-title{
        width: rem(44px);
        height: rem(24px);
        @include bg-image('bulletin');
        background-size: rem(44px) rem(24px);
        background-repeat: no-repeat;
      }
      .bulletin-text{
        flex: 1;
        @include rem(margin, 0 8px);
        @include txt-ellipsis;
        font-size: rem(20px);
        font-weight: 400px;
      }
      .icon-keyboard_arrow_right{
        width: rem(20px);
        height: rem(24px);
        font-size: rem(20px);
        font-weight: 400px;
      }
    }
    .background{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(10px);
    }
    .detail{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      overflow: auto;
      transition: opacity .5s;
      background: rgba(7, 17, 27, 0.8);
      -webkit-backdrop-filter: blur(10px);
      /*&.fade-transition{
        opacity: 1;
      }*/
      &.fade-enter,&.fade-leave-active{
        opacity: 0;
      }
      .detail-wrapper{
        display: flex; // 阻止子元素margin-top的传递
        width: 100%;
        min-height: 100%;
        .detail-main{
          width: 100%;
          @include rem(margin-top, 128px);
          // @include rem(padding-bottom, 128px);
          @include rem(padding, 0 72px 128px);
          .name{
            line-height: rem(32px);
            text-align: center;
            font-size: rem(32px);
            font-weight: 700;
          }
          .star-wrapper{
            @include rem(margin-top, 32px);
            @include rem(padding, 4px 0);
            text-align: center;
          }
          .title{
            display: flex;
            align-items: center;
            width: 100%;
            @include rem(margin, 56px auto 48px);
            .line{
              flex: 1;
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .text{
              @include rem(padding,0px 24px);
              font-size: rem(28px);
              line-height: rem(28px);
              font-weight: 700;
            }
          }
          .supports{
            width: 100%;
            // @include rem(margin, 56px auto 48px);
            .support-item{
              display: flex;
              align-items: center;
              @include rem(padding, 0 24px);
              @include rem(margin-bottom, 24px);
              &:last-child{
                margin-bottom: 0;
              }
              .icon{
                width: rem(32px);
                height: rem(32px);
                @include rem(margin-right, 24px);
                background-size: rem(32px);
                background-repeat: no-repeat;
                &.decrease{
                  @include bg-image('decrease_2');
                }
                &.discount{
                  @include bg-image('discount_2');
                }
                &.guarantee{
                  @include bg-image('guarantee_2');
                }
                &.invoice{
                  @include bg-image('invoice_2');
                }
                &.special{
                  @include bg-image('special_2');
                }
              }
              .text{
                flex: 1;
                line-height: rem(24px);
                font-size: rem(24px);
                font-weight: 400;
              }
            }
          }
          .bulletin{
             width: 100%;
             .content{
               @include rem(padding, 0 24px);
                line-height: rem(48px);
                font-size: rem(24px);
                font-weight: 400;
             }
          }
        }
      }
      .detail-close{
        position: relative;
        width: rem(128px);
        height: rem(128px);
        line-height: rem(128px);
        text-align: center;
        @include rem(margin, -128px auto 0);
        font-size: rem(64px);
        color: rgba(255, 255, 255, 0.2);
        clear: both;
      }
    }
  }
</style>

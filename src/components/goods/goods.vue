<template>
  <div class="goods" ref="goodsWrapper">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
        v-for="(item, index) in goods"
        class="menu-item menu-item-hook"
        :class="{'current':currentIndex===index}"
        @click="selectMenu(index, $event)">
          <span class="text">
            <i v-show="item.type>0" class="icon" :class="classMap[item.type]"></i>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="item in item.foods" class="food-item">
              <div class="icon">
                <img :src="item.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{item.name}}</h2>
                <p class="desc">{{item.description}}</p>
                <div class="extra clearfix">
                  <span class="count">月售{{item.sellCount}}份</span>
                  <span>好评率{{item.rating}}%</span>
                </div>
                <div class="price clearfix">
                  <span class="now">￥{{item.price}}</span>
                  <span class="old" v-show="item.oldPrice">￥{{item.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';

  const ERR_OK = 0;
  export default {
    name: 'goods',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        listMenuHeight: [],
        scrollY: 0,
        menuCurIndex: 0,
        goodsHeight: 0
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            this.menuCurIndex = i;
            return i;
          }
        }
        return 0;
      }
    },
    created() {
      this.$http.get('/api/goods').then(response => {
        // success callback
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calcHeight();
            this._calcmenuItemHeight();
            this.getGoodsHeight();
          });
        }
      }, response => {
        // error callback
        console.log('goods--error');
      });
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      menuAutoSrcoll() {
        let goodsHeight = this.goodsHeight;
        let distance = this.listMenuHeight[this.menuCurIndex];

        if (distance > (goodsHeight / 2)) {
          let moveH = -Math.floor(distance - (goodsHeight / 2));
          this.menuScroll.scrollTo(0, moveH, 300, 'easing');
        } else {
          this.menuScroll.scrollTo(0, 0, 300, 'easing');
        }
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
          this.menuAutoSrcoll();
        });
      },
      _calcHeight() {
        let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        };
      },
      _calcmenuItemHeight() {
        let menuList = this.$refs.menuWrapper.querySelectorAll('.menu-item-hook');
        let height = 0;
        this.listMenuHeight.push(height);
        for (let i = 0; i < menuList.length; i++) {
          let item = menuList[i];
          height += item.clientHeight;
          this.listMenuHeight.push(height);
        };
      },
      getGoodsHeight() {
        this.goodsHeight = this.$refs.goodsWrapper.clientHeight;
      }
    }
  };
</script>

<style lang="scss">
   @import "../../common/scss/mixin.scss";
  .goods{
    display: flex;
    position: absolute;
    top: rem(348px);
    bottom: rem(92px);
    width: 100%;
    overflow: hidden;
    .menu-wrapper{
      // flex: 0 0 rem(160px);
      width: rem(160px);
      background: #f3f5f7;
      .menu-item{
        display: table;
        height: rem(104px);
        @include rem(padding, 0 24px);
        line-height: rem(28px);
        &.current{
          position: relative;
          margin-top: -1px;
          background: #fff;
          .text{
            @include border-none();
            font-weight: 700;
          }
        }
        .icon{
          display: inline-block;
          width: rem(24px);
          height: rem(24px);
          @include rem(margin-right, 4px);
          background-size: rem(24px);
          background-repeat: no-repeat;
          position: relative;
          transform: translateY(rem(2px));
          &.decrease{
            @include bg-image('decrease_3');
          }
          &.discount{
            @include bg-image('discount_3');
          }
          &.guarantee{
            @include bg-image('guarantee_3');
          }
          &.invoice{
            @include bg-image('invoice_3');
          }
          &.special{
            @include bg-image('special_3');
          }
        }
        .text{
          display: table-cell;
          vertical-align: middle;
          width: rem(112px);
          font-size: rem(24px);
          @include border-1px(rgba(7,17,27,0.1));
        }
      }
    }
    .foods-wrapper{
      flex: 1;
      .title{
        height: rem(52px);
        line-height: rem(52px);
        @include rem(padding-left, 28px);
        font-size: rem(24px);
        color: rgb(147,153,159);
        background: #f3f5f7;
        border-left: 2px solid #d9dde1;
      }
      .food-item{
        display: flex;
        @include rem(margin, 36px);
        @include rem(padding-bottom, 36px);
        @include border-1px(rgba(7,17,27,0.1));
        &:last-child{
          @include border-none();
          @include rem(margin-bottom, 0);
        }
        .icon{
          width: rem(114px);
          height: rem(114px);
          @include rem(margin-right, 20px);
          img{
            width: 100%;
            height: 100%;
          }
        }
        .content{
          flex: 1;
          .name{
            line-height: rem(28px);
            @include rem(margin-top, 4px);
            font-size: rem(28px);
            color: rgb(7,17,27);
          }
          .desc, .extra{
            font-size: rem(20px);
            color: rgb(147,153,159);
          }
          .desc{
            line-height: rem(24px);
            @include rem(margin-top, 16px);
            @include rem(margin-bottom, 16px);
          }
          .extra, .price{
            span{
              float: left;
            }
          }
          .extra{
            line-height: rem(20px);
            .count{
              @include rem(margin-right, 24px);
            }
          }
          .price{
            line-height: rem(48px);
            font-weight: 700;
            .now{
              @include rem(margin-right, 16px);
              font-size: rem(28px);
              color: rgb(240,20,20);
            }
            .old{
              font-size: rem(20px);
              text-decoration: line-through;
              color: rgb(147,153,159);
            }
          }
        }
      }
    }
  }
</style>

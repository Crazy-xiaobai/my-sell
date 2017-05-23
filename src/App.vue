<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <router-link tag="div" to="/goods" class="tab-item">
        <a>商品</a>
      </router-link>
      <router-link tag="div" to="/ratings" class="tab-item">
        <a>评论</a>
      </router-link>
      <router-link tag="div" to="/seller" class="tab-item">
        <a>商家</a>
      </router-link>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/header/header';

  const ERR_OK = 0;

  export default {
    name: 'app',
    data() {
      return {
        seller: {
        }
      };
    },
    created() {
      this.$http.get('/api/seller').then(response => {
        // success callback
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
        }
      }, response => {
        // error callback
        console.log('seller--error');
      });
    },
    components: { 'v-header': header }
  };
</script>

<style lang="scss">
  @import "./common/scss/mixin.scss";
  .tab {
    display: flex;
    width: 100%;
    height: rem(80px);
    line-height: rem(80px);
    @include border-1px(rgba(7, 17, 27, 0.1));
    .tab-item {
      flex: 1;
      text-align: center;
      >a {
        display: block;
        font-size: rem(28px);
        color: rgb(78, 85, 93)
      }
      &.active {
        a {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
</style>


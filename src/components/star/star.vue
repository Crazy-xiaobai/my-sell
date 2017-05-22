<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" :key="itemClass.index" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);

        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/mixin.scss";
  .star{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    .star-item{
      background-repeat: no-repeat;
    }
    &.star-48{
      .star-item{
        width: rem(40px);
        height: rem(40px);
        @include rem(margin-right, 44px);
        background-size: rem(40px);
        &:last-child{
          margin-right: 0;
        }
        &.on{
          @include bg-image('star48_on');
        }
        &.half{
          @include bg-image('star48_half');
        }
        &.off{
          @include bg-image('star48_off');
        }
      }
    }
    &.star-36{
      .star-item{
        width: rem(30px);
        height: rem(30px);
        @include rem(margin-right, 12px);
        background-size: rem(30px);
        &:last-child{
          margin-right: 0;
        }
        &.on{
          @include bg-image('star36_on');
        }
        &.half{
          @include bg-image('star36_half');
        }
        &.off{
          @include bg-image('star36_off');
        }
      }
    }
    &.star-24{
      .star-item{
        width: rem(20px);
        height: rem(20px);
        @include rem(margin-right, 6px);
        background-size: rem(20px);
        &:last-child{
          margin-right: 0;
        }
        &.on{
          @include bg-image('star24_on');
        }
        &.half{
          @include bg-image('star24_half');
        }
        &.off{
          @include bg-image('star24_off');
        }
      }
    }
  }
</style>

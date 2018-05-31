<template>
  <div>
    <mt-header :title="title" :class="$style.header">
      <a slot="left" v-touch:tap="back">
        <mt-button icon="back">返回</mt-button>
      </a>
    </mt-header>
  </div>
</template>

<script>
export default {
  props: ['title'],
  methods: {
    back () {
      history.back()
    }
  }
}
</script>

<style lang="stylus" module>
.header {
  height: 45px;
  background: #fff;
  color: #5b5b5b;
  z-index: 2;
  border-bottom: 1px solid #f1f1f1;

  .mint-header-title {
    overflow: scroll;
  }
}
</style>

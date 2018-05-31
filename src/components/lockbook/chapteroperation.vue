<template>
  <div>
    <div :class="$style.operation">
      <div v-touch:tap="previous">上一章</div>
      <div v-touch:tap="setup">设置</div>
      <div v-touch:tap="next">下一章</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 1是上一章 2是下一章 3是设置
    previous () {
      this.$emit('operation', '1')
    },
    setup () {
      this.$emit('setup', '2')
    },
    next () {
      this.$emit('next', '3')
    }
  }
}
</script>

<style lang="stylus" module>
.operation {
  width: 100%;
  height: 40px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  div {
    width: 33.333%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #363636;
    color: #AFB0BA;
  }

  div:nth-child(2) {
    font-size: 12px;
  }
}
</style>

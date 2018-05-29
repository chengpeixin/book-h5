<template>
  <div>
    <div :class="$style.footer"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="stylus" module>
.footer {
  width: 100%;
  height: 40px;
  background: red;
  position: fixed;
  bottom: 0;
  z-index: 999;
}
</style>

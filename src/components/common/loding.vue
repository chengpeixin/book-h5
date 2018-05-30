<template>
  <div>
    <div :class="$style.center">
      <div :class="$style.slote">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" module>
.center {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;

  .slote {
    width: 45%;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 2px;
    background: rgba(48, 48, 48, 1);
  }
}
</style>

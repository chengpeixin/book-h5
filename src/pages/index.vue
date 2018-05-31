<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Booklist></Booklist>
    <!-- <Footer></Footer> -->
  </div>
</template>
<script>
import Booklist from '@/components/home/list';
import Footer from '@/components/common/footer';
export default {
  components: { Booklist, Footer }
}
</script>
<style lang="stylus" module>
</style>

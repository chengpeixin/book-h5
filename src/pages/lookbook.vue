<template>
  <div>
    <Loding :class="$style.loading" v-if="text==''">
      <img :class="$style.loadingimg" src="@/assets/loading-book.gif">
      <p :class="$style.loadingtext">正在为您加载，请耐心等等</p>
    </Loding>
    <div id="wrapper" :class="$style.wrapper">
      <div class="content">
        <div v-bind:class="{day:pattern}">
          <p :class="$style.title">{{title}}</p>
          <div v-html="text" :class="$style.content"></div>
        </div>
        <Chapteroperation @operation='operation' @setup="setup" @next="next"></Chapteroperation>
      </div>
    </div>
  </div>
</template>

<script>
import Loding from '@/components/common/loding';
import Chapteroperation from '@/components/lockbook/chapteroperation';
export default {
  data () {
    return {
      datas: [],
      bookid: this.$route.query.book,
      chapterid: this.$route.query.chapterid,
      text: '',
      title: '',
      pattern: true,
      show: true,
      scroll: ''
    }
  },
  created () {
    this.gettext()
  },
  methods: {
    gettext () {
      this.$router.push({
        path: '/lookbook',
        query: { book: this.bookid, chapterid: this.chapterid }
      })
      const that = this
      this.$http
        .post(`http://xinpeicheng.com:8082/api/getChaptertext`, {
          id: this.bookid,
          // 开始阅读，一开始定死为1
          chapterid: this.chapterid
        })
        .then(res => {
          that.datas = res.data.data.text
          that.title = res.data.data.title
          for (let i = 0; i < that.datas.length; i++) {
            that.text += `<p style="margin-top:2vw;line-height:6vw;">${that
              .datas[i]}</p>`
          }
        })
    },
    async initscroll () {
      // 初始化scrol
      this.scroll = new this.$Bscroll(document.getElementById('wrapper'))

      this.scroll.on('scroll', pos => {})
    },
    operation (status) {
      console.log(status)
    },
    setup (status) {
      console.log(status)
    },
    next (status) {
      this.chapterid += 1
      this.$router.push({
        path: '/lookbook',
        query: { book: this.bookid, chapterid: this.chapterid }
      })

      console.log(this.bookid, this.chapterid)
    }
  },
  mounted () {
    this.initscroll()
  },
  components: {
    Loding,
    Chapteroperation
  }
}
</script>
<style>
.day {
}
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
} */
</style>

<style lang="stylus" module>
.wrapper {
  width: 100%;
  height: 667px;
  background: #fec;
}

.title {
  height: 40px;
  padding: 10px 10px 0px 10px;
  box-sizing: border-box;
  font-size: 24px;
  font-weight: 600;
}

.loading {
  .loadingimg {
    width: 34px;
    height: 36px;
    display: block;
    margin: 0 auto;
  }

  .loadingtext {
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
    color: #bbbbbb;
  }
}

.content {
  padding: 10px 8px 0px 8px;
}
</style>

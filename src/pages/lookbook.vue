<template>
  <div>
    <Loding :class="$style.loading" v-if="text==''">
      <img :class="$style.loadingimg" src="@/assets/loading-book.gif">
      <p :class="$style.loadingtext">正在为您加载，请耐心等等</p>
    </Loding>
    <div v-bind:class="{day:pattern}">
      <p :class="$style.title">{{title}}</p>
      <div v-html="text" :class="$style.content">
      </div>
      <div :class="$style.operation">
        <div>上一章</div>
        <div>设置</div>
        <div>下一章</div>
      </div>
    </div>
  </div>
</template>

<script>
import Loding from '@/components/common/loding';
export default {
  data () {
    return {
      datas: [],
      bookid: this.$route.query.book,
      chapterid: this.$route.query.chapterid,
      text: '',
      title: '',
      pattern: true
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
    }
  },
  components: {
    Loding
  }
}
</script>
<style>
.day {
  background: #fec;
}
</style>

<style lang="stylus" module>
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

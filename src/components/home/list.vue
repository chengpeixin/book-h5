<template>
  <div>
    <div id="wrapper" :class="$style.wrapper">
      <ul class="content">
        <li v-for="item in datas" :class="$style.listitem" v-touch:tap="lockbook(item)">
          <div :class="$style.left">
            <img :src="item.img" onerror="console.error('没有图片')">
          </div>
          <div :class="$style.right">
            <p :class="$style.bname">{{item.bookName}}</p>
            <p :class="$style.author">作者:{{item.author}}</p>
            <p :class="$style.summery">{{item.summery.length>20?"长度超过":item.summery}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'list',
  data () {
    return {
      datas: []
    }
  },
  components: {},
  created () {
    this.getbooklist()
  },
  mounted () {
    // 初始化scrol
    let scroll = new this.$Bscroll(document.getElementById('wrapper'))
  },
  methods: {
    async getbooklist () {
      let { data } = await this.$http.get(
        'http://xinpeicheng.com:8082/api/getBookList'
      )
      this.datas = data.data
    },
    lockbook (data) {
      return () => {
        this.$router.push({
          path: '/bookinfo',
          query: { book: data.id }
        })
      };
    }
  }
}
</script>
<style lang="stylus" module>
.wrapper {
  height: 667px;
  width: 100%;
  background: #edece3;
}

.listitem {
  display: block;
  height: 120px;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  background: #edece3;
  border-bottom: 1px solid #d5d6d3;

  .left {
    float: left;
    width: 22%;
    height: 100px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .right {
    float: left;
    width: 78%;
    padding-left: 10px;
    box-sizing: border-box;

    .bname {
      height: 22px;
      color: #6c6c6c;
      font-size: 17px;
    }

    .author {
      height: 28px;
      display: flex;
      align-items: center;
      color: #838383;
    }

    .summery {
      width: 100%;
      height: 40px;
      font-size: 13px;
      color: #838383;
    }
  }
}

.listitem:last-child {
  border: none;
}
</style>

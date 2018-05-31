<template>
  <div>
    <xheader :title="title"></xheader>
    <div id="wrapper" :class="$style.wrapper">
      <div class="content">
        <div :class="$style.bookfull">
          <div :class="$style.left">
            <img :src="bookSrc">
          </div>
          <div :class="$style.right">
            <p :class="$style.bookname">{{title}}</p>
            <p :class="$style.author">{{author}}</p>
            <p :class="$style.Startreading" v-touch:tap="startreading">开始阅读</p>
          </div>
        </div>
        <p :class="$style.summery">{{summery}}</p>
        <div :class="$style.Catalog">
          <p :class="$style.cata">目录</p>
          <ul>
            <li v-for="item in chapters" :class="$style.chaptersitem" v-touch:tap="readingNum(item)">
              {{item.title}}
            </li>
          </ul>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      bookSrc: "",
      author: "",
      summery: "",
      chapters: [],
      bookid: this.$route.query.book,
      scroll: ""
    };
  },
  mounted() {
    this.initscroll();
  },
  created() {
    this.getbookinfo();
  },
  methods: {
    async initscroll() {
      // 初始化scrol
      this.scroll = new this.$Bscroll(document.getElementById("wrapper"));

      this.scroll.on("scroll", pos => {});
    },
    async getbookinfo() {
      let {
        data
      } = await this.$http.post(`http://xinpeicheng.com:8082/api/getBook`, {
        id: this.bookid
      });
      data = data.data;
      this.title = data.bookName;
      this.bookSrc = data.img;
      this.author = data.author;
      this.summery = data.summery;
      this.chapters = data.chapter;
      console.log(data);
    },
    async startreading() {
      this.$router.push({
        path: "/lookbook",
        query: { book: this.bookid, chapterid: 1 }
      });
      let {
        data
      } = await this.$http.post(
        `http://xinpeicheng.com:8082/api/getChaptertext`,
        {
          id: this.bookid,
          // 开始阅读，一开始定死为1
          chapterid: 1
        }
      );
      console.log(data);
    },
    readingNum(data) {
      return () => {
        this.$router.push({
          path: "/lookbook",
          query: { book: this.bookid, chapterid: data.chapterid }
        });
        this.$http
          .post(`http://xinpeicheng.com:8082/api/getChaptertext`, {
            id: this.bookid,
            // 开始阅读，一开始定死为1
            chapterid: data.chapterid
          })
          .then(res => {
            console.log(res);
          });
      };
    }
  }
};
</script>

<style lang="stylus" module>
.wrapper {
  height: 622px;
  width: 100%;
}

.bookfull {
  padding: 20px 10px;
  box-sizing: border-box;
  height: 168px;

  .left {
    float: left;
    width: 30%;
    height: 144px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .right {
    width: 70%;
    float: left;
    padding-left: 20px;
    box-sizing: border-box;
    color: #5b5b5b;
    white-space: normal;

    .bookname {
      height: 30px;
    }

    .summery {
      font-size: 13px;
      color: #999;
    }

    .author {
      color: #a4a4a4;
      font-size: 13px;
      height: 20px;
      line-height: 20px;
    }

    .Startreading {
      color: #46b751;
      margin-top: 40px;
      width: 150px;
      height: 40px;
      background: #fff;
      border: 1px solid #e6e6e6;
      box-shadow: 0 10px 20px -7px #d2d1cd;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.summery {
  text-indent: 2em;
  line-height: 20px;
  padding: 10px;
  font-size: 12px;
  color: #333;
}

.Catalog {
  margin-top: 10px;

  .cata {
    color: #7e7e7e;
    text-align: center;
    font-size: 16px;
    height: 30px;
    border-bottom: 0.5px solid #d3d3d1;
  }

  ul {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;

    .chaptersitem {
      color: #666;
      height: 48px;
      font-size: 17px;
      border-bottom: 1px solid #d3d3d1;
      box-sizing: border-box;
      line-height: 48px;
    }
  }
}
</style>

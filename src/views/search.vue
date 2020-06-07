<template>
  <div class="m-input">
    <div class="inputcover">
      <i class="iconfont icon-sousuo u-svg-srch"></i>
     <input class="input" v-model="input" placeholder="搜索歌曲、歌手、专辑"></input>
      <figure class="close"><i @click="del" class="iconfont icon-guanbi111 z-show"></i></figure>
    </div>
    <div class="m-default">
      <section class="m-hotlist"><h3 class="title">热门搜索</h3>
        <ul class="list">
          <li v-for="item in hotList" :key="Math.random()" class="item f-bd f-bd-full"><a class="link" href="javascript:void(0);" @click="show(item.first)">{{item.first}}</a></li>
        </ul>
      </section>
    </div>
    <section class="m-recom"><h3 class="title f-bd f-bd-btm f-thide">搜索{{input}}</h3>
      <ul class="ul" v-if="flag">
        <li v-for="item in tips" :key="Math.random()" class="recomitem" @click="search(item.songname)"><i class="iconfont icon-sousuo"></i><span class="f-bd f-bd-btm f-thide">{{item.songname}}</span></li>
      </ul>
      <searchList :song="tipss" v-if="!flag"></searchList>
    </section>
  </div>
</template>

<script>
  import api from '../api'
  import searchList from './searchList'
  export default {
    data () {
      return {
        input: '',
        hotList:[],
        tips:[],
        tipss:[],
        flag:true
      }
    },
    created () {
      let hotList = this.$http.get(api.getHotList())
      hotList.then((data)=>{
        this.hotList=data.data;
      })
    },
    methods:{
      show(text){
        this.input=text
      },
      del(){
        this.input=''
      },
      getAnswer(words){
        this.$jsonp(`https://c.y.qq.com/soso/fcgi-bin/client_search_cp?g_tk=5381&p=1&n=6&w=${words}&format=jsonp&jsonpCallback=callback&loginUin=0&hostUin=0&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&remoteplace=txt.yqq.song&t=0&aggr=1&cr=1&catZhida=1&flag_qc=0`,{callbackQuery:'jsonpCallback',callbackName:'callback'}).then((data)=>{
          this.tips=data.data.song.list
        })
      },
      search(it){
        this.flag=!this.flag;
        this.$http.get(api.getSearchSong(it)).then((data)=>{
          this.tipss=data.data.Body
        })
      }

    },
    watch: {
      input: function () {
        this.flag=true;
        this.getAnswer(this.input)
      }
    },
    components:{
      searchList
    }
  }

</script>

<style lang="less" scoped>
  .m-input {
    padding: 15px 10px;
   .u-svg-srch {
      position: absolute;
      left: 0;
      top: 4px;
      margin: 0 8px;
      vertical-align: middle;
    }
    .close {
      position: absolute;
      right: -40px;
      top: -12px;
      width: 30px;
      height: 30px;
      line-height: 28px;
      text-align: center;
    }
    .z-show {
      display: inline-block;
    }
  .inputcover {
    position: relative;
    width: 100%;
    height: 30px;
    padding: 0 30px;
    box-sizing: border-box;
    background: #ebecec;
    border-radius: 30px;
  .input {
    width: 100%;
    height: 30px;
    line-height: 18px;
    background: transparent;
    font-size: 14px;
    color: #333;
    border: 0;
    outline: none;
  }
  }
  }
  .m-hotlist {
    padding: 15px 10px 0;
    .title {
      font-size: 12px;
      line-height: 12px;
      color: #666;
    }
    .list {
      margin: 10px -50px 7px;
      .item {
        display: inline-block;
        height: 32px;
        margin-right: 8px;
        margin-bottom: 8px;
        padding: 0 14px;
        font-size: 14px;
        line-height: 32px;
        color: #333;
        border: 1px solid #d3d4da;
        border-radius: 32px;
      }
      .f-bd {
        position: relative;
      }
    }
  }
  .m-recom {
    margin: 0 auto;
    ul{
      padding: 0;
    }
    .title {
      height: 25px;
      margin-left: 10px;
      padding-right: 10px;
      font-size: 15px;
      line-height: 50px;
      color: #507daf;
    }
    .f-bd {
      position: relative;
    }
    .recomitem {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      height: 45px;
      padding-left: 10px;
      border-bottom: 1px solid #ccc;
      i {
        -webkit-box-flex: 0;
        -webkit-flex: 0 0 auto;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        margin-right: 7px;
      }
      span {
        display: inline-block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        width: 1%;
        padding-right: 10px;
        font-size: 15px;
        line-height: 45px;
        color: #333;
      }
      .f-bd {
        position: relative;
      }
      .f-thide {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
      }
    }
  }
</style>

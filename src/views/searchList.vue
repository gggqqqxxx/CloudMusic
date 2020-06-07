<template>
  <div>
    <mu-circular-progress :size="40" class="center" v-if="isloading"/>
    <mu-list v-show="!isloading">
      <div v-for="(item, index) in song" :key="item.id" @click="playAudio(item)">
        <mu-list-item  :disableRipple="true" :title="item.title" :describeText="item.author">
          <span slot="left" class="indexStyle">{{index + 1}}</span>
        </mu-list-item>
        <mu-divider inset></mu-divider>
      </div>
    </mu-list>
  </div>
</template>

<script>
  import api from '../api'
  import { mapGetters } from 'vuex'
  export default {
    props:['song'],
    data () {
      return {
        list: [],
        isloading: false,
      }
    },
    methods: {
      playAudio (song) {
        document.getElementById('audioPlay').pause()
        this.$store.commit('pause')
        var audio = {}
        audio.id = song.id  // id
        audio.singer = song.author // 演唱者
        audio.albumPic = song.pic
        audio.name = song.title
        // 通过Vuex改变状态
        this.$store.commit('addToList', audio)
        this.$store.dispatch('getSong', audio.id)
      },
    },
    computed: {
      ...mapGetters([
        'songList'
      ])
    },
  }
</script>

<style lang="less" scoped>
  .indexStyle {
    padding-left: 10px;
    font-size: 18px;
    font-weight: bolder;
  }
  .mu-item-title {
    white-space:nowrap;
    height: 1.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bg-player {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom right;
    filter: blur(40px);
    -webkit-filter: blur(40px);
    z-index: 1;
  }
  .bg-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #292a2b;
    background-color: rgba(0,0,0,.35);
    z-index: 2;
  }
  .center {
    display: block!important;
    margin: 10% auto 0;
  }
  .view {
    width:100%;
    margin-bottom:2.3rem;
  }
  .mu-item-title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 1.5;
  }
</style>

const _baseUrl = ' https://easy-mock.com/mock/5d4b85718cd19a05878af025/music'
const _baseUrl2 = 'https://api.imjad.cn/cloudmusic/'
export default {
  /**
   * 获取首页Banner图片数据
   */
  getBannerList () {
    return `${_baseUrl}/banner`
  },
  /**
   * 获取推荐歌单
   */
  getPersonalized () {
    return `${_baseUrl}/personalized`
  },
  /**
   *
   * @param {*} cat
   * @param {*} order
   * @param {*} offset
   * @param {*} total
   * @param {*} limit
   */
  getPlayListByWhere () {
    return `${_baseUrl}/personalized`
  },
  /**
   * 获取歌词API
   * @param {Number} id
   */
  getLrc (id) {
    return `${_baseUrl2}?type=lyric&id=${id}`
  },
  /**
   * 获取歌曲 播放URL
   * @param {Number} id
   */
  getSong (id) {
    return `${_baseUrl2}?type=song&id=${id}`
  },
  getSearchSong(text){
    return `https://api.mlwei.com/music/api/wy/?key=523077333&id=${text}&type=so&cache=0&nu=6`
  },

  /**
   * 获取歌单详情
   * @param {Number} id
   */
  getPlayListDetail (id) {
    return `${_baseUrl2}?type=playlist&id=${id}`
  },
  getHotList () {
    return `${_baseUrl}/hot`
  }
}

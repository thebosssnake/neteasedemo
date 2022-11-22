import { getPhoneLogin } from '@/requst/api/home'
import { getMusicLyric } from '@/requst/api/item'
import { createStore } from 'vuex'

export default createStore({
  state: {
    playList:[{
      al:{
        id:148263031,
        name:"灵魂伴侣(Soul Mate)",
        pic:109951167685725310,
        picUrl:"https://p1.music.126.net/LWBLDwHBK_5sGBteS0kZpg==/109951167685725308.jpg",
        pic_str:"109951167685725308"
      },
      name:"灵魂伴侣(Soul Mate)",
      id:1964850254
    }],
    userplayList:[{

    }],
    detailShow:false,
    playListIndex:0,
    isbtnShow:true,
    lyricList:{},
    currentTime:0,
    duration:0,
    isLogin:false,
    token:"",
    user:{},
    searchShow:false
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow:function(state,value){
      state.isbtnShow=value
    },
    updateToken:function(state,value){
      state.token=value
      localStorage.setItem('token',state.token)
    },
    pushPlayList:function(state,value){
      state.playList.push(value)
    },
    updateDuration:function(state,value){
      state.duration=value
    },
    updatePlayList:function(state,value){
      state.playList=value
    },
    updatePlayListIndex:function(state,value){
      state.playListIndex=value
    },
    updateDetailShow:function(state,value){
      state.detailShow=!state.detailShow
    },
    updateLyricList:function(state,value){
      state.lyricList=value
    },
    updatecurrentTime:function(state,value){
      state.currentTime=value
    },
    updateUser:function(state,value){
      state.user=value
    }
  },
  actions: {
    getLyric:async function(context,value){
        let res=await getMusicLyric(value)
        //console.log(res);
        context.commit("updateLyricList",res.data.lrc)
    },
    getLogin:async function(context,value){
      let res=await getPhoneLogin(value)
      //console.log(res);
     return res
  },
  },
  modules: {
  }
})

<template>
  <img :src="store.state.user.data.profile.backgroundUrl" alt="" class="bgu" />

  <div class="userInfoTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
  </div>
  <div class="user">
    <div class="userInfo">
      <img
        :src="store.state.user.data.profile.avatarUrl"
        alt=""
        class="userImg"
      />
      <div class="name">{{ store.state.user.data.profile.nickname }}</div>
    </div>
    <div class="userfollow">
      <div>{{ store.state.user.data.profile.follows }}关注&#32|</div>
      <div>&#160{{ store.state.user.data.profile.followeds }}粉丝</div>
      <div></div>
    </div>
    <div>个人简介:{{ store.state.user.data.profile.signature }}</div>
  </div>
  <div class="list">
  <div class="listname">收藏的歌单</div>
  <div class="songdetail">
      <div class="song" v-for="item in playList.playlist" :key="item">
          <router-link
            class="songleft"
            :to="{ path: '/itemMusic', query: { id: item.id } }"
          >
          <div class="leftSpan">
            <img :src="item.coverImgUrl" alt=""></div>
          <div class="sdetail">
            <p class="songname">{{ item.name }}</p>
            <span class="songar">
              <div class="ar">
              {{item.trackCount}}首,By&#32{{item.creator.nickname}},&#32播放{{changeCount(item.playCount)}}次
              </div></span
            >
          </div>
         </router-link>
      </div>
    </div>
  </div>
    
</template>
<script>
import { onMounted,reactive } from "vue";
import { useStore } from "vuex";
import { getSubcount, getPlayList } from "@/requst/api/home";
export default {
  setup() {
    const changeCount = (num) => {
      if (num >= 100000000) {
        return (num / 10000000).toFixed(1) + "亿";
      } else {
        if (num >= 10000) return (num / 10000).toFixed(1) + "万";
        else{
          return num
        }
      }
    };
    let playList = reactive({
      playlist:[]
    });
    const getSubCount = async () => {
      let res = await getPlayList(store.state.user.data.profile.userId);
      console.log(res);
      playList.playlist = res.data.playlist;  
      console.log(playList.playlist)
    };
    const get=()=>{
      console.log(playList)
    }
     
    const store = useStore();
    onMounted(() => {
      getSubCount();
      get()
    });
    return {
      changeCount,
      get,
      playList,
      getSubCount,
      store,
    };
  },
};
</script>
<style lang="less" scoped>
.icon {
  margin: 0.2rem;
  fill: #fff;
}
.bgu {
  position: absolute;
  height: 3.4rem;
  width: 100%;
  top: 0;
  z-index: -1;
}
.songlist {
  background-color: white;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  .playbtn {
    margin-top: 0.4rem;
    height: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .iconItem {
      width: 50%;
      margin-left: 2%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .play {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 80%;
        .playall {
          font-size: 0.28rem;
          font-weight: 700;
        }
        .songnum {
          color: #aaa;
          font-size: 0.1rem;
        }
        margin-left: 0.4rem;
      }
    }
    .subbtn {
      background-color: red;
      margin-right: 0.1rem;
      width: 30%;
      height: 80%;
      border-radius: 0.4rem;
      font-size: 0.25rem;
      color: white;
      align-items: center;
      display: flex;
      justify-content: space-around;
      .icon {
        fill: white;
        width: 0.3rem;
      }
    }
  }
}
.user {
  margin-top: 2rem;
  background-color: #fff;
  height: 3rem;
  width: 100%;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .userfollow {
    display: flex;
    justify-content: space-around;
  }
  .userInfoTop {
    width: 100%;
    height: 1rem;
    padding: 0.3rem;
  }
  .userInfo {
    margin-top: 0.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .userImg {
      height: 1rem;
      width: 1rem;
      border-radius: 0.5rem;
    }
    .name {
      font-size: 0.4rem;
      font-weight: 700;
    }
  }
}
.list{
  padding: .3rem;
  .listname{
  font-weight: 700;
  font-size: .4rem;
  height: .7rem;
  width: 100%;
  margin-left: .1rem;
}
.songdetail {
    .song {
      display: flex;
      justify-content: space-between;
      height: 1.1rem;
      align-items: center;

      .songleft {
        img{
          width: 1rem;
          border-radius: .2rem;
        }
        display: flex;
        justify-content: flex-start;
        text-align: center;
        align-items: center;
        width: 90%;
        .leftSpan {
          width: 15%;
          height: 100%;
          text-align: center;
          line-height: 100%;
        }
        .sdetail {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          width: 78%;
          margin-left: .3rem;
          .songname {
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #000;
          }
          .songar {
            text-align: left;
            display: flex;
            justify-content: flex-start;
            .ar {
              color: #999;
              font-size: 0.16rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
}

</style>
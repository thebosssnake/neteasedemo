<template>
  <div>
    <div class="graybg"></div>
  <div class="itemMusicTop">
    <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <svg class="icon" aria-hidden="true" @click="store.state.searchShow= true">
        <use xlink:href="#icon-31sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>  <van-popup
    v-model:show="store.state.searchShow"
    position="right"
    :style="{ height: '100%', width: '100%', }"
  >
    <ListSearch :itemlist="Show.itemlist"/>
  </van-popup>
  </div>


  <div class="itemMusicDetail">
    <div class="detailimg"><img :src="playlist.coverImgUrl" alt="" /></div>
    <div class="detail">
      <div class="listName">{{ playlist.name }}</div>
      <div class="userName">
        <div class="Img"><img :src="userlist.avatarUrl" alt="" /></div>
        <div class="Name">{{ userlist.nickname }}</div>
      </div>
      <div class="userSignature">{{ userlist.signature }}</div>
    </div>
  </div>
  <div class="playListIcon">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiaoxi"></use>
      </svg>
      <span>{{ playlist.commentCount }}</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{ playlist.shareCount }}</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-show_duoxuan"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
  </div>
</template>
<script>
import ListSearch from "@/components/item/ListSearch.vue";
import { onMounted, onUpdated, reactive } from "vue";
import { useStore } from "vuex";
export default {
  components:{
    ListSearch
  },
  setup(props) {
    const store=useStore()
    let Show = reactive({
      searchShow:false,
      itemlist:{}
    });
    onUpdated(()=>{
      Show.itemlist=props.itemList 
      //console.log(Show.itemlist);
    })
    //console.log(props);
    
   
    return {
      Show,props,store
    };
  },
  props: [`playlist`, `userlist`, `itemList`],
};
</script>
<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  .bgimg {
    width: 100%;
    height: 11rem;
    position: fixed;
    z-index: -1;
    filter: blur(0.6rem);
  }
  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.2rem;
    span {
      font-size: 0.4rem;
      color: #fff;
    }
    .icon {
      fill: #fff;
    }
  }
}
.itemMusicDetail {
  margin-top: 0.5rem;
  width: 100%;
  height: 2.8rem;
  display: flex;
  justify-content: space-around;
  .detail {
    width: 60%;
    .listName {
      height: 0.9rem;
      color: rgb(255, 255, 255);
      font-weight: 800;
    }
    .userSignature {
      height: 0.69rem;
      color: #ddd;
      font-size: 0.1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .userName {
      height: 0.9rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .Name {
        margin-left: 0.1rem;
        color: #ddd;
      }
      .Img {
        width: 13%;
        img {
          border-radius: 50%;
          width: 100%;
        }
      }
    }
  }

  .detailimg {
    margin-left: 0.15rem;
    width: 33%;
    img {
      width: 100%;
      border-radius: 5%;
    }
  }
}
.playListIcon {
  display: flex;
  justify-content: space-around;
  .iconItem {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      margin-top: 0.1rem;
      color: white;
    }
    .icon {
      fill: white;
      width: 0.5rem;
      height: 0.5rem;
    }
  }
}
.graybg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -10;
  background-color: rgba(0, 0, 0, 0.429);
}
</style>
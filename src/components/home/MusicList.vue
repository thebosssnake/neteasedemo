<template>
  <div class="musicList">
    <div class="musictop">
      <div class="title">查看好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="150"
        class="my-swpie"
        :show-indicators="false"
      >
        <van-swipe-item
          v-for="item in state.music"
          :key="item"
          class="swipeItem"
        >
          <router-link
            class="link"
            :to="{ path: '/itemMusic', query: { id: item.id } }"
          >
            <img :src="item.picUrl" alt="" />
            <span class="listCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gl-copy"></use>
              </svg>
              {{ changeCount(item.playCount) }}
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import { getMusic } from "../../requst/api/home";
import { reactive, onMounted } from "vue";
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
    const state = reactive({
      music: [],
    });
    onMounted(async () => {
      let res = await getMusic();
      //console.log(res);
      state.music = res.data.result;
      //console.log(state.music);
    });
    return { state, changeCount };
  },
};
</script>
<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musictop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 3.7rem;
    .my-swpie {
      height: 100%;
      img {
        width: 2.6rem;
        height: 2.6rem;
        border-radius: 0.1rem;
      }
      .swipeItem {
        .link {
          color: black;
          position: relative;

          position: relative;
          font-size: 0.1rem;
          display: flex;
          justify-content: space-around;
          .name {
            width: 90%;
            position: absolute;
            margin-top: 90%;
            margin-left: 0;
          }
          .listCount {
            position: absolute;
            margin-top: 0.1rem;
            margin-left: 30%;
            font-size: 0.2rem;
            color: #ddd;

            .icon {
              width: 0.25rem;
              height: 0.25rem;
            }
          }
        }
      }
    }
  }
}
</style>
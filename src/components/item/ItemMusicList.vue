<template>
  <div class="songlist">
    <div class="playbtn">
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofanganniu"></use>
        </svg>
        <div class="play">
          <div class="playall">播放全部</div>
          <div class="songnum">(共{{ itemList.length }}首)</div>
        </div>
      </div>
      <div class="subbtn">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
        <div class="subtext">收藏({{ playlist.subscribedCount }})</div>
      </div>
    </div>
    <div class="songdetail">
      <div class="song" v-for="(item, i) in itemList" :key="i">
        <div class="songleft" @click="playMusic(i)">
          <div class="leftSpan">{{ i + 1 }}</div>
          <div class="sdetail">
            <p class="songname">{{ item.name }}</p>
            <span class="songar">
              <div class="ar" v-for="(item1, index) in item.ar" :key="index">
                <div v-if="index === item.ar.length - 1">
                  {{ item1.name }}-{{ item.al.name }}
                </div>
                <div v-else="index > item.ar.length - 1">{{ item1.name }}/</div>
              </div></span
            >
          </div>
        </div>
        <div class="songright">
          <div v-if="item.mv != 0">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shipin"></use>
            </svg>
          </div>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-31liebiao"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, useStore } from "vuex";
export default {
  setup(props) {
    const store = useStore();
    const playMusic = (i) => {
      store.commit("updatePlayList", props.itemList);
      store.commit("updatePlayListIndex", i);
    };
    //console.log(props);
    return {
      playMusic,
    };
  },
  props: ["itemList", "playlist"],
};
</script>
<style lang="less" scoped>
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
  .songdetail {
    .song {
      display: flex;
      justify-content: space-between;
      height: 1.1rem;
      align-items: center;

      .songleft {
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
          .songname {
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .songar {
            text-align: left;
            display: flex;
            justify-content: flex-start;
            .ar {
              color: #ccc;
              font-size: 0.16rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
      .songright {
        display: flex;
        justify-content: flex-end;
        width: 10%;
        .icon {
          margin-right: 0.1rem;
          height: .4rem;
          fill: #aaa;
        }
      }
    }
  }
}
</style>
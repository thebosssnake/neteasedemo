<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div class="">
        <p>{{ playList[playListIndex].name }}</p>
        <span>横滑可以切换上下首哦</span>
      </div>
      <van-popup
        v-model:show="show"
        position="top"
        :style="{ height: '30%' }"
      />
    </div>
    <div class="footerRight">
      <div>
        <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="play" v-else>
          <use xlink:href="#icon-weibiaoti--"></use>
        </svg>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="detailShow"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <MusicDetail
        :musicList="playList[playListIndex]"
        :play="play"
        :isbtnShow="isbtnShow"
        @linkto="linkto"
      />
    </van-popup>
  </div>
</template>
<script>
import { onMounted, onUpdated, reactive, ref, watch } from "vue";
import useMapState from "@/plugins/useMapState";
import { mapMutations, useStore } from "vuex";
import MusicDetail from "@/components/item/MusicDetail.vue";
export default {
  setup() {
    const store = useStore();
    const state = useMapState([
      "playList",
      "playListIndex",
      "isbtnShow",
      "detailShow",
    ]);
    function linkto(value) {
      if (value) {
        audio.value.currentTime = (value / 100) * audio.value.duration;
      }
    }
    const updateIsbtnShow = (bloon) => {
      store.commit("updateIsbtnShow", bloon);
    };
    const updateDetailShow = (bloon) => {
      store.commit("updateDetailShow", bloon);
    };
    const audio = ref(null);
    const getAudio = () => {
      console.log(audio);
    };
    onMounted(() => {
      getAudio();
      linkto();

      audio.value.ontimeupdate = () => {
        //console.log(audio.value.currentTime);
        store.commit("updateDuration", audio.value.duration);
        store.commit("updatecurrentTime", audio.value.currentTime);
        if (audio.value.duration == audio.value.currentTime) {
          store.state.playListIndex++;
          if (store.state.playListIndex >= store.state.playList.length - 1) {
            store.state.playListIndex = 0;
          }
        }
      };
    });
    watch(
      () => store.state.playList[store.state.playListIndex].id,
      () => {
        store.dispatch(
          "getLyric",
          store.state.playList[store.state.playListIndex].id
        );
      }
    );
    const play = () => {
      if (audio.value.paused) {
        audio.value.play();

        updateIsbtnShow(false);
      } else {
        audio.value.pause();
        updateIsbtnShow(true);
      }
    };
    watch(
      () => store.state.playListIndex,
      () => {
        audio.value.autoplay = true;
        if (audio.value.paused) {
          updateIsbtnShow(false);
        }
      }
    );
    const updateTime = () => {
      audio.value.ontimeupdate = () => {
        //console.log(audio.value.currentTime);
        store.commit("updatecurrentTime", audio.value.currentTime);
      };
    };
    watch(
      () => store.state.playList[0].al.id,
      () => {
        audio.value.autoplay = true;
        if (audio.value.paused) {
          updateIsbtnShow(false);
        }
      }
    );
    return {
      linkto,
      updateTime,
      updateDetailShow,
      updateIsbtnShow,
      ...state,
      play,
      audio,
      updateTime,
    };
  },
  components: {
    MusicDetail,
  },
};
</script>
<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 1.2rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem;
  .footerLeft {
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    font-size: 0.2rem;
    align-items: center;
    p {
      margin-left: 0.1rem;
      font-weight: 900;
    }
    span {
      margin-left: 0.1rem;
      color: #aaa;
    }
    img {
      border-radius: 50%;
      width: 0.8rem;
      height: 0.8rem;
    }
  }
  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
    }
    div {
      margin-left: 0.1rem;
    }
  }
}
</style>
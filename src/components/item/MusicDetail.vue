<template>
  <img :src="musicList.al.picUrl" alt="" class="bgimg" />
  <div class="graybg"></div>
  <div class="detailTop">
    <div class="detailTopLeft">
      <div>
        <svg class="icon" aria-hidden="true" @click="updateDetailShow">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </div>
      <div class="audioname">
        <Vue3Marquee style="color: white">{{ musicList.name }} </Vue3Marquee>
        <span class="ar" v-for="(item, index) in musicList.ar" :key="index">
          <span v-if="index === musicList.ar.length - 1">{{ item.name }}</span>
          <span v-else="index > musicList.ar.length - 1">{{ item.name }}/</span>
        </span>
      </div>
    </div>
    <div class="detailTopRight">
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
  </div>
  <div
    class="detailContent"
    ref="content"
    v-show="isLyricShow.isLyric"
    @click="isLyricShow.isLyric = false"
  >
    <img
      src="@/assets/needle-ab.png"
      alt=""
      class="img_needle"
      :class="{ img_needle_active: !isbtnShow }"
    />
    <img src="@/assets/outdisc.png" alt="" class="img_outdisc" />
    <img
      :src="musicList.al.picUrl"
      alt=""
      class="img_indisc"
      :class="!isbtnShow ? 'img_disc_active' : 'img_disc_paused'"
    />
  </div>
  <div
    class="musicLyric"
    ref="musicLyric"
    v-show="!isLyricShow.isLyric"
    @click="isLyricShow.isLyric = true"
  >

      <p
        v-for="item in lyric()"
        :key="item"
        :class="{
          active:
            currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
        }"
      >
        {{ item.lrc }}
      </p>
   
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <div>
        <svg class="icon icon1" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinlechangpian"></use>
        </svg>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-"></use>
        </svg>
      </div>
    </div>
    <div class="footerConent">
      <van-slider v-model="timepercentage.percentage" @change="onChange" />
    </div>
    <div class="footer">
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
      </div>
      <div>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
      </div>
      <div>
        <svg
          class="icon icon2"
          aria-hidden="true"
          v-if="isbtnShow"
          @click="play"
        >
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg class="icon icon3" aria-hidden="true" v-else @click="play">
          <use xlink:href="#icon-zanting"></use>
        </svg>
      </div>
      <div>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref, watch, reactive, onUpdated } from "vue";
import { mapMutations, useStore } from "vuex";
import useMapState from "@/plugins/useMapState";
export default {
  emits: ["linkto"],
  setup(props, ctx) {
    let isLyricShow = reactive({ isLyric: false });
    const store = useStore();
    const updateDetailShow = (bloon) => {
      store.commit("updateDetailShow", bloon);
    };
    const goPlay = (num) => {
      let index = store.state.playListIndex + num;
      if (index < 0) {
        index = store.state.playList.length - 2;
      } else if (index >= store.state.playList.length - 1) {
        index = 0;
      }
      store.commit("updatePlayListIndex", index);
    };
    const onChange = () => {
      ctx.emit("linkto", timepercentage.percentage);
      // console.log(timepercentage.duration);
    };
    let timepercentage = reactive({
      percentage: 0,
      duration: 0,
    });
    const runPercentage = () => {
      let num = 0;
      if (store.state.currentTime === 0) {
        num = 0;
      } else {
        num = (store.state.currentTime / store.state.duration) * 100;
      }
      timepercentage.duration = store.state.duration;
      timepercentage.percentage = num;
    };
    const state = useMapState(["lyricList", "currentTime"]);
    const lyric = () => {
      let arr;
      if (store.state.lyricList) {
        arr = store.state.lyricList.lyric
          .split(/[(\r\n)\r\n]+/)
          .map((item, i) => {
            let min = item.slice(1, 3);
            let sec = item.slice(4, 6);
            let mill = item.slice(7, 10);
            let lrc = item.slice(11, item.length);
            if (isNaN(Number(mill))) {
              lrc = item.slice(10, item.length);
            }

            let time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
            return {
              min,
              sec,
              mill,
              lrc,
              time,
            };
          });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 100000000000;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      return arr;
    };
    const musicLyric = ref(null);
    const content = ref(null);
    onMounted(() => {
      console.log(musicLyric);
      console.log(content);
      runPercentage();
    });
    watch(
      () => store.state.currentTime,
      () => {
        runPercentage();
        //timepercentage.percentage = parseInt(store.state.currentTime);
        //console.log(timepercentage.percentage);
        let p = document.querySelector("p.active");
        store.commit("updateDuration", ref);
        if (p != null) {
          if (p.offsetTop > 300) {
            musicLyric.value.scrollTop = p.offsetTop - 280;
          }
        }
      }
    );
    return {
      onChange,
      store,
      timepercentage,
      goPlay,
      content,
      ...state,
      updateDetailShow,
      isLyricShow,
      lyric,
      musicLyric,
      runPercentage,
    };
    //console.log(props.musicList.ar.length);
  },

  props: ["musicList", "isbtnShow", "play"],
};
</script>
<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -10;
  filter: blur(70px);
}
.graybg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -10;
  background-color: rgba(67, 67, 67, 0.343);
}
.detailTop {
  align-items: center;
  padding: 0.4rem 0.2rem;
  width: 100%;
  height: 1.5rem;
  display: flex;
  justify-content: space-between;
  .icon {
    fill: white;
  }
  .detailTopLeft {
    height: 100%;
    .audioname {
      width: 100%;
      color: #ddd;
      margin-left: 0.1rem;
    }
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .detailTopRight {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-16deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .img_outdisc {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_indisc {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 15s linear infinite;
  }
  .img_disc_active {
    animation-play-state: running;
  }
  .img_disc_paused {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.detailFooter {
  position: absolute;
  width: 100%;
  bottom: 1px;
  .footerConent {
    height: 0.4rem;
  }
  .footerTop,
  .footer {
    margin-bottom: 0.3rem;
    padding: 0 0.4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 1rem;
    .icon {
      height: 0.6rem;
      width: 0.6rem;
      fill: #eee;
    }
    .icon2 {
      height: 0.8rem;
      width: 0.8rem;
    }
    .icon3 {
      height: 0.8rem;
      width: 0.8rem;
    }
    .icon1 {
      fill: red;
    }
  }
}

.musicLyric {
  width: 100%;
  height: 8.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.1rem;
  overflow: scroll;
  p {
    width: 90%;
    text-align: center;
    color: #ddd;
    margin-bottom: 0.5rem;
    font-size: 0.34rem;
  }
  .active {
    color: #fff;
    font-size: 0.4rem;
  }
}
</style>
<template>
  <div class="searchTOP">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input
      type="text"
      placeholder="周杰伦"
      v-model.trim="searchKey.Key"
      @keyup.enter="enterKey"
    />
  </div>
  <div class="searchHistory">
    <span class="searchSpan" >历史</span>
    <template v-for="(item, index) in searchKey.keyWorldList" :key="index" >
      <span v-if="index < 5" class="spanKey" @click="searchHistory(item)">{{ item }} </span>
    </template>

    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="songdetail">
      <div class="song" v-for="(item, i) in searchKey.searchList" :key="i">
        <div class="songleft" @click="upadateIndex(item)">
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
</template>

<script>
import { onMounted, reactive } from "vue";
import { getSearchMusic } from "@/requst/api/home";
import { useStore } from "vuex";

export default {
  setup() {
    let store=useStore();
    let searchKey = reactive({ Key: "", keyWorldList: [] ,searchList:[]});
    const enterKey = async () => {
      searchKey.keyWorldList.unshift(searchKey.Key);
      searchKey.keyWorldList = [...new Set(searchKey.keyWorldList)];
      localStorage.setItem(
        "keyWorldList",
        JSON.stringify(searchKey.keyWorldList)
      );
      
      let res = await getSearchMusic(searchKey.Key);
      searchKey.Key = "";
      searchKey.searchList=res.data.result.songs;
      console.log(searchKey.searchList);
    };
    const searchHistory= async (item)=>{
        let res = await getSearchMusic(item);
      searchKey.searchList=res.data.result.songs;
      console.log(searchKey.searchList);
    }
    onMounted(() => {
      searchKey.keyWorldList =
        JSON.parse(localStorage.getItem("keyWorldList")) || [];
    });

    const delHistory = () => {
      localStorage.removeItem("keyWorldList");
      searchKey.keyWorldList = [];
    };
    const upadateIndex=(item)=>{
    store.commit("pushPlayList",item)
    store.commit("updatePlayListIndex",store.state.playList.length-1)
    }
    return {
        store,
        upadateIndex,
        searchHistory,
      delHistory,
      enterKey,
      searchKey,
    };
  },
};
</script>
<style lang="less" scoped>
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
.searchTOP {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  input {
    width: 95%;
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #aaa;
    padding: 0.1rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  .searchSpan {
    padding: 0.1rem 0.2rem;
    font-weight: 700;
  }
  .spanKey {
    padding: 0.1rem 0.2rem;
    background-color: rgba(0, 153, 255, 0.368);
    margin: 0.1rem;
    border-radius: 0.3rem;
    display: inline-block;
  }
  .icon {
    position: absolute;
    width: 0.4rem;
    height: 0.4rem;
    right: 0.2rem;
  }
}
</style>
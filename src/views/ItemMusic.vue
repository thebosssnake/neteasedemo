<template>
  <ItemMusicTop :itemList="state.itemList" :playlist="state.playlist" :userlist="state1.userlist" />
  <ItemMusicList :playlist="state.playlist" :itemList="state.itemList"/>
</template>
<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getMusicItemList ,getUserDetail,getMusicList} from "@/requst/api/item";
import ItemMusicTop from "@/components/item/ItemMusicTop.vue"
import ItemMusicList from "@/components/item/ItemMusicList.vue"

export default {
  setup() {
    const state=reactive({
        playlist:{},
        itemList:[]
    })
    const state1=reactive({
        userlist:{},
    })
    onMounted(async () => {
      let id = useRoute().query.id; 
      let result=await getMusicList(id)
      //console.log(result.data.songs.length)
      state.itemList=result.data.songs
      //console.log(id);
      let res = await getMusicItemList(id);
      //console.log(res);
      state.playlist=res.data.playlist
      //console.log(res.data.playlist);
      let res1=await getUserDetail(res.data.playlist.userId);
      // console.log(res1.data.profile.nickname);
      state1.userlist=res1.data.profile
      //console.log(state.itemList);
    });
    return{state, state1}
  },
  components:{
    ItemMusicTop,
    ItemMusicList
  }
};
</script>
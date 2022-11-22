<template>
  <router-view/>
  <FooterMusic v-show="footerMusic.footerMusicDisplay"/>
</template>
<script>
import FooterMusic from './components/item/FooterMusic.vue';
import { useStore} from 'vuex';
import { reactive ,watch} from 'vue';
export default {
  setup(){
    const store = useStore();
    const footerMusic=reactive({footerMusicDisplay:false})
    watch(
      () => [store.state.playList,store.state.playListIndex],
      () => {
        footerMusic.footerMusicDisplay=true
      }
    );
    return{
      footerMusic
    }
  },
  components:{
    FooterMusic
  }
}
</script>

<style lang="less">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.icon{
  width: .5rem;
  height: .5rem;
}
</style>
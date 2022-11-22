<template>
  <div class="bg">
    <div class="userInfoTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
  </div>
    <div class="loginContent">
      <input
        type="text"
        name="phone"
        class="phone"
        placeholder="请输入验证码"
        v-model="loginDetail.captcha"
      />
      <van-button class="btn" type="default" @click="CaptchaCom"
        >使用验证码登陆</van-button
      >
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { getCaptchaCom ,getLoginUser} from "@/requst/api/home";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const loginDetail = reactive({
      captcha: "1234",
    });
    const store=useStore()
    const route = useRoute();
    const router = useRouter();
    const CaptchaCom = async () => {
      let result = route.query.phone;
      let res = await getCaptchaCom(result, loginDetail.captcha);
      console.log(res);
      if (res.data.code === 200) {
        store.state.isLogin = true;
        router.push("/");
        store.commit("updateToken", res.data.token);
        let result = await getLoginUser(res.data.account.id);
        store.commit("updateUser", result);
      } else {
        alert("手机号码或者验证码错误");
      }
    };
    return {
      router,
      store,
      CaptchaCom,
      loginDetail,
    };
  },
};
</script>

<style lang="less" scoped>
.bg {
   margin-top: 0;
  height: 13.4rem;
  background-color: rgba(4, 150, 254, 0.76);
  display: flex;
    flex-direction: column;
    align-items: center;
  .userInfoTop {
    width: 100%;
    height: 1rem;
    padding: 0.3rem;
    .icon{
        fill: white;
    }
  }
  .loginContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3rem;
    height:100%;
    width: 80%;
    input {
      margin-top: 0.3rem;
      border: none;
      height: 0.7rem;
      border-radius: 0.4rem;
      text-align: center;
    }
    .btn {
      width: 80%;
      margin-top: 0.6rem;
      border-radius: 0.3rem;
    }
  }
}
</style>
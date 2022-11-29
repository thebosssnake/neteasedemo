<template>
  <div class="login">
    <div class="loginDetail">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinle"></use>
      </svg>
      <div class="loginTop">爱听HIFI</div>
      <div class="loginContent" v-show="isShow.ChangeisShow">
        <input
          type="text"
          name="phone"
          class="phone"
          placeholder="请输入手机号码"
          v-model="loginDetail.phone"
        />
        <input
          type="password"
          name="password"
          class="password"
          v-model="loginDetail.password"
          placeholder="请输入密码"
        />
        <van-button class="btn" type="default" @click="Login">登陆</van-button>
      </div>
      <div class="loginContent" v-show="!isShow.ChangeisShow">
        <input
          type="text"
          name="phone"
          class="phone"
          placeholder="请输入手机号码"
          v-model="loginDetail.phone"
        />
        <van-button class="btn" type="default" @click="sentCaptcha"
          >发送验证码</van-button
        >
      </div>
      <div @click="ChangeLogin" v-show="isShow.ChangeisShow" class="changeLogin">
        使用手机验证码登录
      </div>
      <div @click="ChangeLogin" v-show="!isShow.ChangeisShow" class="changeLogin">使用密码登录</div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getLoginUser, getCaptcha, getCaptchaCom } from "@/requst/api/home";
export default {
  setup() {
    const isShow = reactive({ ChangeisShow: true });
    const router = useRouter();
    const store = useStore();
    const ChangeLogin = () => {
      isShow.ChangeisShow = !isShow.ChangeisShow;
    };
    const Login = async () => {
      let res = await store.dispatch("getLogin", loginDetail);
      console.log(res);
      if (res.data.code === 200) {
        store.state.isLogin = true;
        router.push("/");
        store.commit("updateToken", res.data.token);
        let result = await getLoginUser(res.data.account.id);
        store.commit("updateUser", result);
      } else {
        alert("手机号码或者密码错误");
      }
    };
    const test=()=>{
      console.log("成功");
    }
    const sentCaptcha = () => {
      let res=getCaptcha(loginDetail.phone)
      console.log(res);
      router.push({ path: "/clogin", query: { phone:loginDetail.phone } });
    };
    const loginDetail = reactive({
      phone: "",
      password: "",
    });
    onMounted(() => {
      //let res=getCaptcha(15021404748)
      //console.log(res);
    });
    return {
      sentCaptcha,
      ChangeLogin,
      isShow,
      router,
      Login,test,
      loginDetail,
    };
  },
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 13.4rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  background-color: rgba(4, 150, 254, 0.76);
  .loginDetail {
    height: 8rem;
    .changeLogin{
      margin-top: .3rem;
      border-bottom: 1px solid #000;
    }
    .icon {
      width: 2.5rem;
      height: 2.5rem;
    }
    .loginTop {
      margin-top: 0.3rem;
      font-size: 0.5rem;
    }
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .loginContent {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 0.2rem;
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
}
</style>
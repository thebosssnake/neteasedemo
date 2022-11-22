import service from "../index";
 export function getBanner() {
   return service({
     url: "/banner?type=2",
     method: "get",
   });
 }
 export function getMusic() {
  return service({
    url: "/personalized?limit=10",
    method: "get",
  });
}
export function getSearchMusic(data) {
  return service({
    url: `/search?keywords=${data}`,
    method: "get",
  });
}
export function getPhoneLogin(data) {
  return service({
    url: `/login/cellphone?phone=${data.phone}&password=${data.password}`,
    method: "get",
  });
}
export function getLoginUser(data) {
  return service({
    url: `/user/detail?uid=${data}`,
    method: "get",
  });
}
export function getSubcount() {
  return service({
    url: `/user/subcount`,
    method: "get",
  });
}
export function getUserLevel() {
  return service({
    url: `/user/level`,
    method: "get",
  });
}
export function getCaptcha(data) {
  return service({
    url: `/captcha/sent?phone=${data}`,
    method: "get",
  });
}
export function getCaptchaCom(data,value) {
  return service({
    url: `/login/cellphone?phone=${data}&captcha=${value}`,
    method: "get",
  });
}
export function getPlayList(data) {
  return service({
    url: `/user/playlist?uid=${data}`,
    method: "get",
  });
}
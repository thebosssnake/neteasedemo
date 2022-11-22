import service from "..";
export function getMusicItemList(data) {
    return service({
       method:"get",
       url:`/playlist/detail?id=${data}`
    });
  }
  export function getUserDetail(data) {
   return service({
      method:"get",
      url:`/user/detail?uid=${data}`
   });
 }
 export function getMusicList(data) {
   return service({
      method:"get",
      url:`/playlist/track/all?id=${data}`
   });
 }
 export function getMusicLyric(data) {
   return service({
      method:"get",
      url:`/lyric?id=${data}`
   });
 }
 
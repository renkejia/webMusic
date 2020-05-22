import { axiosInstance } from "./config";

// 请求轮播图数据
export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
}

// 请求歌单数据
export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
}

// 请求热门歌手列表数据
export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}

// 请求歌手列表数据
export const getSingerListRequest= (category, alpha, count) => {
  return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
}

// 请求排行榜数据
export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`);
};
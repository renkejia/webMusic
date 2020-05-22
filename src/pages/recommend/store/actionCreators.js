import * as actionTypes from './constants';
import { fromJS } from 'immutable';// 将 JS 对象转换成 immutable 对象
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';

// 轮播图action
const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data)
})
// 歌单action
const changeRecommondList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data)
})
// Loading组件 action
export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
});

// 获取轮播数据
export const getBannerList = () => {
  return (dispatch) => {
    getBannerRequest().then((data) => {
      dispatch(changeBannerList(data.banners))
    }).catch(() => {
      console.log('获取轮播图失败')
    })
  }
}

// 获取歌单数据
export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest().then((data) => {
      dispatch(changeRecommondList(data.result))
      dispatch(changeEnterLoading(false));  // 改变 loading
    }).catch(() => {
      console.log('获取歌单数据失败')
    })
  }
}

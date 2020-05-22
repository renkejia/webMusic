import React, { useEffect } from 'react';
import Slider from '../../components/slider/';
import { connect } from "react-redux";
import * as actionTypes from './store/actionCreators';
import RecommendList from '../../components/playList';
import Scroll from '../../components/scroll/index';
import { Content } from './style';
import Loading from '../../baseUI/loading'
import { forceCheck } from 'react-lazyload'
import { renderRoutes } from 'react-router-config';

function Recommend(props) {

  const { bannerList, recommendList, enterLoading } = props;

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch();
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch();
    }
    //eslint-disable-next-line
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
        {enterLoading ? <Loading></Loading> : null}
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Content>
  );
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading'])
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    // 获取轮播图派发的action
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    // 获取歌单派发的action
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    },
  }
};

// 将 ui 组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
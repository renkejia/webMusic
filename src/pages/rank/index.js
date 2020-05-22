import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRankList } from './store';
import { fliterIndex } from '../../api/utils';
import { List, ListItem, SongList, Container } from './style';
import Scroll from '../../components/scroll';
import { renderRoutes } from 'react-router-config'
import Loading from '../../baseUI/loading';

function Rank(props) {
  const { rankList: list, loading } = props;

  const { getRankListDataDispatch } = props;

  let rankList = list ? list.toJS() : [];

  useEffect(() => {
    getRankListDataDispatch()
  }, [])

  // 处理榜单数据
  let globalStartIndex = fliterIndex(rankList);
  // 官方榜单
  let officalList = rankList.slice(0, globalStartIndex);
  // 全球榜单
  let globalList = rankList.slice(globalStartIndex)

  // 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {
          list.map((item) => {
            return (
              <ListItem key={item.coverImgId} tracks={item.tracks} >
                <div className="img_wrapper">
                  <img src={item.coverImgUrl} alt="" />
                  <div className="decorate"></div>
                  <span className="update_frequecy">{item.updateFrequency}</span>
                </div>
                {renderSongList(item.tracks)}
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}>{index + 1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null;
  }

  // 榜单数据未加载出来之前都给隐藏
  let displayStyle = loading ? { "display": "none" } : { "display": "" };

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}> 官方榜 </h1>
          {renderRankList(officalList)}
          <h1 className="global" style={displayStyle}> 全球榜 </h1>
          {renderRankList(globalList, true)}
          {loading ? <Loading></Loading> : null}
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  );
}


const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['loading', 'loading']),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch() {
      dispatch(getRankList());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank))
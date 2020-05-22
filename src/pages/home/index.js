import React from 'react';
import { renderRoutes } from "react-router-config";
import {
  Top,
  Tab,
  TabItem,
} from './style';
import { NavLink } from 'react-router-dom'; // 利用 NavLink 组件进行路由跳转

function Home (props){
  const { route } = props;

  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe63d;</span>
        <span>Web app</span>
        <span className="iconfont search">&#xe646;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected"><TabItem>推荐</TabItem></NavLink>
        <NavLink to="/singers" activeClassName="selected"><TabItem>歌手</TabItem></NavLink>
        <NavLink to="/rank" activeClassName="selected"><TabItem>排行榜</TabItem></NavLink>
      </Tab>
      { renderRoutes (route.routes) }
    </div>
  );
}

export default React.memo (Home);
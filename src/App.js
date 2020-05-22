import React from 'react'
import { Provider } from 'react-redux'
import { GlobalStyle } from './style'
import { renderRoutes } from 'react-router-config'
import { IconStyle } from './assets/iconfont/iconfont'
import store from './store/index'
import routers from './routers/index.js'
import { HashRouter } from 'react-router-dom';
import { Data } from './pages/singer/data'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <Data>
          {renderRoutes(routers)}
        </Data>
      </HashRouter>
    </Provider>
  )
}

export default App;
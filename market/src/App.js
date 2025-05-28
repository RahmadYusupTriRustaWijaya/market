import React, { Component } from "react";
import { HashRouter } from "react-router-dom";

import ComponentSideBar from './components/ComponentSideBar';
import ComponentHeader from './components/ComponentHeader';
import ComponentFooter from './components/ComponentFooter';
import AppRoutes from './AppRoutes';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div id="wrapper">
          <ComponentSideBar />

          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <ComponentHeader />
              <AppRoutes />
            </div>

            <ComponentFooter />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;

import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import AboutPage from "./pages/aboutpage";
import ArticlePage from "./pages/articlepage";
import ArticleListPage from "./pages/articlelistpage";
import NavBar from "./navBar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div id="page-body">
            <Route path="/" component={HomePage} exact />
            <Route path="/about" component={AboutPage} exact />
            <Route path="/article/:name" component={ArticlePage} exact />
            <Route path="/articles-list" component={ArticleListPage} exact />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

import React, { Fragment, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { handleInitialData } from "../actions/shared";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import QuestionPage from "./QuestionPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import NotFound from "./NotFound";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <Router>
      <Fragment>
        <div className="container">
          <Nav />
          <Switch>
            <Route path="/homepage" exact component={HomePage} />
            <Route path="/newQuestion" exact component={NewQuestion} />
            <Route path="/leaderboard" exact component={LeaderBoard} />

            <Route path="/questions/:id" exact component={QuestionPage} />
            <Route path="/" exact component={LoginPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
};

export default connect()(App);

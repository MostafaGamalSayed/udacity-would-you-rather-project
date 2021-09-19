import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { withRouter } from "react-router-dom";

const Nav = (props) => {
  const handleLogout = (e) => {
    e.preventDefault();
    props.dispatch(setAuthedUser(null));
    props.history.push("/");
  };

  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/homepage" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/newQuestion" exact activeClassName="active">
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" exact activeClassName="active">
            LeaderBoard
          </NavLink>
        </li>
        <li>
          {!props.authedUser && (
            <NavLink to="/" activeClassName="active">
              Login
            </NavLink>
          )}
        </li>
        <li>{props.authedUser ? props.authedUser : null}</li>
        <li>
          {props.authedUser && (
            <button onClick={handleLogout}>Logout</button>
          )}
        </li>
      </ul>
    </nav>
  );
};

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default withRouter(connect(mapStateToProps)(Nav));

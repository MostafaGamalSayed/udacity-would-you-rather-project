import React from "react";
import { connect } from "react-redux";
import LoginPage from "./LoginPage";

function countPoints(user) {
  return Object.keys(user.answers).length + user.questions.length;
}

const LeaderBoard = (props) => {
  const { users } = props;

  return props.authedUser ? (
    <div>
      <h3 className="center">LeaderBoard</h3>
      {users.map((user) => {
        return (
          <div className="tweet" key={user.id}>
            <img
              src={user.avatarURL}
              alt={`Avatar of ${user.name}`}
              className="avatar"
            />
            <div className="tweet-info">
              <div>
                <h2>{user.name}</h2>
                <br />
                <h3>Number of asked questions : {user.questions.length} </h3>
                <h3>
                  Number of answered questions :{" "}
                  {Object.keys(user.answers).length}{" "}
                </h3>
                <h3>Total Score : {countPoints(user)} </h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <LoginPage loc={"leaderboard"} />
  );
};

function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    users: Object.values(users).sort((a, b) => {
      return countPoints(b) - countPoints(a);
    }),
  };
}

export default connect(mapStateToProps)(LeaderBoard);

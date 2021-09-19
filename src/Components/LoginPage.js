import React, { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { withRouter } from "react-router-dom";

const LoginPage = (props) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    const t = e.target.value;

    setText(t);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch, usersIds, loc } = props;
    if (usersIds.find((x) => x === text)) {
      dispatch(setAuthedUser(text));
      props.history.push(`/${loc ? loc : "homepage"}`);
    } else alert("No Such user");

    setText("");
  };

  return (
    <div className="wrapper">
      <form className="login" onSubmit={handleSubmit}>
        <p className="title">Log in</p>
        <input type="text" placeholder="Username" onChange={handleChange} />
        <button type="submit" disabled={text === ""}>
          <span>Log in</span>
        </button>
        <br />
        Hint : id like "sarahedo"
      </form>
    </div>
  );
};

function mapStateToProps({ users }) {
  return { usersIds: Object.keys(users) };
}

export default withRouter(connect(mapStateToProps)(LoginPage));

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Question from "./Question";

const HomePage = (props) => {
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    const { authedUser } = props;
    !authedUser && props.history.push("/");
  }, []);

  const handleSubmit = (e) => {
    setAnswered(!answered);
  };

  const filterQ = () => {
    const { questions, authedUser } = props;
    const ans = Object.values(questions)

      .filter(
        (quest) =>
          quest.optionOne.votes.find((vote) => vote === authedUser) ||
          quest.optionTwo.votes.find((vote) => vote === authedUser)
      )
      .sort((a, b) => questions[b.id].timestamp - questions[a.id].timestamp);
    const unAns = Object.values(questions)
      .filter((quest) => !ans.includes(quest))
      .sort((a, b) => questions[b.id].timestamp - questions[a.id].timestamp);
    return {
      answered: ans,
      unAnswered: unAns,
    };
  };

  const { authedUser } = props;
  const filteredQuestions = filterQ();
  return authedUser ? (
    <div>
      <h3 className="center">Your Timeline</h3>
      <div className="center-div">
        <button onClick={() => handleSubmit()} disabled={answered === false}>
          Unanswered Questions
        </button>
        <button onClick={() => handleSubmit()} disabled={answered === true}>
          Answered Questions
        </button>
      </div>

      <ul className="dashboard-list">
        {answered
          ? filteredQuestions.answered.map((q) => (
              <li key={q.id}>
                <Question id={q.id} />
              </li>
            ))
          : filteredQuestions.unAnswered.map((q) => (
              <li key={q.id}>
                <Question id={q.id} />
              </li>
            ))}
      </ul>
    </div>
  ) : null;
};

function mapStateToProps({ questions, authedUser }) {
  return {
    authedUser,
    questions,
    answeredIDs: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(HomePage);

function FinishScreen({ points, maxPoints, highscore, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highest Score: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: "restart",
          })
        }
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;

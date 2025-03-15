import { useQuiz } from "../contexts/QuizContext";

function FinishScreen() {
    const percentage = (points / maxPoints) * 100;
    const { points, maxPoints, highscore, dispatch } = useQuiz();
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

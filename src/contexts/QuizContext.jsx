import { createContext, useReducer, useEffect, useContext } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTIONS = 20;

const initialState = {
    questions: [],

    //loading, error, ready, active, finished -> status values
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return { ...state, questions: action.payload, status: "ready" };
        case "dataFailed":
            return { ...state, status: "error" };
        case "start":
            return {
                ...state,
                status: "active",
                secondsRemaining: state.questions.length * SECS_PER_QUESTIONS,
            };
        case "newAnswer":
            // eslint-disable-next-line no-case-declarations
            const question = state.questions.at(state.index);

            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };
        case "next":
            return { ...state, index: state.index + 1, answer: null };
        case "finish":
            return {
                ...state,
                status: "finish",
                highscore:
                    state.points > state.highscore ? state.points : state.highscore,
            };
        case "restart":
            return { ...initialState, questions: state.questions, status: "ready" };
        case "tick":
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? "finish" : state.status,
            };
        default:
            throw new Error("Unknown Action");
    }
}

function QuizProvider({ children }) {
    const [
        { questions, status, index, answer, points, highscore, secondsRemaining },
        dispatch,
    ] = useReducer(reducer, initialState);

    const numQuestions = questions.length;
    const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

    useEffect(() => {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({ type: "dataReceived", payload: data }))
            .catch((err) => dispatch({ type: "dataFailed" }));
    }, []);

    return (
        <QuizContext.Provider
            value={{
                questions,
                status,
                index,
                answer,
                points,
                highscore,
                secondsRemaining,
                numQuestions,
                maxPoints,
                dispatch,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}

function useQuiz() {
    const context = useContext(QuizContext);

    if (context === undefined)
        throw new Error("Context used outside the Provider");

    return context;
}

export { QuizProvider, useQuiz };

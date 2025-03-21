import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
import { useQuiz } from "./contexts/QuizContext";

function App() {
    const { status } = useQuiz();
    return (
        <>
            <div className="app">
                <Header />

                <MainContent>
                    {status === "loading" && <Loader />}
                    {status === "error" && <Error />}
                    {status === "ready" && <StartScreen />}
                    {status === "active" && (
                        <>
                            <Progress />
                            <Question />
                            <Footer>
                                <Timer />
                                <NextButton />
                            </Footer>
                        </>
                    )}
                    {status === "finish" && <FinishScreen />}
                </MainContent>
            </div>
        </>
    );
}

export default App;

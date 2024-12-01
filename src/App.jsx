import { useEffect, useReducer } from "react";
import Header from "./Header";
import MainContent from "./MainContent";

const initialState = {
  questions: [],

  //loading, error, ready, active, finished -> status values
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Unknown Action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <>
      <div className="app">
        <Header />

        <MainContent>
          <p>1/15</p>
          <p>Question</p>
        </MainContent>
      </div>
    </>
  );
}

export default App;

import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/header";
import Main from "./components/main";
import Loader from "./components/loading";
import Error from "./components/error";
import StartScreen from "./components/start-screen";
import Question from "./components/Question";
import NextButton from "./components/next-button";
import { ProgressBar } from "./components/progress-bar";
import FinishQuiz from "./components/finish-quiz";
import Footer from "./components/footer";
import Timer from "./components/timer";

const initialState = {
  questions: [],

  status: "loading",
  index: 0,
  answer: null,
  point: 0,
  highscore: 0,
  secondsRemaining: null
};

const SEC_PER_QUES = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFaied":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUES
      };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        point:
          action.payload === question.correctOption
            ? state.point + question.points
            : state.point,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finish",
        highscore:
          state.point > state.highscore ? state.point : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        question: state.questions,
        status: "ready",
      };

      case "tick":
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status
          
        }

    default:
      throw new Error("Action needed");
  }
}

function App() {
  const [
    { questions, status, index, answer, point, highscore, secondsRemaining
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestion = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "dataReceived",
          payload: data,
        })
      )
      .catch((err) =>
        dispatch({
          type: "dataFailed",
        })
      );
  }, []);

  return (
    <>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              index={index}
              nextQuestion={numQuestion}
              point={point}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer dispatch={dispatch}   secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestion={numQuestion}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishQuiz
            point={point}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </>
  );
}

export default App;

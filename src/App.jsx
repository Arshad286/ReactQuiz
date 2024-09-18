
import { useEffect, useReducer } from 'react';
import './App.css'
import Header from './components/header';
import Main from './components/main';
import Loader from './components/loading';
import Error from './components/error';
import StartScreen from './components/start-screen';
import Question from './components/Question';


const initialState = {
   questions : [],

   status : "loading",
   index : 0,

}

function reducer(state, action){
    switch(action.type){
      case "dataReceived" :
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };

        case "dataFaied":
          return {
            ...state,
            status: "error"
          };

          case "start":
            return {
              ...state,
              status: "active"
            };

          default:
            throw new Error("Action needed");
    }
}

function App() {

  const [{questions, status, index}, dispatch] = useReducer(reducer, initialState);

  const numQuestion = questions.length;

  useEffect( () => {
    fetch("http://localhost:8000/questions")
    .then((res) => res.json())
    .then( (data) =>  dispatch({
      type: "dataReceived",
      payload: data
    }))
    .catch((err) => dispatch({
      type: "dataFailed"
    }) );

  }, []);
  
  return (
    <>
    <Header/>
    <Main>
     { status === 'loading' &&  <Loader/>}
     { status === 'error' &&  <Error/>}
     {status === 'ready' && <StartScreen numQuestion = {numQuestion} dispatch={dispatch}/>}
     {status === 'active' && <Question question = {questions[index]}/>}
    </Main>
     </>
  )
}

export default App

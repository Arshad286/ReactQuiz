import React from 'react'

const StartScreen = ({numQuestion, dispatch}) => {
  return (
    <div className='start'>
        <h2>Welcome to the React Quiz</h2>
        <h3> {numQuestion} questions to your React Knowledge</h3>

        <button className='btn btn-ul' onClick={() => dispatch({
          type: "start"
        })}> Let's start</button>
    </div>
  )
}

export default StartScreen
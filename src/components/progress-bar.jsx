import React from 'react'

export const ProgressBar = ({index, nextQuestion, point, maxPoints, answer}) => {
  return (
    <header className='progress'>
      <progress value={index + Number(answer !== null)} max={nextQuestion}/>
        <p>
            Question <strong>{index + 1}</strong> / {nextQuestion}
        </p>
        <p>
            <strong>{point} / {maxPoints}</strong>
        </p>
    </header>
  )
}

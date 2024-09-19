import React from 'react'

const FinishQuiz = ({point, maxPoints, highscore, dispatch}) => {
    const percentage = (point / maxPoints) * 100;

    let emoji;

    if(percentage === 100) emoji = "🥇🥇"
    if(percentage >= 80 && percentage < 100) emoji= "🎉🎉"
    if(percentage >= 50 && percentage <80) emoji= "✌😊"
    if(percentage > 0 && percentage < 50) emoji= "🤷‍♀️😶"
    if(percentage === 0) emoji="🤦‍♀️🤦‍♂️"

  return (
    <>
        <p className='result'>
           {emoji} You Scored <strong>{point}</strong> out of {maxPoints}(
                    {Math.ceil(percentage)}%
            )
        </p>

        <p className='highscore'>{`HighScore: ${highscore} points`}</p>

        <button className='btn -btn-ul' onClick={ () => dispatch({
            type: "restart"
        })}>Restart Quiz</button>

    </>
  )
}

export default FinishQuiz
import React, {Fragment} from 'react'

const ProgressBar = ({idQuestion, maxQuestions}) => {

  const actualQuestion = idQuestion + 1

  const getPercent = (totalQuestions, questionId) => {
    return (100 / totalQuestions) * questionId
  }

  const progress = getPercent(maxQuestions, actualQuestion);
  console.log(progress)

  return (
    <Fragment>
        <div className='percentage'>
            <div className='progressPercent'>{`Question: ${idQuestion + 1}/${maxQuestions}`}</div>
            <div className='progressPercent'>{`Progression: ${progress} %`}</div>
        </div>
        <div className='progressBar'>
            <div className='progressBarChange' style={{width: `${progress}%`}}></div>
        </div>
    </Fragment>
  )
}

export default React.memo(ProgressBar)
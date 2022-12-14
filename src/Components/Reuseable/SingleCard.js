import React from 'react'

const SingleCard = ({item}) => {
    const { title, totalNumber, icon } = item
  return (
    <div className="single__card">
    <div className="card__content">
      <h4>{title}</h4>
      <span>{totalNumber}%</span>
    </div>

    <span className="card__icon">
      {icon}
    </span>
  </div>
  )
}

export default SingleCard

import React from 'react'

const Number = ({ resource, type }) => {
  const number = type === 2 ? resource.number2.read() : resource.number.read()

  return <div>{number}</div>
}

export default Number

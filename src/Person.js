import React from 'react'

const Person = ({ resource }) => {
  const person = resource.person.read()

  return <div>{person.name.first}</div>
}

export default Person

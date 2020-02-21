import React from 'react'

const isPrime = number => {
  let biggestPrime = 2

  for (let i = 0; i < number; i++) {
    let isPrime = true
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        isPrime = false
      }

      if (isPrime) {
        biggestPrime = i
      }
    }
  }

  return biggestPrime
}

const BigPrime = ({ number }) => {
  return (
    <div>
      Biggest prime less than {number}: {isPrime(number)}
    </div>
  )
}

export default BigPrime

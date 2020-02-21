const fetchPerson = () => {
  return fetch('https://randomuser.me/api')
    .then(res => res.json())
    .then(data => data.results[0])
}

export const wrapPromise = promise => {
  let status = 'pending'
  let result = ''
  let suspender = promise.then(
    data => {
      status = 'success'
      result = data
    },
    error => {
      status = 'error'
      result = error
    }
  )

  return {
    read() {
      if (status === 'pending') {
        throw suspender
      }
      if (status === 'error') {
        throw result
      }

      return result
    }
  }
}

export const randomNumber = () => {
  return new Promise(resolve => {
    return setTimeout(() => resolve(Math.random()), 3000)
  })
}

export const randomNumber2 = () => {
  return new Promise(resolve => {
    return setTimeout(() => resolve(Math.random()), 4000)
  })
}

export const createResource = () => {
  return {
    person: wrapPromise(fetchPerson()),
    number: wrapPromise(randomNumber()),
    number2: wrapPromise(randomNumber2())
  }
}

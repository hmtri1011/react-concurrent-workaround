import React, {
  Suspense,
  useState,
  SuspenseList,
  useDeferredValue,
  useMemo
} from 'react'
import { createResource, wrapPromise } from './resources'
import Person from './Person'
import Number from './Number'
import PostResource from './PostResource'
import BigPrime from './BigPrime'

import ErrorBoundary from './ErrorBoundary'
import TransitionButton from './TransitionButton'

import './App.css'

const initResource = createResource()

function App() {
  const [resource, setResource] = useState(initResource)
  const [postResource, setPostResource] = useState(() => ({
    read() {
      return null
    }
  }))
  const [num, setNum] = useState(0)

  /* the resource will defer, in defer time it will show old data,
  if defer time < actually time to get data, will show old data + suspense until new data loaded
  else show old data then end defer time will show new data */
  const deferredResource = useDeferredValue(resource, {
    timeoutMs: 5000
  })
  const deferredNum = useDeferredValue(num, {
    timeoutMs: 10000
  })

  const isSteal = useMemo(() => deferredResource !== resource, [
    deferredResource,
    resource
  ])

  /* REMINDER
  // resources will transition delay for 5000s then display result (susperder || data)
  const [startTransition, isPending] = useTransition({
    timeoutMs: 5000
  })
  */

  const handleRefreshData = () => {
    setResource(createResource())
  }

  const handlePostResource = () => {
    const promise = fetch('https://ent5gpcpkaax.x.pipedream.net', {
      method: 'POST',
      body: JSON.stringify({ hello: 'world' })
    })
      .then(res => res.json())
      .then(data => {
        console.log('post data', data)
        return data
      })

    setPostResource(wrapPromise(promise))
  }

  //TODO: create a sample that navigate to another route to clear the usage of useTransition

  /* REMINDER */
  /* tail: hidden | collapsed, revealOrder: forwards | backwards | together */

  /* fowards: run Suspense tren xuong duoi, tren co data roi moi xet o duoi */
  /* backwards: nguoc lai tu doi len tren */
  /* together: song song, chờ cả 2 có data het roi moi hien, together cannot use tail props */

  /* ORDER very important on Suspense List */

  /* Dan Abramov: We intentionally double-call render-phase lifecycles in development
  only (and function components using Hooks) to help people find issues caused by side effects
  in render (React concurrent mode) */

  /* Very first experience: 
  - useTransition for when you want to wait on the previous state until the page is loaded.
  - SuspenseList is when you want to ordered show the content on the other page.
  => useTransition: stay on current state before new state loaded
  => SuspenseList: go to new state and see the loading base on its ordered
  => If we want SuspenseList works on re-render, give them a key props

  Refs: https://github.com/facebook/react/issues/17779 */

  /* useTransition not work with SuspenseList or useDefferValue */

  return (
    <div className='App'>
      <header className='App-header'>
        <ErrorBoundary>
          <p>React Concurrent Mode workaround</p>
          {/* <SuspenseList tail='collapsed' revealOrder='forwards'> */}
          <SuspenseList revealOrder='together'>
            <Suspense
              fallback={<h3>Loading person ....!</h3>}
              // key={Math.random()}
            >
              <Person resource={resource} />
              <PostResource resource={postResource} />
            </Suspense>
            <Suspense
              fallback={<h3>Loading number ....!</h3>}
              // key={Math.random()}
            >
              <Number resource={resource} />
            </Suspense>
            {/* <Suspense
            fallback={<h3>Loading number deffered ....!</h3>}
            // key={Math.random()}
          >
            <div style={{ color: isSteal ? '#ccc' : '#fff' }}>
              <Number resource={deferredResource} />
            </div>
          </Suspense> */}
          </SuspenseList>
        </ErrorBoundary>
        <TransitionButton onClick={handleRefreshData} timeoutMs={3000}>
          Refresh Data
        </TransitionButton>
        <button onClick={handlePostResource}>Post Resource</button>

        <BigPrime number={deferredNum} />
        <input value={+num} onChange={e => setNum(e.target.value)} />
      </header>
    </div>
  )
}

export default App

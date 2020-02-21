import React, { useTransition } from 'react'

const TransitionButton = ({ timeoutMs, children, onClick, ...others }) => {
  const [startTransition, isPending] = useTransition({
    timeoutMs: timeoutMs
  })
  const handleClick = () => {
    startTransition(() => {
      onClick()
    })
  }

  return (
    <button onClick={handleClick} disabled={isPending}>
      {children}
    </button>
  )
}

export default TransitionButton

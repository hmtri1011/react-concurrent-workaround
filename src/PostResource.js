import React from 'react'

const PostResource = ({ resource }) => {
  const data = resource.read()

  if (!data) {
    return null
  }

  return <div>The result of the post request: {JSON.stringify(data)}</div>
}

export default PostResource

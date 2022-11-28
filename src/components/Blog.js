import { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog: { title, author, url, likes, user, id }, onLike }) => {
  const [expanded, setExpanded] = useState(false)
  const buttonLabel = expanded ? 'hide' : 'view'

  const toggleExpanded = () => setExpanded(!expanded)

  const handleLike = () =>
    onLike({ title, author, url, likes, user: user.id, id })

  return (
    <div style={blogStyle}>
      <div>
        {title} {author} <button onClick={toggleExpanded}>{buttonLabel}</button>
      </div>
      {expanded && (
        <div>
          <p>{url}</p>
          <p>
            likes {likes} <button onClick={handleLike}>like</button>
          </p>
          <p>{user.name}</p>
        </div>
      )}
    </div>
  )
}

export default Blog

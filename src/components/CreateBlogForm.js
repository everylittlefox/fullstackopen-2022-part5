import { useState } from 'react'

const emptyState = {
  title: '',
  author: '',
  url: ''
}

const CreateBlogForm = ({ onCreateBlog }) => {
  const [{ title, author, url }, setBlog] = useState(emptyState)

  const handleTitleChange = (e) =>
    setBlog((c) => ({ ...c, title: e.target.value }))

  const handleAuthorChange = (e) =>
    setBlog((c) => ({ ...c, author: e.target.value }))

  const handleUrlChange = (e) => setBlog((c) => ({ ...c, url: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreateBlog({ title, author, url })
    setBlog({ ...emptyState })
  }

  return (
    <div>
      <h3>create new</h3>
      <form>
        <div>
          <label>
            title{' '}
            <input name="title" value={title} onChange={handleTitleChange} />
          </label>
        </div>
        <div>
          <label>
            author{' '}
            <input name="author" value={author} onChange={handleAuthorChange} />
          </label>
        </div>
        <div>
          <label>
            url <input name="url" value={url} onChange={handleUrlChange} />
          </label>
        </div>
        <button onClick={handleSubmit} type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default CreateBlogForm

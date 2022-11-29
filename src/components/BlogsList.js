import Blog from './Blog'

const BlogsList = ({ blogs, onLike, onDelete }) => {
  return (
    <div className='blogs'>
      {blogs.map((blog) => (
        <Blog onDelete={onDelete} onLike={onLike} key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogsList

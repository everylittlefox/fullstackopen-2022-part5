import Blog from './Blog'

const BlogsList = ({blogs, onLike}) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog onLike={onLike} key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogsList

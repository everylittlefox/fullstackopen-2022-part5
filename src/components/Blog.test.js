import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('shows only title and author by default', () => {
  const blog = {
    id: 1,
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: { name: 'root', username: 'root', id: 1 }
  }

  const { container } = render(<Blog blog={blog} />)

  const blogSummary = container.querySelector('.blog-summary')
  expect(blogSummary).toBeDefined()

  const texts = [...blogSummary.childNodes].map((c) => c.textContent)
  expect(texts).toContain('Michael Chan')
  expect(texts).toContain('React patterns')

  const blogDetails = container.querySelector('.blog-expanded-details')
  expect(blogDetails).toBeNull()
})

test('shows details when view button is clicked', async () => {
  const blog = {
    id: 1,
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: { name: 'root', username: 'root', id: 1 }
  }

  const { container } = render(<Blog blog={blog} />)
  const viewButton = screen.getByText('view')

  await userEvent.click(viewButton)

  const blogDetails = container.querySelector('.blog-expanded-details')
  expect(blogDetails).not.toBeNull()

  const texts = [...blogDetails.childNodes].map(c => c.textContent)
  expect(texts).toContain(blog.url)
})

test('like button fires event handler', async () => {
  const blog = {
    id: 1,
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: { name: 'root', username: 'root', id: 1 }
  }

  const mockOnLike = jest.fn()
  render(<Blog blog={blog} onLike={mockOnLike} />)

  const viewButton = screen.getByText('view')
  await userEvent.click(viewButton)

  const likeButton = screen.getByText('like')
  await userEvent.click(likeButton)
  await userEvent.click(likeButton)

  expect(mockOnLike.mock.calls).toHaveLength(2)
})

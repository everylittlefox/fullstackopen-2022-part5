import { render, screen } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'
import userEvent from '@testing-library/user-event'

test('onCreateBlog is called with the right arguments', async () => {
  const newBlog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/'
  }

  const mockOnCreateBlog = jest.fn()
  render(<CreateBlogForm onCreateBlog={mockOnCreateBlog} />)

  const title = screen.getByLabelText('title')
  await userEvent.type(title, 'React patterns')

  const author = screen.getByLabelText('author')
  await userEvent.type(author, 'Michael Chan')

  const url = screen.getByLabelText('url')
  await userEvent.type(url, 'https://reactpatterns.com/')

  const createButton = screen.getByText('create')
  await userEvent.click(createButton)

  expect(mockOnCreateBlog.mock.calls[0][0]).toEqual(newBlog)
})

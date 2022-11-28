import { useEffect } from 'react'

const Message = ({ text, error, onTimedOut }) => {
  useEffect(() => {
    const ref = setTimeout(() => onTimedOut(), 5000)
    return () => clearTimeout(ref)
  }, [onTimedOut])

  return <p className={`message ${error ? 'error' : 'success'}`}>{text}</p>
}

export const error = (text) => ({ error: true, text })
export const success = (text) => ({ text })

export default Message

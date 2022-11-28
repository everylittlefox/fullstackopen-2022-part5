import { useEffect } from 'react'
import PropTypes from 'prop-types'

const Message = ({ text, error, onTimedOut }) => {
  useEffect(() => {
    const ref = setTimeout(() => onTimedOut(), 5000)
    return () => clearTimeout(ref)
  }, [onTimedOut])

  return <p className={`message ${error ? 'error' : 'success'}`}>{text}</p>
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  error: PropTypes.bool,
  onTimedOut: PropTypes.func.isRequired
}

export const error = (text) => ({ error: true, text })
export const success = (text) => ({ text })

export default Message

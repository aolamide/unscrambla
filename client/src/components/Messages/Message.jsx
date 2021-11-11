import React from 'react';

const Message = ({ message, selfMessage }) => {
  return (
    <p className={`bg-purple-navy mb-3 w-max p-2 rounded-md text-white tracking-wider ${selfMessage ? 'self-end' : ''}`}>{message}</p>
  )
}

export default Message;
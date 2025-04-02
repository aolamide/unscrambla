import React from 'react';

export interface IMessageProps {
  message: string;
  selfMessage?: boolean;
}

const Message = ({ message, selfMessage }: IMessageProps) => {
  return (
    <p
      className={`bg-purple-navy mb-2 w-max p-2 rounded-md text-white tracking-wider ${selfMessage ? 'self-end' : ''}`}
    >
      {message}
    </p>
  );
};

export default Message;

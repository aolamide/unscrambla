import React from 'react';

export interface IAdminMessageProps {
  message: string;
}

const AdminMessage = ({ message }: IAdminMessageProps) => {
  return (
    <p className="text-center mb-2 bg-azureish-white text-deep-koamoru p-2 rounded-md">
      {message}
    </p>
  );
};

export default AdminMessage;

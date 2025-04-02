import React from 'react';

const ReplayWaiting = () => {
  return (
    <>
      <div className="bg-azureish-white rounded-md p-5 w-11/12 sm:w-120">
        <p className="text-center font-bold text-deep-koamoru  text-xl">
          Waiting for other player to click replay...
        </p>
        <div className="bg-white flex space-x-2 p-3 rounded-full justify-center items-center w-max m-auto mt-8 mb-8">
          <div className="loader-circle c1"></div>
          <div className="loader-circle c2"></div>
          <div className="loader-circle c3"></div>
        </div>
      </div>
    </>
  );
};

export default ReplayWaiting;

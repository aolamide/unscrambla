import React from 'react';

const Loading = () => {
  return (
    <div className="h-screen bg-deep-koamoru flex flex-col justify-center items-center">
      <h1 className="font-cabin text-6xl text-azureish-white">Unscrambla</h1>
      <div class="bg-white flex space-x-2 p-3 rounded-full justify-center items-center w-max m-auto mt-8 mb-8">
        <div class="loader-circle c1"></div>
        <div class="loader-circle c2"></div>
        <div class="loader-circle c3"></div>
      </div>
    </div> 
  )
}

export default Loading;
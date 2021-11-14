import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';

const HostWaiting = ({ code }) => {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <div className="bg-azureish-white rounded-md p-5 w-11/12 sm:w-120">
        <p className="text-center font-bold">Tell the other player to visit {window.location.host} and join with the code </p>
        <p className="bg-purple-navy font-bold p-2 text-center text-5xl tracking-widest text-azureish-white rounded-md mt-8 mb-8">{code}</p>
        <p className="text-center">Waiting for player to join...</p>
        <div className="bg-white flex space-x-2 p-3 rounded-full justify-center items-center w-max m-auto mt-8 mb-8">
          <div className="loader-circle c1"></div>
          <div className="loader-circle c2"></div>
          <div className="loader-circle c3"></div>
        </div>
      </div>
      <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
          <button className={`text-azureish-white rounded-md p-3 mt-5 font-bold w-11/12 sm:w-120 shadow-md bg-black ${copied ? 'transform scale-0 transition-transform duration-2000' : ''}`}>{ copied ? 'COPIED' : 'COPY CODE TO CLIPBOARD'}</button>
      </CopyToClipboard>
    </>
  )
}

export default HostWaiting;
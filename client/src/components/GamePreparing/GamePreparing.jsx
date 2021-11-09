import React, { useState, useEffect } from 'react'

const GamePreparing = ({ name, opponentName }) => {
  const [countdown, setCountDown] = useState(10);

  useEffect(() => {
    let interval = setInterval(() => setCountDown(countdown => --countdown), 1000);
    return (() => clearInterval(interval));
  }, []);

  return (
    <div>
      <p>Ready ! Game starts in <strong>{countdown}</strong></p>
      <div style={{ display : 'flex' }}>
        <div>
          <small>You</small>
          <p>{name}</p>
        </div>
        <div>
          <small>Opponent</small>
          <p>{opponentName}</p>
        </div>
      </div>
    </div>
  )
}

export default GamePreparing;
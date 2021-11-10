import React from 'react';

const Result = ({ results, host, name, opponentName }) => {
  return (
    <div>
      <h1>Game result</h1>
      <div style={{ display : 'flex' }}>
        <div style={{ marginRight : '20px'}}>
          <p>{name}</p>
          <p><strong>{host ? results?.hostScore : results?.playerTwoScore}</strong></p>
        </div>
        <div>
          <p>{opponentName}</p>
          <p><strong>{ host ?  results?.playerTwoScore : results?.hostScore }</strong></p>
        </div>
      </div>
    </div>
  )
};


export default Result;
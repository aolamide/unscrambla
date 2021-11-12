import React, { useEffect, useState } from 'react';


const ResultRow = ({ name, score, rank }) => {
  return (
    <tr className={ rank === 1 ? `bg-deep-koamoru text-white` : ''}>
      <td className="result-table-cell font-bold">#{rank}</td>
      <td className="result-table-cell">{name}</td>
      <td className="result-table-cell font-bold text-xl text-right">{score}</td>
    </tr>
  );
}

const Result = ({ results, host, name, opponentName, onReplay, disconnect  }) => {
  const [sortedResults, setSortedresults] = useState([]);
  useEffect(() => {
    let myResult = { score : host ? results?.hostScore : results?.playerTwoScore, name : name + ' (you)', rank : null };
    let opponentResult = { score : host ?  results?.playerTwoScore : results?.hostScore, name : opponentName, rank : null };
    let sort = [myResult, opponentResult];
    if(myResult.score > opponentResult.score) {
      myResult.rank = 1;
      opponentResult.rank = 2;
      sort = [myResult, opponentResult]
    } else if(myResult.score < opponentResult.score) {
      myResult.rank = 2;
      opponentResult.rank = 1;
      sort = [opponentResult, myResult]
    } else myResult.rank = opponentResult.rank = 1;
    setSortedresults(sort);
  }, []);
  return (
    <>
    <div className="bg-white rounded-md p-5 w-11/12 sm:w-120">
      <h1 className="mb-4 text-2xl font-bold">GAME RESULT</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="result-table-cell text-left">Rank</th>
            <th className="result-table-cell text-left">Name</th>
            <th className="result-table-cell text-right">Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedResults.length > 0 && sortedResults.map(res => <ResultRow name={res.name} score={res.score} rank={res.rank} />)}
        </tbody>
      </table>
    </div>
    {disconnect ? 
    <p className="text-azureish-white text-center mt-5">Opponent disconnected</p> : 
    <>
      <p className="text-azureish-white">Last word was <span className="font-bold text-2xl mt-1">{results.currentWord}</span></p>
      <button onClick={onReplay} className="text-deep-koamoru rounded-md p-3 mt-5 font-bold w-11/12 sm:w-120 shadow-md bg-azureish-white">PLAY AGAIN</button>
    </>
    }
    </>
  )
};


export default Result;